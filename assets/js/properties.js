window.PropertyData = {
  all: []
};

async function loadProperties() {
  if (window.PropertyData.all.length) {
    return window.PropertyData.all;
  }

  const dataUrl = window.PROPERTIES_DATA_URL || 'assets/data/properties.json';
  const response = await fetch(dataUrl);
  if (!response.ok) {
    throw new Error('Failed to load properties data');
  }

  const properties = await response.json();
  window.PropertyData.all = Array.isArray(properties) ? properties : [];
  return window.PropertyData.all;
}

function renderHomeFeatured(properties) {
  const grid = document.getElementById('home-pg');
  if (!grid) return;

  const featured = properties.filter((property) => property.featured === true).slice(0, 3);

  grid.innerHTML = featured.map((property) => `
    <article class="pc" data-h>
      <div class="pim"><div class="pii" style="background-image:url('${property.img}')"></div><div class="pbdg">${property.badge || 'Featured'}</div></div>
      <div class="pi"><div class="pnb">${property.nb || 'Medellín'}</div><div class="pnm">${property.name || 'Property'}</div>
      <div class="psp"><span class="ps"><span>${property.beds ?? '-'}</span> Beds</span><span class="ps"><span>${property.sqm ?? '-'}m²</span></span><span class="ps">Floor <span>${property.floor || '-'}</span></span></div>
      <div class="pft"><div><span class="ppl">From</span><div class="ppr">${property.pd || '-'}</div></div>
      <a class="btn-s" href="properties/index.html" data-h>View Details</a></div></div>
    </article>
  `).join('');
}

function renderListings(list) {
  const grid = document.getElementById('lgrid');
  if (!grid) return;

  if (!Array.isArray(list)) {
    grid.innerHTML = `<div class="state-box"><p>Something went wrong loading the listings.</p></div>`;
    return;
  }

  if (!list.length) {
    grid.innerHTML = `<div class="state-box"><p>No properties match. <a href="#" id="reset-filters-inline" data-h>Reset filters</a>.</p></div>`;
    const resetLink = document.getElementById('reset-filters-inline');
    if (resetLink && typeof window.resetFilters === 'function') {
      resetLink.addEventListener('click', (event) => {
        event.preventDefault();
        window.resetFilters();
      });
    }
    return;
  }

  grid.innerHTML = list.map((property) => `
    <article class="lcard" data-h>
      <div class="lcim"><div class="lcii" style="background-image:url('${property.img}')"></div>
      <div class="ltags">${(property.tags || []).map((tag) => `<span class="ltag ${tag === 'Off-Market' ? 'om' : ''}">${tag}</span>`).join('')}</div></div>
      <div class="linfo"><div class="lnb">${property.nb || 'Medellín'}</div><div class="lnm">${property.name || 'Property'}</div>
      <div class="lsps"><span class="lsp"><strong>${property.beds ?? '-'}</strong> Beds</span><span class="lsp"><strong>${property.baths ?? '-'}</strong> Baths</span><span class="lsp"><strong>${property.sqm ?? '-'}m²</strong></span><span class="lsp">Floor <strong>${property.floor || '-'}</strong></span></div>
      <div class="lft"><div><div class="lpf">From</div><div class="lpv">${property.pd || '-'}</div></div><div class="ldb">View Details</div></div></div>
    </article>
  `).join('');
}

async function initHomePage() {
  try {
    const properties = await loadProperties();
    renderHomeFeatured(properties);
  } catch (error) {
    const grid = document.getElementById('home-pg');
    if (grid) {
      grid.innerHTML = `<div class="state-box"><p>Unable to load featured properties right now.</p></div>`;
    }
  }
}

async function initPropertiesPage() {
  const grid = document.getElementById('lgrid');
  if (grid) {
    grid.innerHTML = `<div class="state-box"><p>Loading properties…</p></div>`;
  }

  try {
    const properties = await loadProperties();
    if (typeof window.initializeFilters === 'function') {
      window.initializeFilters(properties, renderListings);
    } else {
      renderListings(properties);
    }
  } catch (error) {
    if (grid) {
      grid.innerHTML = `<div class="state-box"><p>Unable to load properties right now. Please try again later.</p></div>`;
    }
  }
}
