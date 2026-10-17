document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('networkBenefitsCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('[data-benefits-track]');
  const slides = carousel.querySelectorAll('[data-benefits-slide]');
  if (!track || slides.length < 2) return;

  let currentIndex = 0;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

  };

  showSlide(0);
  window.setInterval(() => showSlide(currentIndex + 1), 5000);
});