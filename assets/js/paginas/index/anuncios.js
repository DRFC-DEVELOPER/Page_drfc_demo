document.addEventListener('DOMContentLoaded', () => {
  const announcements = document.querySelector('.announcements');
  const announcementsRect = announcements && announcements.getBoundingClientRect();
  const announcementsAreVisible = announcementsRect &&
    announcementsRect.top < window.innerHeight &&
    announcementsRect.bottom > 0;

  if (
    announcements &&
    !announcementsAreVisible &&
    'IntersectionObserver' in window &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    announcements.classList.add('announcement-reveal-ready');

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        announcements.classList.add('is-revealed');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    observer.observe(announcements);
  }

  const carousel = document.getElementById('announcementsCarousel');
  if (!carousel) return;

  const track = carousel.querySelector('[data-announcements-track]');
  const slides = Array.from(carousel.querySelectorAll('[data-announcement-slide]'));
  const controls = carousel.querySelector('[data-announcements-controls]');
  const indicators = carousel.querySelector('[data-announcement-indicators]');
  const previousButton = carousel.querySelector('[data-announcement-previous]');
  const nextButton = carousel.querySelector('[data-announcement-next]');

  if (!track || !controls || !indicators || !previousButton || !nextButton || slides.length < 2) return;

  let currentIndex = 0;

  slides.forEach((slide, index) => {
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'anuncio');
    slide.setAttribute('aria-label', `${index + 1} de ${slides.length}`);

    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.className = 'announcement-indicator';
    indicator.setAttribute('aria-label', `Mostrar anuncio ${index + 1}`);
    indicator.addEventListener('click', () => showSlide(index));
    indicators.appendChild(indicator);
  });

  const indicatorButtons = Array.from(indicators.querySelectorAll('.announcement-indicator'));
  controls.hidden = false;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.setAttribute('aria-hidden', String(!isActive));
      slide.inert = !isActive;
    });

    indicatorButtons.forEach((button, buttonIndex) => {
      if (buttonIndex === currentIndex) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }

  previousButton.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton.addEventListener('click', () => showSlide(currentIndex + 1));
  showSlide(0);
});
