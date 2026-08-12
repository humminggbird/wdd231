import setupMenu from "./nav.mjs";
import { getPanels, getTotalPrice, formatCedis, getCostPerWatt } from "./data.mjs";
import { getCompareList, saveCompareList } from "./storage.mjs";

const pickerList = document.querySelector("#picker-list");
const compareArea = document.querySelector("#compare-area");
const clearButton = document.querySelector("#clear-button");
const pickerCount = document.querySelector("#picker-count");

const MAX_PANELS = 4;

let allPanels = [];

function displayPicker() {
  const chosenIds = getCompareList();
  let html = "";

  allPanels.forEach((panel) => {
    const isChecked = chosenIds.includes(panel.id);
    const isDisabled = !isChecked && chosenIds.length >= MAX_PANELS;

    html =
      html +
      `
      <li class="picker-item">
        <input type="checkbox" id="panel-${panel.id}" value="${panel.id}"
          ${isChecked ? "checked" : ""} ${isDisabled ? "disabled" : ""}>
        <label for="panel-${panel.id}">
          <span class="picker-name">${panel.brand} ${panel.model}</span>
          <span class="picker-spec">${panel.wattage} W &bull; ${panel.efficiency}% &bull; ${formatCedis(getTotalPrice(panel))}</span>
        </label>
      </li>
    `;
  });

  pickerList.innerHTML = html;
  pickerCount.textContent = `${chosenIds.length} of ${MAX_PANELS} selected`;
}

function buildRow(label, panels, getValue) {
  let cells = "";

  panels.forEach((panel) => {
    cells = cells + `<td>${getValue(panel)}</td>`;
  });

  return `<tr><th scope="row">${label}</th>${cells}</tr>`;
}

function displayTable() {
  const chosenIds = getCompareList();
  const chosen = allPanels.filter((panel) => chosenIds.includes(panel.id));

  if (chosen.length === 0) {
    compareArea.innerHTML = `
      <p class="message">
        You have not selected any panels yet. Tick up to ${MAX_PANELS} panels above
        to see them side by side.
      </p>
    `;
    return;
  }

  const costs = chosen.map((panel) => getCostPerWatt(panel));
  const bestCost = Math.min(...costs);

  let headings = "";
  chosen.forEach((panel) => {
    headings =
      headings +
      `
      <th scope="col">
        ${panel.brand}<br>${panel.model}
        <button class="remove-button" type="button" data-id="${panel.id}">
          Remove<span class="visually-hidden"> ${panel.brand} ${panel.model}</span>
        </button>
      </th>
    `;
  });

  const rows =
    buildRow("Where sold", chosen, (panel) =>
      panel.source === "China" ? "Imported from China" : "Sold in Ghana"
    ) +
    buildRow("Sold by", chosen, (panel) => panel.seller) +
    buildRow("Power", chosen, (panel) => `${panel.wattage} W`) +
    buildRow("Efficiency", chosen, (panel) => `${panel.efficiency}%`) +
    buildRow("Cell type", chosen, (panel) => panel.type) +
    buildRow("Price", chosen, (panel) =>
      panel.source === "China"
        ? `${formatCedis(getTotalPrice(panel))} <span class="estimate-mark">estimated</span>`
        : formatCedis(getTotalPrice(panel))
    ) +
    `<tr class="value-row"><th scope="row">Cost per watt</th>${chosen
      .map((panel) => {
        const cost = getCostPerWatt(panel);
        const isBest = cost === bestCost;
        return `<td class="${isBest ? "best-value" : ""}">${formatCedis(cost)}${
          isBest ? " <span class='best-tag'>best value</span>" : ""
        }</td>`;
      })
      .join("")}</tr>` +
    buildRow("Lifespan", chosen, (panel) => `${panel.lifespanYears} years`);

  compareArea.innerHTML = `
    <div class="table-scroll">
      <table class="compare-table">
        <caption>The panels you selected, compared side by side</caption>
        <thead>
          <tr><td class="corner-cell"></td>${headings}</tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <p class="warning">
      Prices for imported panels are ESTIMATED landed costs. They include an
      estimate of import and clearing charges and are not firm quotes.
    </p>
  `;
}

function updatePage() {
  displayPicker();
  displayTable();
}

function setupPicker() {
  pickerList.addEventListener("change", (event) => {
    const id = Number(event.target.value);
    let chosenIds = getCompareList();

    if (event.target.checked) {
      chosenIds.push(id);
    } else {
      chosenIds = chosenIds.filter((savedId) => savedId !== id);
    }

    saveCompareList(chosenIds);
    updatePage();
  });
}

function setupRemoveButtons() {
  compareArea.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
      const id = Number(event.target.dataset.id);
      const chosenIds = getCompareList().filter((savedId) => savedId !== id);
      saveCompareList(chosenIds);
      updatePage();
    }
  });
}

async function startPage() {
  setupMenu();
  setupPicker();
  setupRemoveButtons();

  clearButton.addEventListener("click", () => {
    saveCompareList([]);
    updatePage();
  });

  allPanels = await getPanels();

  if (allPanels.length === 0) {
    pickerList.innerHTML = `<li class="message">Sorry, the panel list could not be loaded.</li>`;
    return;
  }

  updatePage();
}

startPage();
