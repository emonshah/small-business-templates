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
    if (stickyCta && window.scrollY > 500) {
        stickyCta.classList.add('active');
    } else if (stickyCta) {
        stickyCta.classList.remove('active');
    }
});

// Price calculator functionality
const priceCalculator = document.getElementById('pricing');
if (priceCalculator) {
    const sqFtSlider = document.getElementById('sq-ft-slider');
    const sqFtValue = document.getElementById('sq-ft-value');
    const priceDisplay = document.getElementById('price-display');
    const frequencyBtns = document.querySelectorAll('.frequency-btn');
    const addonCheckboxes = document.querySelectorAll('.custom-checkbox');

    const basePricePerSqFt = 0.15;
    const frequencyDiscounts = {
        'One-time': 1.0,
        'Weekly': 0.85,
        'Monthly': 0.9,
    };
    const addonPrices = {
        'windows': 30,
        'fridge': 25,
        'oven': 35,
    };

    function calculatePrice() {
        const sqFt = parseInt(sqFtSlider.value);
        let activeFrequency = 'Monthly';
        frequencyBtns.forEach(btn => {
            if (btn.classList.contains('bg-primary')) {
                activeFrequency = btn.textContent;
            }
        });

        let price = sqFt * basePricePerSqFt;
        price *= frequencyDiscounts[activeFrequency];

        addonCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                price += addonPrices[checkbox.id];
            }
        });

        sqFtValue.textContent = `${sqFt} sq ft`;
        priceDisplay.textContent = `$${Math.round(price)}`;
    }

    sqFtSlider.addEventListener('input', calculatePrice);
    frequencyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            frequencyBtns.forEach(b => {
                b.classList.remove('bg-primary', 'text-white');
                b.classList.add('text-gray-600');
            });
            btn.classList.add('bg-primary', 'text-white');
            btn.classList.remove('text-gray-600');
            calculatePrice();
        });
    });
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('input', calculatePrice);
    });
    calculatePrice(); // Initial calculation
}

