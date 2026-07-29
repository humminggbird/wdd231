const menuButton = document.querySelector('#menu-button');
const navList = document.querySelector('#primary-nav ul');

menuButton.addEventListener('click', () => {
    navList.classList.toggle('show');
    menuButton.classList.toggle('open');
    const open = menuButton.classList.contains('open');
    menuButton.setAttribute('aria-expanded', open);
});

document.querySelector('#timestamp').value = new Date().toLocaleString();

const openButtons = document.querySelectorAll('.level-link');

openButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const dialog = document.querySelector(`#${button.dataset.dialog}`);
        dialog.showModal();
    });
});

const dialogs = document.querySelectorAll('.level-dialog');

dialogs.forEach((dialog) => {
    dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent =
    `Last Modification: ${document.lastModified}`;
