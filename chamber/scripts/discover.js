import { items } from "../data/discover.mjs";

const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#primary-nav ul");

menuButton.addEventListener("click", () => {
    navList.classList.toggle("show");
    menuButton.classList.toggle("open");
    const open = menuButton.classList.contains("open");
    menuButton.setAttribute("aria-expanded", open);
});

const gallery = document.querySelector("#gallery");

function displayItems(list) {
    gallery.innerHTML = list
        .map(
            (item) => `
      <section class="place-card">
        <h2>${item.name}</h2>
        <figure>
          <img src="images/${item.image}" alt="${item.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button class="learn-more">Learn More</button>
      </section>`
        )
        .join("");
}

displayItems(items);

const visitorMsg = document.querySelector("#visitor-msg");
const visitElapsed = document.querySelector("#visit-elapsed");
const lastVisitKey = "discover-last-visit";
const now = Date.now();
const lastVisit = localStorage.getItem(lastVisitKey);
const msPerDay = 1000 * 60 * 60 * 24;

if (!lastVisit) {
    visitorMsg.textContent = "Welcome! Let us know if you have any questions.";
    visitElapsed.textContent = "";
} else {
    const elapsedMs = now - Number(lastVisit);
    const days = Math.floor(elapsedMs / msPerDay);
    if (days < 1) {
        visitorMsg.textContent = "Back so soon! Awesome!";
    } else if (days === 1) {
        visitorMsg.textContent = "You last visited 1 day ago.";
    } else {
        visitorMsg.textContent = `You last visited ${days} days ago.`;
    }

    const seconds = Math.floor(elapsedMs / 1000);
    if (seconds < 60) {
        const unit = seconds === 1 ? "second" : "seconds";
        visitElapsed.textContent = `You visited ${seconds} ${unit} ago.`;
    } else {
        const minutes = Math.floor(seconds / 60);
        const unit = minutes === 1 ? "minute" : "minutes";
        visitElapsed.textContent = `You visited ${minutes} ${unit} ago.`;
    }
}

localStorage.setItem(lastVisitKey, now);

document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;
