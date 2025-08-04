const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Set current year in footer
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');

        if (answer.style.maxHeight) {
            answer.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Modal Functionality
const bookingModal = document.getElementById('booking-modal');
const closeButtons = document.querySelectorAll('.close-button');
const bookingFormContainer = document.getElementById('booking-form-container');
const confirmationMessage = document.getElementById('confirmation-message');
const bookingForm = document.getElementById('booking-form');

// Open modal when any .open-booking-modal is clicked
document.querySelectorAll('.open-booking-modal').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.style.display = 'flex';
        bookingFormContainer.style.display = 'block';
        confirmationMessage.style.display = 'none';
    });
});

// Close modal when close button or outside click
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        bookingModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target == bookingModal) {
        bookingModal.style.display = 'none';
    }
});

// Handle form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real scenario, you would send this data to a server
    // For this static site, we just simulate success
    bookingFormContainer.style.display = 'none';
    confirmationMessage.style.display = 'block';
    bookingForm.reset(); // Clear the form
});