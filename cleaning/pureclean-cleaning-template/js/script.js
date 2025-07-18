// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.querySelector('.booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you shortly to confirm your booking details.');
    this.reset();
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        header.style.padding = '8px 0'; /* Reduced padding on scroll */
    } else {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        header.style.padding = '15px 0'; /* Initial padding */
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) { // Adjust offset as needed
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const heroImage = document.querySelector('.hero-image-container');
    setTimeout(() => {
        heroImage.style.opacity = '1';
        transform: scale(1);
    }, 300);
    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .benefit-card, .badge, .testimonial-card');
        elements.forEach(el => {
            const position = el.getBoundingClientRect();
            if (position.top < window.innerHeight - 50) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.service-card, .benefit-card, .badge, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Set current year dynamically
    document.getElementById('current-year').textContent = new Date().getFullYear();
});