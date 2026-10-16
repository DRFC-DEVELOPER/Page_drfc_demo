const infrastructureSlides = [...document.querySelectorAll('[data-infrastructure-slide]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let infrastructureSlideIndex = 0;

if (infrastructureSlides.length > 1 && !prefersReducedMotion.matches) {
    window.setInterval(() => {
        const currentSlide = infrastructureSlides[infrastructureSlideIndex];
        currentSlide.classList.remove('is-active');
        currentSlide.setAttribute('aria-hidden', 'true');

        infrastructureSlideIndex = (infrastructureSlideIndex + 1) % infrastructureSlides.length;
        const nextSlide = infrastructureSlides[infrastructureSlideIndex];
        nextSlide.classList.add('is-active');
        nextSlide.setAttribute('aria-hidden', 'false');
    }, 4000);
}
