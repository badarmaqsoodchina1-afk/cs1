/* Loads data/publications.bib and renders on publications.html */
(function() {
  function buildLinks(entry) {
    const links = [];
    if (entry.pdf) links.push('<a href="' + entry.pdf + '" target="_blank">PDF</a>');
    if (entry.url) links.push('<a href="' + entry.url + '" target="_blank">Link</a>');
    if (entry.code) links.push('<a href="' + entry.code + '" target="_blank">Code</a>');
    if (entry.project) links.push('<a href="' + entry.project + '" target="_blank">Project</a>');
    if (entry.doi) links.push('<a href="https://doi.org/' + entry.doi + '" target="_blank">DOI</a>');
    if (links.length === 0) return '';
    return ' <span class="pub-links">[' + links.join('] [') + ']</span>';
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
        container.innerHTML = '<section class="card"><p class="error-message">No publications found in <code>data/publications.bib</code>.</p></section>';
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
    } catch (err) {
      console.error('Could not load publications:', err);
      container.innerHTML =
        '<section class="card"><p class="error-message">' +
        '⚠️ Could not load <code>data/publications.bib</code>. Make sure the file exists.' +
        '<br><small>Error: ' + err.message + '</small>' +
        '</p></section>';
    }
  }

  loadPublications();
})();
