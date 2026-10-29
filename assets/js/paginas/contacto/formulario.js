const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const value = (name) => String(formData.get(name) || 'No especificado');
    const subject = `Solicitud de contacto - ${value('Servicio de interés')}`;
    const body = [
      'Nueva solicitud de contacto desde drfc.com.mx',
      '',
      `Nombre: ${value('Nombre')} ${value('Apellido')}`,
      `Empresa u organización: ${value('Empresa')}`,
      `Cargo: ${value('Cargo')}`,
      `Correo electrónico: ${value('Correo electrónico')}`,
      `Teléfono: ${value('Teléfono')}`,
      '',
      `Servicio de interés: ${value('Servicio de interés')}`,
      `Plazo estimado: ${value('Plazo estimado')}`,
      `Ubicación del proyecto: ${value('Ubicación del proyecto')}`,
      '',
      'Descripción del proyecto:',
      value('Descripción del proyecto')
    ].join('\r\n');

    const status = document.getElementById('form-status');
    if (status) {
      status.textContent = 'Abriendo tu aplicación de correo. Revisa la solicitud y confirma el envío desde allí.';
    }

    window.location.href = `mailto:contacto@drfc.com.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
