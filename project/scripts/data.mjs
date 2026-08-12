
const panelsUrl = "data/panels.json";
const companiesUrl = "data/companies.json";

async function loadJson(url) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getPanels() {
  const data = await loadJson(panelsUrl);

  if (data === null) {
    return [];
  }
  return data.panels;
}

export async function getCompanies() {
  const data = await loadJson(companiesUrl);

  if (data === null) {
    return [];
  }
  return data.companies;
}

export function getTotalPrice(panel) {
  return panel.priceBase + panel.importEstimate;
}

export function formatCedis(amount) {
  return `GH₵ ${amount.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}

export function getCostPerWatt(panel) {
  return getTotalPrice(panel) / panel.wattage;
}
