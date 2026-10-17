document.addEventListener('DOMContentLoaded', () => {
  const section = document.querySelector('.collaborators');
  if (!section || !('IntersectionObserver' in window)) return;

  const revealItems = section.querySelectorAll('[data-coverage-reveal]');
  if (!revealItems.length) return;

  section.classList.add('coverage-reveal-ready');

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('is-revealed');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  revealItems.forEach(item => observer.observe(item));
});