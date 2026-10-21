document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  const speed = 200; // Velocidad de la animación (menor es más rápido)

  const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const useFormat = counter.getAttribute('data-format') === 'comma';

    const updateCount = () => {
      const count = +counter.innerText.replace(/,/g, '');
      const inc = target / speed;

      if (count < target) {
        const nextCount = Math.ceil(count + inc);
        const valueToDisplay = nextCount > target ? target : nextCount;

        counter.innerText = useFormat 
          ? valueToDisplay.toLocaleString('en-US') 
          : valueToDisplay;

        setTimeout(updateCount, 15);
      } else {
        counter.innerText = useFormat 
          ? target.toLocaleString('en-US') 
          : target;
      }
    };

    updateCount();
  };

  // Animación activa al hacer scroll hacia la sección (IntersectionObserver)
  const observerOptions = {
    threshold: 0.4
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentCounters = entry.target.querySelectorAll('.counter');
        currentCounters.forEach(counter => startCounting(counter));
        observer.unobserve(entry.target); // Solo ejecuta una vez
      }
    });
  }, observerOptions);

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
