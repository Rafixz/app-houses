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

// ── Scores ────────────────────────────────────────────────────────────────────
const PILLARS = [
  { key: "neighborhood", label: "🏘️ Vizinhança" },
  { key: "structure", label: "🏠 Estrutura" },
  { key: "price", label: "💵 Preço" },
];

function sumPillar(items) {
  let score = 0, max = 0;
  items.forEach(it => {
    if (it.na) return;            // N/A: excluded from both
    score += it.score || 0;
    max += it.max || 0;
  });
  return { score: Math.round(score * 100) / 100, max };
}

function pillarTotals(houseId) {
  const data = SCORES[houseId];
  const totals = {};
  let grandScore = 0, grandMax = 0;
  PILLARS.forEach(p => {
    const t = sumPillar(data[p.key]);
    totals[p.key] = t;
    grandScore += t.score;
    grandMax += t.max;
  });
  totals.grand = { score: Math.round(grandScore * 100) / 100, max: grandMax };
  return totals;
}

function renderScoresSummary() {
  const header = document.getElementById("scores-summary-header");
  const body = document.getElementById("scores-summary-body");

  header.innerHTML = `<th>Pilar</th>` + HOUSES.map((h, i) => {
    const color = h.color || COLORS[i % COLORS.length];
    return `<th style="color:${color}">${h.nickname}</th>`;
  }).join("");

  const totalsByHouse = {};
  HOUSES.forEach(h => totalsByHouse[h.id] = pillarTotals(h.id));

  let rows = "";
  PILLARS.forEach(p => {
    rows += `<tr class="score-pillar-row" data-pillar="${p.key}">
      <td class="metric-label">${p.label} <span class="expand-hint">▸ detalhes</span></td>` +
      HOUSES.map(h => {
        const t = totalsByHouse[h.id][p.key];
        return `<td>${scoreBar(t.score, t.max, h.color)}</td>`;
      }).join("") + `</tr>`;
  });

  rows += `<tr class="score-grand-row">
    <td class="metric-label"><strong>🏆 Total Geral</strong></td>` +
    HOUSES.map(h => {
      const t = totalsByHouse[h.id].grand;
      return `<td><strong>${t.score} / ${t.max}</strong></td>`;
    }).join("") + `</tr>`;

  body.innerHTML = rows;

  // Click to expand pillar detail
  document.querySelectorAll(".score-pillar-row").forEach(row => {
    row.addEventListener("click", () => renderPillarDetail(row.dataset.pillar, row));
  });
}

function scoreBar(score, max, color) {
  const pct = max > 0 ? Math.round((score / max) * 100) : 0;
  return `<div class="score-cell">
    <span class="score-num">${score} / ${max}</span>
    <div class="score-track"><div class="score-fill" style="width:${pct}%;background:${color}"></div></div>
    <span class="score-pct">${pct}%</span>
  </div>`;
}

function renderPillarDetail(pillarKey, rowEl) {
  const container = document.getElementById("scores-detail");
  const pillar = PILLARS.find(p => p.key === pillarKey);

  // Toggle off if already showing this pillar
  if (container.dataset.active === pillarKey) {
    container.innerHTML = "";
    container.dataset.active = "";
    document.querySelectorAll(".score-pillar-row").forEach(r => r.classList.remove("active"));
    return;
  }
  document.querySelectorAll(".score-pillar-row").forEach(r => r.classList.remove("active"));
  if (rowEl) rowEl.classList.add("active");
  container.dataset.active = pillarKey;

  // Build a per-criterion comparison table for this pillar
  const criteria = SCORES[HOUSES[0].id][pillarKey].map(c => c.key);

  let html = `<div class="detail-card">
    <h3>${pillar.label} — detalhamento por quesito</h3>
    <div class="table-wrapper">
      <table class="detail-table">
        <thead><tr><th>Quesito</th>${HOUSES.map((h,i) =>
          `<th style="color:${h.color || COLORS[i%COLORS.length]}">${h.nickname}</th>`).join("")}</tr></thead>
        <tbody>`;

  criteria.forEach((critKey, idx) => {
    html += `<tr><td class="crit-label">${critKey}</td>`;
    HOUSES.forEach(h => {
      const c = SCORES[h.id][pillarKey][idx];
      html += `<td class="crit-cell">${renderCriterion(c)}</td>`;
    });
    html += `</tr>`;
  });

  html += `</tbody></table></div></div>`;
  container.innerHTML = html;
  container.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function renderCriterion(c) {
  if (!c) return "—";
  const badge = c.na
    ? `<span class="na-tag">N/A</span>`
    : `<span class="crit-score">${c.score} / ${c.max}</span>`;
  const value = c.value ? `<div class="crit-value">${c.value}</div>` : "";
  const note = c.note ? `<details class="crit-note"><summary>por quê?</summary><p>${c.note}</p></details>` : "";
  return `${badge}${value}${note}`;
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.getElementById("last-updated").textContent = new Date().toLocaleDateString("en-US", {
  year: "numeric", month: "long", day: "numeric"
});

renderPriceCards();
renderMetricsTable();
renderScoresSummary();
renderFeaturesCards();
renderSchoolsCards();
