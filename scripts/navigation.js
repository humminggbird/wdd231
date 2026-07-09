const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
  const isOpen = navList.classList.toggle("show");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
