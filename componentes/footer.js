/* ==========================================================
   PIE DE PÁGINA COMPARTIDO - DRFC Ingeniería
   Uso: en cualquier página, donde quieras que aparezca el footer
   (normalmente justo antes de </body>):
     <script src="RUTA/componentes/footer.js"></script>
     (RUTA = "." desde index.html, ".." desde /paginas)
   ========================================================== */
(function () {
  /* ---------- 1. CONFIGURACIÓN (edita solo esto) ----------
     Todas las rutas (páginas e imágenes) se escriben desde la carpeta
     raíz del proyecto (igual que en menu.js).                      */
  const CONFIG = {
    icono: "assets/img/marca/Ícono DRFC.png",
    titulo: "Contáctanos",
    tituloUrl: "paginas/contacto.html",
    lema: "Soluciones Integrales en Telecomunicaciones.",
    enlaces: [
      { texto: "Inicio", url: "index.html" },
      { texto: "Proyectos", url: "paginas/proyectos.html" },
      { texto: "Servicios", url: "paginas/servicios.html" },
      { texto: "Acerca de nosotros", url: "paginas/acerca_nosotros.html" },
      { texto: "Bolsa de Trabajo", url: "mailto:contacto@drfc.com.mx?subject=Bolsa%20de%20trabajo" },
      { texto: "Contacto", url: "paginas/contacto.html" }
    ],
    redes: [
      { texto: "Facebook", url: "https://facebook.com/DRFCIngenieria/" }
    ],
    direccion: "Camino a Ocotepec, SN Col. Ocotepec 123, Cuernavaca, Morelos, C.P. 62220",
    correo: "contacto@drfc.com.mx",
    telefono: "777 450 2639",
    telefonoLink: "+527774502639",
    empresa: "DRFC Ingeniería S.A. de C.V.",
  };

  /* ---------- 2. Rutas ---------- */
  const script = document.currentScript;
  const raiz = new URL("../", script.src);
  const esExterna = (u) => !u || u.startsWith("#") || /^[a-z]+:/i.test(u);
  const ruta = (u) => esExterna(u) ? (u || "#") : new URL(u, raiz).href;
  const rutaArchivo = ruta;

  /* ---------- 3. Estilos ---------- */
  const css = `
  .site-footer{--footer-icon:var(--drfc-icon-size,clamp(2rem,3vw,3rem));--footer-gutter:var(--page-content-gutter,clamp(1.25rem,5vw,6rem));width:100%;padding-top:clamp(2rem,5vw,4rem);background:#273847;color:#fff;font-family:Arial,Helvetica,sans-serif}
  .site-footer *,.site-footer *::before,.site-footer *::after{box-sizing:border-box;margin:0}
  .site-footer a{color:inherit;text-decoration:none}
  .site-footer .footer{display:flex;flex-direction:column;justify-content:space-between;width:100%;max-width:1400px;min-height:288px;margin:0 auto;padding:clamp(1.75rem,3vw,2.5rem) clamp(1.5rem,4.5vw,4rem);border-radius:0;background:#273847}
  .site-footer .footer-top{display:grid;grid-template-columns:1.35fr .6fr 1fr 1.2fr;gap:clamp(1.25rem,3vw,2.5rem)}
  .site-footer .footer-brand-icon{display:block;width:var(--footer-icon);height:var(--footer-icon);margin-bottom:12px;object-fit:contain}
  .site-footer .footer-logo{font-size:clamp(1.25rem,2vw,1.5625rem);font-weight:500;letter-spacing:-1.8px;line-height:1}
  .site-footer .footer-tagline{margin-top:7px;color:#b8b8b8;font-size:.75rem;line-height:1.5}
  .site-footer .footer-links{display:flex;flex-direction:column;gap:13px;font-size:.8125rem}
  .site-footer .footer-links a,.site-footer .legal-links a{transition:color .25s ease}
  .site-footer .footer-links a:hover,.site-footer .legal-links a:hover{color:#c2d5e2}
  .site-footer .legal-links{display:flex;flex-direction:column;gap:12px;color:#c2cbd2;font-size:.75rem;line-height:1.5}
  .site-footer .corporate-info p{overflow-wrap:anywhere}
  .site-footer .footer-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;margin-top:clamp(2rem,4vw,3rem)}
  .site-footer .back-top{display:inline-flex;align-items:center;justify-content:space-between;gap:15px;width:fit-content;padding:5px 6px 5px 18px;border:none;border-radius:30px;background:#324454;color:#fff;cursor:pointer;font-size:.75rem;font-family:inherit}
  .site-footer .back-top .arrow{display:flex;align-items:center;justify-content:center;width:23px;height:23px;border-radius:50%;background:#1e303e;color:#c2d5e2;font-size:.9375rem}
  .site-footer .newsletter h2{margin-bottom:12px;font-size:1rem;font-weight:400;letter-spacing:-.4px;line-height:1.3;text-align:right}
  .site-footer .newsletter{width:min(100%,340px);margin-left:auto}
  .site-footer .newsletter-link{display:inline-flex;align-items:center;justify-content:center;min-height:38px;padding:0 18px;border-radius:30px;background:#fff;color:#003e58;font-size:.8125rem;font-weight:600;transition:background-color .2s ease}
  .site-footer .newsletter-link:hover{background:#e8f1f5}
  .site-footer .copyright{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.35rem 1.25rem;width:100%;padding:1rem var(--footer-gutter);background:#fff;color:#003e58;font-size:.75rem;line-height:1.5;text-align:center}
  @media (max-width:900px){.site-footer .footer-top{grid-template-columns:repeat(2,minmax(0,1fr))}}
  @media (max-width:520px){
    .site-footer .footer{gap:2rem;padding:28px 22px}
    .site-footer .footer-top{gap:2rem 15px}
    .site-footer .footer-bottom{flex-direction:column;align-items:stretch;gap:30px;margin-top:0}
    .site-footer .newsletter{width:100%}
    .site-footer .copyright{padding-inline:1rem}
  }
  @media (prefers-reduced-motion:reduce){.site-footer .footer-links a,.site-footer .legal-links a{transition:none}}`;

  /* ---------- 4. HTML ---------- */
  const enlaces = CONFIG.enlaces.map((e) => `<a href="${ruta(e.url)}">${e.texto}</a>`).join("");
  const redes = CONFIG.redes.map((r) => `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.texto}</a>`).join("");
  const anio = new Date().getFullYear();

  const html = `
  <style>${css}</style>
  <section class="site-footer" aria-label="Información y contacto">
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <img src="${rutaArchivo(CONFIG.icono)}" alt="Ícono DRFC" class="footer-brand-icon">
          <a href="${ruta(CONFIG.tituloUrl)}" class="footer-logo">${CONFIG.titulo}</a>
          <p class="footer-tagline">${CONFIG.lema}</p>
        </div>
        <nav class="footer-links" aria-label="Navegación">${enlaces}</nav>
        <nav class="footer-links" aria-label="Redes sociales">${redes}</nav>
        <div class="legal-links corporate-info">
          <strong id="contacto">Corporativo</strong>
          <p>${CONFIG.direccion}</p>
          <a href="mailto:${CONFIG.correo}">${CONFIG.correo}</a>
          <a href="tel:${CONFIG.telefonoLink}">${CONFIG.telefono}</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="back-top-container">
          <button type="button" class="back-top">
            <span>Volver al inicio</span>
            <span class="arrow" aria-hidden="true">↑</span>
          </button>
        </div>
        <div class="newsletter">
          <h2>Agendemos una<br>evaluación inicial</h2>
          <a class="newsletter-link" href="${ruta("paginas/contacto.html")}">Cuéntanos sobre tu proyecto</a>
        </div>
      </div>
    </footer>
    <div class="copyright" aria-label="Derechos reservados">
      <span>${CONFIG.empresa}</span>
      <span>${anio} © Todos los derechos reservados.</span>
    </div>
  </section>`;

  script.insertAdjacentHTML("beforebegin", html);

  /* ---------- 5. Comportamiento ---------- */
  const footer = script.previousElementSibling; // la <section class="site-footer">
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  footer.querySelector(".back-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducir ? "auto" : "smooth" });
  });

})();
