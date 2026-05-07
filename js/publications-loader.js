/* Loads data/publications.bib and renders on publications.html */
(function() {

  /* Build link buttons (PDF, BibTeX, DOI, etc.) */
  function buildLinks(entry) {
    const links = [];
    if (entry.pdf)     links.push('<a href="' + entry.pdf + '" target="_blank">PDF</a>');
    links.push('<a href="#" class="bibtex-btn" data-key="' + entry.key + '">BibTeX</a>');
    if (entry.url)     links.push('<a href="' + entry.url + '" target="_blank">Link</a>');
    if (entry.code)    links.push('<a href="' + entry.code + '" target="_blank">Code</a>');
    if (entry.project) links.push('<a href="' + entry.project + '" target="_blank">Project</a>');
    if (entry.doi)     links.push('<a href="https://doi.org/' + entry.doi + '" target="_blank">DOI</a>');
    if (links.length === 0) return '';
    return ' &nbsp;·&nbsp; <span class="pub-links">[' + links.join('] [') + ']</span>';
  }

  /* Reconstruct BibTeX from a parsed entry */
  function entryToBibtex(entry) {
    const skip = ['type', 'key', 'citations'];
    let out = '@' + entry.type + '{' + entry.key + ',\n';
    Object.keys(entry).forEach(function(k) {
      if (skip.indexOf(k) !== -1) return;
      out += '  ' + k + ' = {' + entry[k] + '},\n';
    });
    out += '}';
    return out;
  }

  /* Show BibTeX popup */
  function showBibtexPopup(entry) {
    const bibtexStr = entryToBibtex(entry);
    const overlay = document.createElement('div');
    overlay.className = 'bibtex-overlay';
    overlay.innerHTML =
      '<div class="bibtex-popup">' +
        '<div class="bibtex-popup-header">' +
          '<strong>BibTeX Citation</strong>' +
          '<button class="bibtex-close" title="Close">×</button>' +
        '</div>' +
        '<pre class="bibtex-content"></pre>' +
        '<div class="bibtex-actions">' +
          '<button class="bibtex-copy">📋 Copy</button>' +
          '<button class="bibtex-download">⬇️ Download .bib</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    overlay.querySelector('.bibtex-content').textContent = bibtexStr;

    function close() { document.body.removeChild(overlay); }
    overlay.querySelector('.bibtex-close').onclick = close;
    overlay.onclick = function(e) { if (e.target === overlay) close(); };

    overlay.querySelector('.bibtex-copy').onclick = function() {
      navigator.clipboard.writeText(bibtexStr).then(function() {
        const btn = overlay.querySelector('.bibtex-copy');
        const original = btn.textContent;
        btn.textContent = '✓ Copied!';
        setTimeout(function() { btn.textContent = original; }, 1500);
      });
    };

    overlay.querySelector('.bibtex-download').onclick = function() {
      const blob = new Blob([bibtexStr], { type: 'text/plain' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = entry.key + '.bib';
      a.click();
    };
  }

  async function loadPublications() {
    const container = document.getElementById('publications-container');
    if (!container) return;
    try {
      const response = await fetch('data/publications.bib');
      if (!response.ok) throw new Error('publications.bib not found (HTTP ' + response.status + ')');
      const bibtex = await response.text();
      const entries = parseBibtex(bibtex);
      if (entries.length === 0) {
        container.innerHTML = '<section class="card"><p class="error-message">No publications found.</p></section>';
        return;
      }
      const byYear = {};
      entries.forEach(function(e) {
        const y = e.year || 'Unknown';
        if (!byYear[y]) byYear[y] = [];
        byYear[y].push(e);
      });
      const years = Object.keys(byYear).sort(function(a, b) {
        if (a === 'Unknown') return 1;
        if (b === 'Unknown') return -1;
        return parseInt(b) - parseInt(a);
      });
      let html = '';
      years.forEach(function(year) {
        html += '<section class="card"><div class="year-section"><h3>' + year + '</h3><ul class="pub-list">';
        byYear[year].forEach(function(entry) {
          const authors = formatAuthors(entry.author || '', ['Chongsheng Zhang']);
          const venue = formatVenue(entry);
          const cites = (entry.citations && entry.citations !== '0') ? ' &nbsp;·&nbsp; <span class="pub-citations">' + entry.citations + ' citations</span>' : '';
          const links = buildLinks(entry);
          html += '<li>' +
            '<span class="pub-title">' + (entry.title || 'Untitled') + '</span>' +
            '<span class="pub-authors">' + authors + '</span>' +
            '<span class="pub-venue">' + venue + cites + links + '</span>' +
          '</li>';
        });
        html += '</ul></div></section>';
      });
      container.innerHTML = html;

      const entryByKey = {};
      entries.forEach(function(e) { entryByKey[e.key] = e; });
      document.querySelectorAll('.bibtex-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          const key = btn.getAttribute('data-key');
          if (entryByKey[key]) showBibtexPopup(entryByKey[key]);
        });
      });

    } catch (err) {
      console.error('Could not load publications:', err);
      container.innerHTML =
        '<section class="card"><p class="error-message">' +
        '⚠️ Could not load <code>data/publications.bib</code>.' +
        '<br><small>Error: ' + err.message + '</small>' +
        '</p></section>';
    }
  }

  loadPublications();
})();
