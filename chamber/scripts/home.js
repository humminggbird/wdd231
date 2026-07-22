const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
  navList.classList.toggle('show');
  menuButton.classList.toggle('open');
  const open = menuButton.classList.contains('open');
  menuButton.setAttribute('aria-expanded', open);
});

const apiKey = '3fc2d1c353543cfae90d7d0a2d48ada3';
const lat = 5.56;
const lon = -0.19;

const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

async function getWeather() {
  try {
    const currentResponse = await fetch(currentUrl);
    const forecastResponse = await fetch(forecastUrl);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Weather request failed');
    }

    const current = await currentResponse.json();
    const forecastData = await forecastResponse.json();

    displayCurrent(current);
    displayForecast(forecastData);
  } catch (error) {
    currentWeather.innerHTML = '<p>Weather data is unavailable right now.</p>';
  }
}

function displayCurrent(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  currentWeather.innerHTML = `
    <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}" width="70" height="70">
    <p class="temp">${temp}&deg;C</p>
    <p class="description">${description}</p>
  `;
}

function displayForecast(data) {
  const noonReadings = data.list.filter((item) => item.dt_txt.includes('12:00:00'));
  const days = noonReadings.slice(0, 3);

  forecast.innerHTML = days
    .map((day) => {
      const date = new Date(day.dt * 1000);
      const label = date.toLocaleDateString('en-US', { weekday: 'short' });
      const temp = Math.round(day.main.temp);
      return `
        <div class="forecast-day">
          <p class="forecast-label">${label}</p>
          <p class="forecast-temp">${temp}&deg;C</p>
        </div>`;
    })
    .join('');
}

getWeather();

const membersUrl = 'data/members.json';
const spotlightCards = document.querySelector('#spotlight-cards');
const levels = { 2: 'Silver Member', 3: 'Gold Member' };
const levelClass = { 2: 'silver', 3: 'gold' };

async function getSpotlights() {
  const response = await fetch(membersUrl);
  const data = await response.json();

  const eligible = data.members.filter((member) => member.membership >= 2);
  const chosen = shuffle(eligible).slice(0, 3);
  displaySpotlights(chosen);
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function displaySpotlights(members) {
  spotlightCards.innerHTML = members
    .map((member) => `
      <section class="spotlight ${levelClass[member.membership]}">
        <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
        <h3>${member.name}</h3>
        <p class="tagline">${member.tagline}</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>
        <span class="badge ${levelClass[member.membership]}">${levels[member.membership]}</span>
      </section>`)
    .join('');
}

getSpotlights();

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
  `Last Modification: ${document.lastModified}`;
