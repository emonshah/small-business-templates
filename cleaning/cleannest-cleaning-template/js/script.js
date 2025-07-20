const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Set current year in footer
document.getElementById('copyright-year').textContent = new Date().getFullYear();