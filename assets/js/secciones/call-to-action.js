// Demostración del formulario.
// Para suscripciones reales, conecta un servicio o backend.
document
  .getElementById("newsletter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("newsletter-message").textContent =
      "Gracias. Para completar la suscripción, conecta un servicio de correo.";

    this.reset();
  });
