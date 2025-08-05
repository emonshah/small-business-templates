tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#0c4a6e',       // Navy
                        secondary: '#0ea5e9',     // Sky Blue
                        accent: '#f3f4f6',        // Light Gray
                        highlight: '#e0f2fe'      // Light Sky Blue
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif']
                    }
                }
            }
        };

        // Modal functions (Global Scope)
        function openQuoteModal() {
            document.getElementById('quoteModal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
        
        function closeQuoteModal() {
            document.getElementById('quoteModal').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }

        document.addEventListener('DOMContentLoaded', function() {
            // Tab functionality
            document.querySelectorAll('.tab-button').forEach(button => {
                button.addEventListener('click', function() {
                    document.querySelectorAll('.tab-button').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // Close modal when clicking outside
            window.onclick = function(event) {
                const modal = document.getElementById('quoteModal');
                if (event.target === modal) {
                    closeQuoteModal();
                }
            }

            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();

                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            // Set current year in footer
            const yearSpan = document.getElementById('current-year');
            if (yearSpan) {
                yearSpan.innerText = new Date().getFullYear();
            }

            // Animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.slide-in, .fade-in').forEach(el => {
                observer.observe(el);
            });
            
            // Before-after slider
            document.querySelectorAll('.before-after').forEach(function(element) {
                let slider = document.createElement('div');
                slider.className = 'slider';
                element.appendChild(slider);

                let isDragging = false;

                element.addEventListener('mousedown', function() {
                    isDragging = true;
                });

                window.addEventListener('mouseup', function() {
                    isDragging = false;
                });

                element.addEventListener('mousemove', function(e) {
                    if (!isDragging) return;

                    let rect = element.getBoundingClientRect();
                    let x = e.clientX - rect.left;
                    let width = rect.width;
                    let percentage = (x / width) * 100;

                    if (percentage > 100) percentage = 100;
                    if (percentage < 0) percentage = 0;

                    slider.style.left = percentage + '%';
                    element.querySelector('img:first-of-type').style.clipPath = 'inset(0 ' + (100 - percentage) + '% 0 0)';
                });
            });

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                    mobileMenu.classList.toggle('hidden');
                });
            }

            // Quote form submission
            const quoteForm = document.getElementById('quoteForm');
            const successMessage = document.getElementById('form-success-message');

            if (quoteForm && successMessage) { // Added check for existence
                quoteForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    quoteForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                });
            }

            // Service section interactive display
            document.querySelectorAll('.service-item').forEach(item => {
                item.addEventListener('mouseover', function() {
                    const image = this.dataset.image;
                    const title = this.dataset.title;
                    const description = this.dataset.description;

                    document.getElementById('service-image').src = image;
                    document.getElementById('service-title').innerText = title;
                    document.getElementById('service-description').innerText = description;
                });
            });
        });