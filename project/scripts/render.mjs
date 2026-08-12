
import { getTotalPrice, formatCedis, getCostPerWatt } from "./data.mjs";

function buildCard(panel) {
  const total = getTotalPrice(panel);
  const perWatt = getCostPerWatt(panel);

  const priceLabel = panel.source === "China" ? "Estimated landed price" : "Local retail price";
  const badge = panel.source === "China" ? "Imported from China" : "Sold in Ghana";

  return `
    <li class="panel-card">
      <p class="badge badge-${panel.source.toLowerCase()}">${badge}</p>
      <h3>${panel.brand} ${panel.model}</h3>
      <dl class="specs">
        <dt>Power</dt>
        <dd>${panel.wattage} W</dd>
        <dt>Efficiency</dt>
        <dd>${panel.efficiency}%</dd>
        <dt>Lifespan</dt>
        <dd>${panel.lifespanYears} years</dd>
        <dt>Sold by</dt>
        <dd>${panel.seller}</dd>
      </dl>
      <p class="price">${formatCedis(total)}</p>
      <p class="price-label">${priceLabel}</p>
      <p class="per-watt">${formatCedis(perWatt)} per watt</p>
      <button class="details-button" type="button" data-id="${panel.id}">
        View details
      </button>
    </li>
  `;
}

export function displayPanels(panels, container) {
  let html = "";

  panels.forEach((panel) => {
    html = html + buildCard(panel);
  });

  container.innerHTML = html;
}

export function displayCompanies(companies, container) {
  let html = "";

  companies.forEach((company) => {
    html =
      html +
      `
      <li class="company-row">
        <img class="company-photo" src="${company.image}" alt="${company.imageAlt}"
          width="800" height="450" loading="lazy">
        <div>
          <h3>${company.name}</h3>
          <p class="company-town">${company.town}</p>
          <p>${company.text}</p>
        </div>
      </li>
    `;
  });

  container.innerHTML = html;
}
