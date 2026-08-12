
const slideImage = document.querySelector("#slide-image");
const slideName = document.querySelector("#slide-name");
const slideText = document.querySelector("#slide-text");
const slideDots = document.querySelector("#slide-dots");
const slideCounter = document.querySelector("#slide-counter");
const slideMeta = document.querySelector("#slide-meta");
const prevButton = document.querySelector("#slide-prev");
const nextButton = document.querySelector("#slide-next");

let slides = [];
let current = 0;

function buildMeta(company) {
  const facts = [
    { label: "Country", value: company.source },
    { label: "Headquarters", value: company.town }
  ];

  if (company.founded) {
    facts.push({ label: "Founded", value: company.founded });
  }
  if (company.tier) {
    facts.push({ label: "Tier", value: company.tier });
  }

  let html = "";
  facts.forEach((fact) => {
    html = html + `<div><dt>${fact.label}</dt><dd>${fact.value}</dd></div>`;
  });

  slideMeta.innerHTML = html;
}

function showSlide(index) {
  const company = slides[index];

  slideImage.src = company.image;
  slideImage.alt = company.imageAlt;
  slideName.textContent = company.name;
  slideText.textContent = company.text;

  slideCounter.textContent = `${index + 1} / ${slides.length}`;

  buildMeta(company);

  const dots = slideDots.querySelectorAll("button");
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("current", dotIndex === index);
    if (dotIndex === index) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });
}

function buildDots() {
  let html = "";

  slides.forEach((company, index) => {
    html =
      html +
      `<button type="button" data-index="${index}">
        <span class="visually-hidden">Show ${company.name}</span>
      </button>`;
  });

  slideDots.innerHTML = html;
}

function move(step) {
  current = (current + step + slides.length) % slides.length;
  showSlide(current);
}

export function loadSlides(companies) {
  slides = companies;
  current = 0;

  if (slides.length === 0) {
    return;
  }

  buildDots();
  showSlide(current);
}

export function setupSlider() {
  prevButton.addEventListener("click", () => {
    move(-1);
  });

  nextButton.addEventListener("click", () => {
    move(1);
  });

  slideDots.addEventListener("click", (event) => {
    const dot = event.target.closest("button");
    if (dot !== null) {
      current = Number(dot.dataset.index);
      showSlide(current);
    }
  });
}
