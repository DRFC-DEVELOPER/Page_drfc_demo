const activeMaintenanceSlides = [...document.querySelectorAll('[data-active-maintenance-slide]')];
let activeMaintenanceSlideIndex = activeMaintenanceSlides.findIndex(slide => slide.classList.contains('is-active'));

if (activeMaintenanceSlides.length > 1) {
    if (activeMaintenanceSlideIndex < 0) {
        activeMaintenanceSlideIndex = 0;
        activeMaintenanceSlides[activeMaintenanceSlideIndex].classList.add('is-active');
        activeMaintenanceSlides[activeMaintenanceSlideIndex].setAttribute('aria-hidden', 'false');
    }

    window.setInterval(() => {
        const currentSlide = activeMaintenanceSlides[activeMaintenanceSlideIndex];
        currentSlide.classList.remove('is-active');
        currentSlide.setAttribute('aria-hidden', 'true');

        activeMaintenanceSlideIndex = (activeMaintenanceSlideIndex + 1) % activeMaintenanceSlides.length;
        const nextSlide = activeMaintenanceSlides[activeMaintenanceSlideIndex];
        nextSlide.classList.add('is-active');
        nextSlide.setAttribute('aria-hidden', 'false');
    }, 4000);
}

const activeMaintenanceImages = [...document.querySelectorAll('[data-active-maintenance-image-slide]')];
let activeMaintenanceImageIndex = activeMaintenanceImages.findIndex(image => image.classList.contains('is-active'));

if (activeMaintenanceImages.length > 1) {
    if (activeMaintenanceImageIndex < 0) {
        activeMaintenanceImageIndex = 0;
        activeMaintenanceImages[activeMaintenanceImageIndex].classList.add('is-active');
        activeMaintenanceImages[activeMaintenanceImageIndex].setAttribute('aria-hidden', 'false');
    }

    window.setInterval(() => {
        const currentImage = activeMaintenanceImages[activeMaintenanceImageIndex];
        currentImage.classList.remove('is-active');
        currentImage.setAttribute('aria-hidden', 'true');

        activeMaintenanceImageIndex = (activeMaintenanceImageIndex + 1) % activeMaintenanceImages.length;
        const nextImage = activeMaintenanceImages[activeMaintenanceImageIndex];
        nextImage.classList.add('is-active');
        nextImage.setAttribute('aria-hidden', 'false');
    }, 4000);
}
