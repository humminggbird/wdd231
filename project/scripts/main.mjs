
import setupMenu from "./nav.mjs";
import { getPanels, getCompanies, getCostPerWatt, getTotalPrice } from "./data.mjs";
import { displayPanels, displayCompanies } from "./render.mjs";
import { setupSlider, loadSlides } from "./slider.mjs";
import { openPanelModal, setupModal } from "./modal.mjs";
import { getSavedView, saveView } from "./storage.mjs";

const grid = document.querySelector("#panel-grid");
const countText = document.querySelector("#result-count");
const viewButtons = document.querySelectorAll(".view-button");
const sortSelect = document.querySelector("#sort-select");
const companyBand = document.querySelector("#company-band");

let allPanels = [];
let allCompanies = [];

function filterBySource(items, view) {
  if (view === "all") {
    return items;
  }
  return items.filter((item) => item.source === view);
}

function sortPanels(panels, order) {
  const copy = [...panels];

  if (order === "price-low") {
    copy.sort((a, b) => getTotalPrice(a) - getTotalPrice(b));
  } else if (order === "power-high") {
    copy.sort((a, b) => b.wattage - a.wattage);
  } else if (order === "value") {
    copy.sort((a, b) => getCostPerWatt(a) - getCostPerWatt(b));
  }

  return copy;
}

function updatePage() {
  const view = getSavedView();

  const chosenCompanies = filterBySource(allCompanies, view);
  loadSlides(chosenCompanies);
  displayCompanies(chosenCompanies, companyBand);

  const chosenPanels = filterBySource(allPanels, view);
  const ordered = sortPanels(chosenPanels, sortSelect.value);
  displayPanels(ordered, grid);

  if (ordered.length === 1) {
    countText.textContent = "Showing 1 panel";
  } else {
    countText.textContent = `Showing ${ordered.length} panels`;
  }
}

function markActiveButton(view) {
  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive);
  });
}

function setupViewButtons() {
  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.view;
      saveView(view);
      markActiveButton(view);
      updatePage();
    });
  });
}

function setupDetailsButtons() {
  grid.addEventListener("click", (event) => {
    if (event.target.classList.contains("details-button")) {
      const id = Number(event.target.dataset.id);
      const panel = allPanels.find((item) => item.id === id);
      openPanelModal(panel);
    }
  });
}

async function startPage() {
  setupMenu();
  setupModal();
  setupSlider();
  setupViewButtons();
  setupDetailsButtons();

  allPanels = await getPanels();
  allCompanies = await getCompanies();

  if (allPanels.length === 0) {
    grid.innerHTML = `<li class="message">Sorry, the panel list could not be loaded. Please refresh the page.</li>`;
    countText.textContent = "";
    return;
  }

  markActiveButton(getSavedView());
  updatePage();

  sortSelect.addEventListener("change", updatePage);
}

startPage();
