const marqueeContainer = document.getElementById('marqueeContainer');
const marqueeTrack = document.getElementById('marqueeTrack');
const marqueeGroup = marqueeTrack && marqueeTrack.querySelector('.marquee-group');

if (marqueeContainer && marqueeTrack && marqueeGroup) {
  const updateMarquee = () => {
    const groupWidth = marqueeGroup.getBoundingClientRect().width;
    if (groupWidth === 0) return;

    marqueeTrack.style.setProperty('--marquee-distance', `-${groupWidth}px`);
    const groupCount = Math.max(2, Math.ceil(marqueeContainer.clientWidth / groupWidth) + 1);

    while (marqueeTrack.children.length < groupCount) {
      const clone = marqueeGroup.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      marqueeTrack.appendChild(clone);
    }

    while (marqueeTrack.children.length > groupCount) {
      marqueeTrack.removeChild(marqueeTrack.lastElementChild);
    }
  };

  updateMarquee();
  if (typeof ResizeObserver === 'function') {
    const marqueeResizeObserver = new ResizeObserver(updateMarquee);
    marqueeResizeObserver.observe(marqueeContainer);
    marqueeResizeObserver.observe(marqueeGroup);
  }
  window.addEventListener('resize', updateMarquee);
} else {
  console.error('No se pudo inicializar el marquee de marcas: falta el contenedor, el track o el grupo de logos.');
}
