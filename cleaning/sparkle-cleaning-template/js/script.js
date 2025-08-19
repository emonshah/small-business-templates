// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Close mobile menu when a nav link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Active Nav Link highlighting based on page URL
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Set current year dynamically in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Scroll Reveal Animation
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });

    // Booking form submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        console.log('Booking form found, attaching submit listener.'); // Debug log
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submission prevented!'); // Debug log
            const successMessage = document.getElementById('booking-success-message');

            // Reset the form
            bookingForm.reset();

            // Show success message
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Optional: Hide the message after a few seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000); // Hides after 5 seconds
        });
    }

    // Smooth scroll and blink effect for "Book Now" buttons
    document.querySelectorAll('.book-now-scroll').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Smooth scroll to the target section
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });

                // Add blink effect to the booking form card
                const bookingFormCard = document.getElementById('booking-form-card');
                if (bookingFormCard) {
                    bookingFormCard.classList.add('blink');

                    // Remove blink effect after a few seconds
                    setTimeout(() => {
                        bookingFormCard.classList.remove('blink');
                    }, 3000); // Blink for 3 seconds
                }
            }
        });
    });
}); // Closing tag for DOMContentLoaded