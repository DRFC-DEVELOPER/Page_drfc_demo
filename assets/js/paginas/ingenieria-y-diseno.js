const constructionCarousel = document.getElementById('constructionCarousel');
const constructionSlides = constructionCarousel ? [...constructionCarousel.querySelectorAll('[data-carousel-slide]')] : [];
let constructionSlideIndex = 0;
let constructionCarouselTimer;

if (constructionCarousel && constructionSlides.length) {
    function showConstructionSlide(index) {
        constructionSlideIndex = (index + constructionSlides.length) % constructionSlides.length;
        constructionSlides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === constructionSlideIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });
    }

    function startConstructionCarousel() {
        window.clearInterval(constructionCarouselTimer);
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            constructionCarouselTimer = window.setInterval(() => {
                showConstructionSlide(constructionSlideIndex + 1);
            }, 4000);
        }
    }

    startConstructionCarousel();
}

const capacityCounter = document.querySelector('[data-capacity-counter]');
const capacityTarget = 500;
const capacityDuration = 2600;

if (capacityCounter) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        capacityCounter.textContent = capacityTarget;
    } else {
        let capacityStartTime;

        function animateCapacityCounter(currentTime) {
            if (!capacityStartTime) capacityStartTime = currentTime;
            const progress = Math.min((currentTime - capacityStartTime) / capacityDuration, 1);
            const easedProgress = 1 - Math.pow(2, -10 * progress);
            capacityCounter.textContent = Math.floor(easedProgress * capacityTarget);

            if (progress < 1) {
                window.requestAnimationFrame(animateCapacityCounter);
            } else {
                capacityCounter.textContent = capacityTarget;
            }
        }

        window.setTimeout(() => window.requestAnimationFrame(animateCapacityCounter), 200);
    }
}

// Modal functions
function openModal(sectorName = null) {
    const modal = document.getElementById('proposalModal');
    const container = document.getElementById('modalContainer');
    if (!modal || !container) return;

    if (sectorName) {
        const select = document.getElementById('sectorSelect');
        if (select) {
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].text.toLowerCase().includes(sectorName.toLowerCase())) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }
    }
    modal.classList.remove('hidden');
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        container.classList.remove('scale-95');
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('proposalModal');
    const container = document.getElementById('modalContainer');
    if (!modal || !container) return;

    modal.classList.add('opacity-0');
    container.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        const toast = document.getElementById('modalToast');
        if (toast) toast.classList.add('hidden');
        const form = document.getElementById('contactForm');
        if (form) form.reset();
    }, 300);
}

function selectAudience(audienceName) {
    openModal(audienceName);
}

function scrollToServices() {
    const alcance = document.getElementById('alcance');
    if (alcance) {
        alcance.scrollIntoView({ behavior: 'smooth' });
    }
}

function submitForm(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const toast = document.getElementById('modalToast');
    if (toast) {
        toast.textContent = 'Se abrirá tu aplicación de correo. La solicitud se enviará cuando confirmes el envío desde allí.';
        toast.classList.remove('hidden');
    }
    const body = [
        `Nombre: ${formData.get('nombre')}`,
        `Correo electrónico: ${formData.get('correo')}`,
        `Tipo de proyecto / sector: ${formData.get('sector')}`,
        '',
        'Detalles del proyecto:',
        formData.get('detalles') || 'No especificados'
    ].join('\r\n');
    const subject = 'Solicitud de ingeniería y diseño';
    window.location.href = `mailto:contacto@drfc.com.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Close modal when clicking on backdrop
window.onclick = function(event) {
    const modal = document.getElementById('proposalModal');
    if (modal && event.target === modal) {
        closeModal();
    }
}
