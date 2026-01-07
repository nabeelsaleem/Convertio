let tools = [];

// Load tools list
fetch('https://simpliconvert.com/tools.json')
  .then(response => response.json())
  .then(data => {
    tools = data;
  })
  .catch(() => console.log('Tools data not loaded'));

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('toolSearch');
  const resultsBox = document.getElementById('searchResults');

  // Stop if search bar does not exist on this page
  if (!input || !resultsBox) return;

  input.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    resultsBox.innerHTML = '';

    if (!query) {
      resultsBox.classList.add('hidden');
      return;
    }

    const matches = tools.filter(tool =>
      tool.name.toLowerCase().includes(query) ||
      tool.category.toLowerCase().includes(query) ||
      (tool.keywords && tool.keywords.join(' ').includes(query))
    );

    if (matches.length === 0) {
      resultsBox.innerHTML =
        '<div class="px-4 py-3 text-sm text-gray-500">No tools found</div>';
    } else {
      matches.slice(0, 8).forEach(tool => {
        resultsBox.innerHTML += `
          <a href="${tool.url}" class="block px-4 py-3 hover:bg-gray-50">
            <div class="text-sm font-medium">${tool.name}</div>
            <div class="text-xs text-gray-400">${tool.category}</div>
          </a>
        `;
      });
    }

    resultsBox.classList.remove('hidden');
  });
});
