// ---------- Responsive navigation ----------
const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
  navList.classList.toggle('show');
  menuButton.classList.toggle('open');
  const open = menuButton.classList.contains('open');
  menuButton.setAttribute('aria-expanded', open);
});

// ---------- Directory data ----------
const url = 'data/members.json';
const directory = document.querySelector('#directory');

const levels = { 1: 'Member', 2: 'Silver Member', 3: 'Gold Member' };
const levelClass = { 1: 'basic', 2: 'silver', 3: 'gold' };

async function getMembers() {
  const response = await fetch(url);
  const data = await response.json();
  displayMembers(data.members);
}

const displayMembers = (members) => {
  directory.innerHTML = '';

  members.forEach((member) => {
    const card = document.createElement('section');
    card.classList.add('member');

    const name = document.createElement('h2');
    name.textContent = member.name;

    const tagline = document.createElement('p');
    tagline.classList.add('tagline');
    tagline.textContent = member.tagline;

    const body = document.createElement('div');
    body.classList.add('card-body');

    const portrait = document.createElement('img');
    portrait.setAttribute('src', `images/${member.image}`);
    portrait.setAttribute('alt', `${member.name} logo`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '120');
    portrait.setAttribute('height', '120');

    const info = document.createElement('div');
    info.classList.add('info');
    info.innerHTML = `
      <p>${member.address}</p>
      <p class="phone-line">${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>
    `;

    body.appendChild(portrait);
    body.appendChild(info);

    const badge = document.createElement('span');
    badge.classList.add('badge');
    if (levelClass[member.membership]) badge.classList.add(levelClass[member.membership]);
    badge.textContent = levels[member.membership];

    card.appendChild(name);
    card.appendChild(tagline);
    card.appendChild(body);
    card.appendChild(badge);

    directory.appendChild(card);
  });
};

getMembers();

// ---------- Grid / List toggle ----------
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

function setView(view) {
  const isGrid = view === 'grid';
  directory.classList.toggle('grid', isGrid);
  directory.classList.toggle('list', !isGrid);

  gridButton.classList.toggle('active', isGrid);
  listButton.classList.toggle('active', !isGrid);
  gridButton.setAttribute('aria-pressed', isGrid);
  listButton.setAttribute('aria-pressed', !isGrid);
}

gridButton.addEventListener('click', () => setView('grid'));
listButton.addEventListener('click', () => setView('list'));

// ---------- Footer year & last modified ----------
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
  `Last Modification: ${document.lastModified}`;
