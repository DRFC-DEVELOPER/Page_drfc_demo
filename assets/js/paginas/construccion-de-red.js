const constructionCarousel = document.getElementById('constructionCarousel');
const constructionSlides = [...constructionCarousel.querySelectorAll('[data-carousel-slide]')];
let constructionSlideIndex = 0;

function showConstructionSlide(index) {
    constructionSlideIndex = (index + constructionSlides.length) % constructionSlides.length;
    constructionSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === constructionSlideIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
    });
}

window.setInterval(() => {
    showConstructionSlide(constructionSlideIndex + 1);
}, 4000);

const capacityCounter = document.querySelector('[data-capacity-counter]');
const capacityTarget = 800;
const capacityDuration = 2600;

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

// Modal functions
function openModal(sectorName = null) {
    const modal = document.getElementById('proposalModal');
    const container = document.getElementById('modalContainer');
    if (sectorName) {
        const select = document.getElementById('sectorSelect');
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase().includes(sectorName.toLowerCase())) {
                select.selectedIndex = i;
                break;
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
    modal.classList.add('opacity-0');
    container.classList.add('scale-95');
    setTimeout(() => {
        modal.classList.add('hidden');
        document.getElementById('modalToast').classList.add('hidden');
        document.getElementById('contactForm').reset();
    }, 300);
}

function selectAudience(audienceName) {
    openModal(audienceName);
}

function scrollToServices() {
    document.getElementById('alcance').scrollIntoView({ behavior: 'smooth' });
}

function submitForm(event) {
    event.preventDefault();
    const toast = document.getElementById('modalToast');
    toast.classList.remove('hidden');
    setTimeout(() => {
        closeModal();
    }, 2000);
}

// Close modal when clicking on backdrop
window.onclick = function(event) {
    const modal = document.getElementById('proposalModal');
    if (event.target === modal) {
        closeModal();
    }
}
