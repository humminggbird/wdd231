export default function setupMenu() {
  const menuButton = document.querySelector("#menu-button");
  const navList = document.querySelector("#nav-list");

  if (menuButton === null || navList === null) {
    return;
  }

  menuButton.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);
  });
}
