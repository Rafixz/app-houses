const COLORS = ["#4F86C6", "#E8735A", "#5BAD72", "#9B6BB5", "#E8A838", "#3BBFBF"];

function fmt(n) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function fmtNum(n) {
  return n.toLocaleString("en-US");
}

function maintenanceCost(house) {
  // Rule of thumb: 1% of purchase price per year
  return Math.round(house.price * 0.01);
}

function pricePerSqft(house) {
  return Math.round(house.price / house.sqft);
}

function totalMonthlyCost(house) {
  const tax = Math.round(house.annualTax / 12);
  const maintenance = Math.round(maintenanceCost(house) / 12);
  const hoa = house.hoaMonthly || 0;
  return tax + maintenance + hoa;
}

// ── Price Cards ──────────────────────────────────────────────────────────────
function renderPriceCards() {
  const container = document.getElementById("price-cards");
  HOUSES.forEach((h, i) => {
    const color = h.color || COLORS[i % COLORS.length];
    const priceDiff = h.lastSoldPrice ? h.price - h.lastSoldPrice : null;
    const diffLabel = priceDiff !== null
      ? `<span class="diff ${priceDiff < 0 ? "down" : "up"}">${priceDiff < 0 ? "▼" : "▲"} ${fmt(Math.abs(priceDiff))} vs last sold (${h.lastSoldYear})</span>`
      : "";

    const photo = h.image
      ? `<div class="card-photo"><img src="${h.image}" alt="${h.nickname}" loading="lazy" /></div>`
      : "";

    container.innerHTML += `
      <div class="card" style="--accent:${color}">
        ${photo}
        <div class="card-header" style="background:${color}">
          <span class="card-badge">${h.status}</span>
          <h3>${h.nickname}</h3>
          <p class="card-address">${h.address}</p>
        </div>
        <div class="card-body">
          <div class="big-price">${fmt(h.price)}</div>
          ${diffLabel}
          <div class="stats-row">
            <div class="stat"><span class="stat-val">${h.bedrooms}</span><span class="stat-label">Beds</span></div>
            <div class="stat"><span class="stat-val">${h.bathrooms}</span><span class="stat-label">Baths</span></div>
            <div class="stat"><span class="stat-val">${fmtNum(h.sqft)}</span><span class="stat-label">Sq Ft</span></div>
            <div class="stat"><span class="stat-val">${h.yearBuilt}</span><span class="stat-label">Built</span></div>
          </div>
          <a class="listing-link" href="${h.url}" target="_blank" rel="noopener">View Listing ↗</a>
        </div>
      </div>`;
  });
}

// ── Metrics Table ─────────────────────────────────────────────────────────────
function renderMetricsTable() {
  const header = document.getElementById("metrics-header");
  const body = document.getElementById("metrics-body");

  header.innerHTML = `<th>Metric</th>` + HOUSES.map((h, i) => {
    const color = h.color || COLORS[i % COLORS.length];
    return `<th style="color:${color}">${h.nickname}</th>`;
  }).join("");

  const rows = [
    { label: "List Price", fn: h => fmt(h.price) },
    { label: "Price / Sq Ft", fn: h => fmt(pricePerSqft(h)) },
    { label: "Total Sq Ft", fn: h => fmtNum(h.sqft) + " sqft" },
    { label: "Lot Size", fn: h => fmtNum(h.lotSqft) + " sqft" },
    { label: "Annual Tax", fn: h => fmt(h.annualTax) },
    { label: "Monthly Tax", fn: h => fmt(Math.round(h.annualTax / 12)) },
    { label: "HOA / month", fn: h => h.hoaMonthly ? fmt(h.hoaMonthly) : "None" },
    { label: "Est. Maintenance / yr (1%)", fn: h => fmt(maintenanceCost(h)) },
    { label: "Est. Total Monthly Cost", fn: h => `<strong>${fmt(totalMonthlyCost(h))}</strong>` },
    { label: "Year Built", fn: h => h.yearBuilt },
    { label: "Year Renovated", fn: h => h.yearRenovated || "—" },
    { label: "Heating", fn: h => h.heating },
    { label: "Cooling", fn: h => h.cooling },
    { label: "Parking", fn: h => h.parking },
    { label: "Basement", fn: h => h.basement ? `Yes (${fmtNum(h.basementSqft)} sqft)` : "No" },
  ];

  body.innerHTML = rows.map(row =>
    `<tr><td class="metric-label">${row.label}</td>${HOUSES.map(h => `<td>${row.fn(h)}</td>`).join("")}</tr>`
  ).join("");
}

// ── Features Cards ────────────────────────────────────────────────────────────
function renderFeaturesCards() {
  const container = document.getElementById("features-cards");
  HOUSES.forEach((h, i) => {
    const color = h.color || COLORS[i % COLORS.length];
    const items = h.features.map(f => `<li>✓ ${f}</li>`).join("");
    container.innerHTML += `
      <div class="card" style="--accent:${color}">
        <div class="card-header" style="background:${color}">
          <h3>${h.nickname}</h3>
        </div>
        <div class="card-body">
          <ul class="features-list">${items}</ul>
        </div>
      </div>`;
  });
}

// ── Schools Cards ─────────────────────────────────────────────────────────────
function renderSchoolsCards() {
  const container = document.getElementById("schools-cards");
  HOUSES.forEach((h, i) => {
    const color = h.color || COLORS[i % COLORS.length];
    const rows = h.schools.map(s =>
      `<div class="school-row">
        <span class="school-level">${s.level}</span>
        <span class="school-name">${s.name}</span>
        <span class="school-dist">${s.distance}</span>
      </div>`
    ).join("");
    container.innerHTML += `
      <div class="card" style="--accent:${color}">
        <div class="card-header" style="background:${color}">
          <h3>${h.nickname}</h3>
        </div>
        <div class="card-body">${rows}</div>
      </div>`;
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("last-updated").textContent = new Date().toLocaleDateString("en-US", {
  year: "numeric", month: "long", day: "numeric"
});

renderPriceCards();
renderMetricsTable();
renderFeaturesCards();
renderSchoolsCards();
