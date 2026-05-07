/* Loads data/news.txt and renders on the homepage */
(function() {
  async function loadNews() {
    const container = document.getElementById('news-container');
    if (!container) return;
    try {
      const response = await fetch('data/news.txt');
      if (!response.ok) throw new Error('news.txt not found');
      const text = await response.text();
      const lines = text.split('\n').map(function(l){ return l.trim(); }).filter(function(l){ return l && !l.startsWith('#'); });
      if (lines.length === 0) {
        container.innerHTML = '<li class="loading">No news yet.</li>';
        return;
      }
      let html = '';
      lines.forEach(function(line) {
        const sepIdx = line.indexOf('|');
        if (sepIdx < 0) return;
        const date = line.substring(0, sepIdx).trim();
        const content = line.substring(sepIdx + 1).trim();
        html += '<li><span class="news-date">[' + date + ']</span>' + content + '</li>';
      });
      container.innerHTML = html;
    } catch (err) {
      console.error('Could not load news:', err);
      container.innerHTML = '<li class="loading">News will appear here once <code>data/news.txt</code> is added.</li>';
    }
  }
  loadNews();
})();