// Set current year in footer
const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// --- START OF BOOKING FORM LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const bookingFormContainer = document.getElementById('booking');
    if (!bookingFormContainer) return;

    // Data
    const services = [
        { name: 'Residential Cleaning', price: 90, icon: 'fa-home', color: 'primary' },
        { name: 'Office Cleaning', price: 150, icon: 'fa-building', color: 'accent' },
        { name: 'Deep Cleaning', price: 120, icon: 'fa-broom', color: 'highlight' },
        { name: 'Carpet Cleaning', price: 75, icon: 'fa-couch', color: 'primary' },
    ];
    const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'];

    // State
    let currentStep = 1;
    const bookingData = { service: null, date: null, time: null, name: null, email: null, phone: null, address: null, notes: null };

    // DOM Elements
    const stepIndicatorContainer = document.getElementById('step-indicator-container');
    const progressBar = document.getElementById('progress-bar');
    const stepIndicators = stepIndicatorContainer.querySelectorAll('.step-indicator');
    const stepContents = bookingFormContainer.querySelectorAll('.step-content');
    const nextStepBtns = bookingFormContainer.querySelectorAll('.next-step-btn');
    const prevStepBtns = bookingFormContainer.querySelectorAll('.prev-step-btn');
    const serviceOptionsContainer = document.getElementById('service-options-container');
    const bookingDateInput = document.getElementById('booking-date');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const bookingSummary = document.getElementById('booking-summary');
    const bookingSuccess = document.getElementById('booking-success');
    const addressInput = document.getElementById('address');
    const mapContainer = document.getElementById('map-container');
    const bookingFormElement = document.getElementById('booking-form');

    const updateStepIndicator = () => {
        const progress = ((currentStep - 1) / (stepIndicators.length -1)) * 100;
        progressBar.style.width = `${progress}%`;

        stepIndicators.forEach((indicator, index) => {
            const step = index + 1;
            const circle = indicator.querySelector('.indicator-circle');
            const text = indicator.querySelector('span');

            circle.classList.remove('bg-primary', 'text-white', 'bg-gray-200', 'text-gray-500');
            text.classList.remove('text-primary', 'text-gray-500');

            if (step < currentStep) {
                circle.classList.add('bg-primary', 'text-white');
                text.classList.add('text-primary');
            } else if (step === currentStep) {
                circle.classList.add('bg-primary', 'text-white');
                text.classList.add('text-primary');
            } else {
                circle.classList.add('bg-gray-200', 'text-gray-500');
                text.classList.add('text-gray-500');
            }
        });
    };

    const showStep = (stepNumber) => {
        stepContents.forEach(content => content.classList.add('hidden'));
        
        if (stepNumber > stepIndicators.length) {
            if(bookingSuccess) bookingSuccess.classList.remove('hidden');
            if(stepIndicatorContainer) stepIndicatorContainer.classList.add('hidden');
             // Hide the form itself
            if(bookingFormElement) bookingFormElement.querySelector('#step-4').classList.add('hidden');

        } else {
            const stepContent = document.getElementById(`step-${stepNumber}`);
            if(stepContent) stepContent.classList.remove('hidden');
        }
        currentStep = stepNumber;
        updateStepIndicator();
    };

    const validateStep = (step) => {
        document.querySelectorAll('[id$="-error"]').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.form-input-error').forEach(el => el.classList.remove('form-input-error'));

        let isValid = true;

        if (step === 1) {
            if (!bookingData.service) {
                document.getElementById('service-error').classList.remove('hidden');
                isValid = false;
            }
        } else if (step === 2) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(bookingDateInput.value + 'T00:00:00');

            if (!bookingDateInput.value || selectedDate < today) {
                document.getElementById('date-error').classList.remove('hidden');
                bookingDateInput.classList.add('form-input-error');
                isValid = false;
            }
            if (!bookingData.time) {
                document.getElementById('time-error').classList.remove('hidden');
                isValid = false;
            }
            if(isValid) bookingData.date = bookingDateInput.value;
        } else if (step === 3) {
            const nameInput = document.getElementById('full-name');
            const emailInput = document.getElementById('email');
            const emailRegex = /^\S+@\S+\.\S+$/;
            if (!nameInput.value.trim()) {
                document.getElementById('name-error').classList.remove('hidden');
                nameInput.classList.add('form-input-error');
                isValid = false;
            }
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                document.getElementById('email-error').classList.remove('hidden');
                emailInput.classList.add('form-input-error');
                isValid = false;
            }
            if (isValid) {
                bookingData.name = nameInput.value.trim();
                bookingData.email = emailInput.value.trim();
                bookingData.phone = document.getElementById('phone').value;
                bookingData.address = document.getElementById('address').value;
                bookingData.notes = document.getElementById('notes').value;
                updateBookingSummary();
            }
        }
        return isValid;
    };

    const updateBookingSummary = () => {
        if (!bookingSummary) return;
        bookingSummary.innerHTML = `
            <div class="p-4 bg-gray-100 rounded-lg border">
                <h4 class="text-lg font-bold mb-3 text-gray-800 border-b pb-2">Booking Summary</h4>
                <div class="space-y-2 text-left">
                    <p><strong>Service:</strong> ${bookingData.service || ''}</p>
                    <p><strong>Date:</strong> ${bookingData.date || ''}</p>
                    <p><strong>Time:</strong> ${bookingData.time || ''}</p>
                    <p><strong>Name:</strong> ${bookingData.name || ''}</p>
                    <p><strong>Email:</strong> ${bookingData.email || ''}</p>
                    <p><strong>Phone:</strong> ${bookingData.phone || 'N/A'}</p>
                    <p><strong>Address:</strong> ${bookingData.address || 'N/A'}</p>
                    <p><strong>Notes:</strong> ${bookingData.notes || 'N/A'}</p>
                </div>
            </div>
        `;
    };

    const renderServices = () => {
        if (!serviceOptionsContainer) return;
        serviceOptionsContainer.innerHTML = '';
        services.forEach(service => {
            const card = document.createElement('div');
            card.className = `service-option-card border-2 border-gray-200 rounded-xl p-6 text-center hover:border-${service.color} hover:bg-${service.color}/5 transition-all duration-300 cursor-pointer`;
            card.dataset.service = service.name;
            card.innerHTML = `
                <i class="fas ${service.icon} text-${service.color} text-4xl mb-4"></i>
                <h4 class="font-bold text-xl">${service.name}</h4>
                <p class="text-gray-600">Starting at $${service.price}</p>
            `;
            card.addEventListener('click', () => {
                serviceOptionsContainer.querySelectorAll('.service-option-card').forEach(c => c.classList.remove('border-primary', 'bg-primary/10'));
                card.classList.add('border-primary', 'bg-primary/10');
                bookingData.service = card.dataset.service;
                document.getElementById('service-error').classList.add('hidden');
            });
            serviceOptionsContainer.appendChild(card);
        });
    };

    const renderTimeSlots = () => {
        if (!timeSlotsContainer) return;
        const selectedDateStr = bookingDateInput.value;
        const now = new Date();
        timeSlotsContainer.innerHTML = '';

        timeSlots.forEach(slot => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'time-slot-btn';
            btn.textContent = slot;

            let isDisabled = !selectedDateStr;
            if (selectedDateStr) {
                const [time, ampm] = slot.split(' ');
                let [hours] = time.split(':');
                hours = parseInt(hours);
                if (ampm === 'PM' && hours < 12) hours += 12;
                if (ampm === 'AM' && hours === 12) hours = 0;
                
                const slotDateTime = new Date(selectedDateStr);
                slotDateTime.setHours(hours, 0, 0, 0);

                if (slotDateTime < now) {
                    isDisabled = true;
                }
            }

            if (isDisabled) {
                btn.disabled = true;
                btn.classList.add('opacity-50', 'cursor-not-allowed');
            }

            btn.addEventListener('click', () => {
                if (btn.disabled) return;
                timeSlotsContainer.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                bookingData.time = slot;
                document.getElementById('time-error').classList.add('hidden');
            });
            timeSlotsContainer.appendChild(btn);
        });
    };

    nextStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const stepToValidate = parseInt(btn.dataset.step);
            if (validateStep(stepToValidate)) {
                showStep(stepToValidate + 1);
            }
        });
    });

    prevStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStepFromBtn = parseInt(btn.dataset.step);
            showStep(currentStepFromBtn - 1);
        });
    });

    if (bookingFormElement) {
        bookingFormElement.addEventListener('submit', (e) => {
            e.preventDefault();
            showStep(5); // Show success message
        });
    }

    if (bookingDateInput) {
        bookingDateInput.addEventListener('change', renderTimeSlots);
        bookingDateInput.min = new Date().toISOString().split('T')[0];
    }

    if (addressInput && mapContainer) {
        addressInput.addEventListener('input', () => {
            if (addressInput.value.trim()) {
                mapContainer.innerHTML = `<p class="text-center p-4">Simulating map for: <strong>${addressInput.value}</strong></p>`;
            } else {
                mapContainer.innerHTML = '<p class="text-center p-4">Enter an address to see the map.</p>';
            }
        });
    }

    renderServices();
    renderTimeSlots();
    showStep(1);
});