(function () {
  let properties = [];
  let renderFn = null;

  function applyFilters() {
    const budgetValue = document.getElementById('fb')?.value || 'all';
    const areaValue = document.getElementById('fn')?.value || 'all';
    const bedsValue = document.getElementById('fbd')?.value || 'all';
    const typeValue = document.getElementById('ft')?.value || 'all';

    let list = [...properties];

    if (budgetValue !== 'all') {
      if (budgetValue === 'lo') list = list.filter((property) => property.usd <= 500000);
      if (budgetValue === 'mi') list = list.filter((property) => property.usd > 500000 && property.usd <= 800000);
      if (budgetValue === 'hi') list = list.filter((property) => property.usd > 800000);
    }

    if (areaValue !== 'all') {
      list = list.filter((property) => property.nb === areaValue);
    }

    if (bedsValue !== 'all') {
      list = list.filter((property) => (bedsValue === '5' ? property.beds >= 5 : property.beds === parseInt(bedsValue, 10)));
    }

    if (typeValue !== 'all') {
      list = list.filter((property) => property.type === typeValue);
    }

    if (typeof renderFn === 'function') {
      renderFn(list);
    }
  }

  function resetFilters() {
    ['fb', 'fn', 'fbd', 'ft'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.value = 'all';
    });

    if (typeof renderFn === 'function') {
      renderFn(properties);
    }
  }

  function initializeFilters(initialProperties, renderListings) {
    properties = Array.isArray(initialProperties) ? initialProperties : [];
    renderFn = renderListings;

    ['fb', 'fn', 'fbd', 'ft'].forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      element.addEventListener('change', applyFilters);
    });

    renderFn(properties);
  }

  window.initializeFilters = initializeFilters;
  window.resetFilters = resetFilters;
})();
