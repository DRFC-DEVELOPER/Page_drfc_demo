document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('networkBenefitsCarousel');
  const section = document.querySelector('.network-benefits');
  if (!section) return;

  if (
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    const revealItems = section.querySelectorAll('[data-benefits-reveal]');
    section.classList.add('benefits-reveal-ready');

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });

    revealItems.forEach(item => observer.observe(item));
  }

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
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.setInterval(() => showSlide(currentIndex + 1), 5000);
});