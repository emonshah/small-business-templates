        // Initialize Swiper for testimonials
        const testimonialSwiper = new Swiper('.testimonialSwiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 5000,
            },
        });
        
        // Scroll animations
        const fadeElements = document.querySelectorAll('.fade-in-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Sticky CTA for mobile
        window.addEventListener('scroll', () => {
            const stickyCta = document.querySelector('.sticky-cta');
            if (window.scrollY > 500) {
                stickyCta.classList.add('active');
            } else {
                stickyCta.classList.remove('active');
            }
        });
        
        // Price calculator functionality
        const squareFeetSlider = document.querySelector('input[type="range"]');
        const squareFeetValue = document.getElementById('square-feet-value');
        
        squareFeetSlider.addEventListener('input', () => {
            squareFeetValue.textContent = `${squareFeetSlider.value} sq ft`;
            updatePrice();
        });
        
        function updatePrice() {
            // In a real implementation, this would calculate based on inputs
            document.querySelector('.text-5xl').textContent = `$${Math.floor(120 + Math.random() * 80)}`;
        }
        
        // Service card interactions
        document.querySelectorAll('.service-card button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const service = button.getAttribute('data-service');
                alert(`Customizing package for: ${service.replace('-', ' ')}`);
            });
        });
        
        // Step indicator interactions
        document.querySelectorAll('.step-indicator').forEach((step, index) => {
            step.addEventListener('click', () => {
                document.querySelectorAll('.step-indicator').forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('completed');
                        s.classList.remove('active');
                    } else {
                        s.classList.remove('completed', 'active');
                    }
                });
                step.classList.add('active');
            });
        });
   