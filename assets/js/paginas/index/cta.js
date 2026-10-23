document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.fiber-cta');
  if (!section || !('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealItems = section.querySelectorAll('[data-cta-reveal]');
  if (!revealItems.length) return;

  section.classList.add('cta-reveal-ready');

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-revealed');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  revealItems.forEach(item => observer.observe(item));
});
