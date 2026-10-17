(function () {
  const script = document.currentScript;

  if (!script) {
    throw new Error("No se pudo inicializar el componente de llamado a la acción.");
  }

  const logo = new URL("../../img/marca/Ícono DRFC.png", script.src).href;
  const html = `
    <section class="fiber-cta" aria-label="Construye tu red con nosotros">
      <div class="fiber-cta-card">
        <p class="fiber-cta-eyebrow">
          <img src="${logo}" alt="" class="fiber-cta-logo">
          Te ayudamos a expandir tu red
        </p>
        <h2 class="fiber-cta-title">Construye tu red con nosotros</h2>
        <div class="fiber-cta-connection" role="img" aria-label="Señal de fibra óptica conectando dos terminales">
          <span class="fiber-cta-connector"></span>
          <span class="fiber-cta-cable"></span>
          <span class="fiber-cta-connector"></span>
        </div>
        <p class="fiber-cta-description">En DRFC estamos comprometidos con entregar calidad en cada uno de nuestros trabajos</p>
        <a class="fiber-cta-contact" href="mailto:contacto@drfc.com.mx">
          Contacto
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </section>`;

  script.insertAdjacentHTML("beforebegin", html);

  if (script.dataset.title) {
    const cta = script.previousElementSibling;
    const heading = cta?.querySelector(".fiber-cta-title");
    if (!cta || !heading) {
      throw new Error("No se pudo actualizar el título del llamado a la acción.");
    }

    heading.textContent = script.dataset.title;
    cta.setAttribute("aria-label", script.dataset.title);
  }

  const cta = script.previousElementSibling;
  const button = cta?.querySelector(".fiber-cta-contact");
  if (!cta || !button) {
    throw new Error("No se pudo inicializar el botón del llamado a la acción.");
  }

  if (script.dataset.buttonText) {
    button.firstChild.textContent = `\n          ${script.dataset.buttonText}\n          `;
  }

  if (script.dataset.buttonHref) {
    button.href = script.dataset.buttonHref;
  }
})();
