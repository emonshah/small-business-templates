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

        // Modal functions
        function openQuoteModal() {
            document.getElementById('quoteModal').classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
        
        function closeQuoteModal() {
            document.getElementById('quoteModal').classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        
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