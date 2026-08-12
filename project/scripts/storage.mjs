
const VIEW_KEY = "ghsolar-view";
const COMPARE_KEY = "ghsolar-compare";

export function getSavedView() {
  const saved = localStorage.getItem(VIEW_KEY);
  return saved === null ? "all" : saved;
}

export function saveView(view) {
  localStorage.setItem(VIEW_KEY, view);
}

export function getCompareList() {
  const saved = localStorage.getItem(COMPARE_KEY);
  if (saved === null) {
    return [];
  }
  return JSON.parse(saved);
}

export function saveCompareList(ids) {
  localStorage.setItem(COMPARE_KEY, JSON.stringify(ids));
}
