document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('drfcHeroCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-slide');
    const dots = carousel.querySelectorAll('.indicator-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!slides.length || !dots.length) return;

    const AUTOPLAY_DELAY = 4000; // 4 segundos
    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let isHovered = false;

    function goToSlide(index) {
        if (index === currentIndex) return;

        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        slides[currentIndex].classList.remove('active');
        slides[currentIndex].setAttribute('aria-hidden', 'true');
        dots[currentIndex].classList.remove('active');
        dots[currentIndex].setAttribute('aria-selected', 'false');

        currentIndex = index;
        slides[currentIndex].classList.add('active');
        slides[currentIndex].setAttribute('aria-hidden', 'false');
        dots[currentIndex].classList.add('active');
        dots[currentIndex].setAttribute('aria-selected', 'true');

        resetAutoplay();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
        stopAutoplay();
        if (!isHovered) {
            carousel.classList.remove('carousel-paused');
            autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
        }
    }

    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        carousel.classList.add('carousel-paused');
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
    });

    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation();
            const slideIndex = parseInt(e.currentTarget.getAttribute('data-slide-to'), 10);
            goToSlide(slideIndex);
        });
    });

    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    carousel.addEventListener('mouseenter', () => {
        isHovered = true;
        stopAutoplay();
    });

    carousel.addEventListener('mouseleave', () => {
        isHovered = false;
        startAutoplay();
    });

    // Swipe táctil
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            prevSlide();
        }
    }

    startAutoplay();
});
