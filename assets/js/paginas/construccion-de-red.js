const constructionCarousel = document.getElementById('constructionCarousel');
const constructionSlides = constructionCarousel ? [...constructionCarousel.querySelectorAll('[data-carousel-slide]')] : [];
let constructionSlideIndex = 0;

if (constructionCarousel && constructionSlides.length) {
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
}

const capacityCounter = document.querySelector('[data-capacity-counter]');
const capacityTarget = 800;
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
