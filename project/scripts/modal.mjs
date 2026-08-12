
import { getTotalPrice, formatCedis, getCostPerWatt } from "./data.mjs";

const dialog = document.querySelector("#panel-dialog");
const dialogBody = document.querySelector("#dialog-body");
const closeButton = document.querySelector("#dialog-close");

function buildPriceSection(panel) {
  if (panel.source === "China") {
    return `
      <h4>Estimated landed price</h4>
      <dl class="specs">
        <dt>Base price in China</dt>
        <dd>${formatCedis(panel.priceBase)}</dd>
        <dt>Estimated import and clearing</dt>
        <dd>${formatCedis(panel.importEstimate)}</dd>
        <dt>Estimated total</dt>
        <dd>${formatCedis(getTotalPrice(panel))}</dd>
      </dl>
      <p class="warning">
        This total is an ESTIMATE, not a quote. Shipping, duty and clearing
        charges change often, so confirm the cost with your clearing agent.
      </p>
    `;
  }

  return `
    <h4>Local retail price</h4>
    <p class="price">${formatCedis(getTotalPrice(panel))}</p>
    <p>Bought in Ghana from ${panel.seller}, so there is nothing to clear.</p>
  `;
}

export function openPanelModal(panel) {
  dialogBody.innerHTML = `
    <h3>${panel.brand} ${panel.model}</h3>
    <dl class="specs">
      <dt>Power</dt>
      <dd>${panel.wattage} W</dd>
      <dt>Efficiency</dt>
      <dd>${panel.efficiency}%</dd>
      <dt>Cell type</dt>
      <dd>${panel.type}</dd>
      <dt>Lifespan</dt>
      <dd>${panel.lifespanYears} years</dd>
      <dt>Sold by</dt>
      <dd>${panel.seller}</dd>
      <dt>Cost per watt</dt>
      <dd>${formatCedis(getCostPerWatt(panel))}</dd>
    </dl>
    ${buildPriceSection(panel)}
  `;

  dialog.showModal();
}

export function setupModal() {
  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}
