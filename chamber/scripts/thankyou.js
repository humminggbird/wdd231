const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuButton.classList.toggle('open');
    const open = menuButton.classList.contains('open');
    menuButton.setAttribute('aria-expanded', open);
});

const params = new URLSearchParams(window.location.search);

const fields = {
    'out-first-name': 'first-name',
    'out-last-name': 'last-name',
    'out-email': 'email',
    'out-phone': 'phone',
    'out-organization': 'organization',
    'out-timestamp': 'timestamp',
};

for (const [elementId, paramName] of Object.entries(fields)) {
    const value = params.get(paramName);
    document.querySelector(`#${elementId}`).textContent = value ? value : 'Not provided';
}

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modification: ${document.lastModified}`;
