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

const infrastructureIntroSlides = [...document.querySelectorAll('[data-infrastructure-intro-slide]')];
let infrastructureIntroSlideIndex = infrastructureIntroSlides.findIndex(slide => slide.classList.contains('is-active'));

if (infrastructureIntroSlides.length > 1 && !prefersReducedMotion.matches) {
    if (infrastructureIntroSlideIndex < 0) {
        infrastructureIntroSlideIndex = 0;
        infrastructureIntroSlides[infrastructureIntroSlideIndex].classList.add('is-active');
        infrastructureIntroSlides[infrastructureIntroSlideIndex].setAttribute('aria-hidden', 'false');
    }

    window.setInterval(() => {
        const currentSlide = infrastructureIntroSlides[infrastructureIntroSlideIndex];
        currentSlide.classList.remove('is-active');
        currentSlide.setAttribute('aria-hidden', 'true');

        infrastructureIntroSlideIndex = (infrastructureIntroSlideIndex + 1) % infrastructureIntroSlides.length;
        const nextSlide = infrastructureIntroSlides[infrastructureIntroSlideIndex];
        nextSlide.classList.add('is-active');
        nextSlide.setAttribute('aria-hidden', 'false');
    }, 4000);
}
