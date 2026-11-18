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
    linkedinUrl: "https://linkedin.com/company/drfc-ingeniería",
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
  const redesSociales = [
    ...CONFIG.redes,
    ...(CONFIG.linkedinUrl ? [{ texto: "LinkedIn", url: CONFIG.linkedinUrl }] : [])
  ];

  /* ---------- 3. Estilos ---------- */
  const css = `
  .site-footer{--footer-icon:var(--drfc-icon-size,clamp(2rem,3vw,3rem));--footer-gutter:var(--page-content-gutter,clamp(1.25rem,5vw,6rem));width:100%;padding-top:clamp(1rem,2vw,1.75rem);background:#273847;color:#fff;font-family:Arial,Helvetica,sans-serif}
  .site-footer *,.site-footer *::before,.site-footer *::after{box-sizing:border-box;margin:0}
  .site-footer a{color:inherit;text-decoration:none}
  .site-footer .footer{display:flex;flex-direction:column;justify-content:space-between;width:100%;max-width:1400px;margin:0 auto;padding:clamp(1rem,2vw,1.5rem) clamp(1.5rem,4.5vw,4rem);border-radius:0;background:#273847}
  .site-footer .footer-top{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr) minmax(0,.7fr) minmax(0,1.15fr) minmax(0,1.1fr);align-items:start;gap:clamp(1rem,2vw,1.75rem)}
  .site-footer .footer-brand-icon{display:block;width:var(--footer-icon);height:var(--footer-icon);margin-bottom:12px;object-fit:contain}
  .site-footer .footer-logo{font-size:clamp(1.25rem,2vw,1.5625rem);font-weight:500;letter-spacing:-1.8px;line-height:1}
  .site-footer .footer-tagline{margin-top:7px;color:#b8b8b8;font-size:.75rem;line-height:1.5}
  .site-footer .footer-links{display:flex;flex-direction:column;gap:13px;font-size:.8125rem}
  .site-footer .footer-links a,.site-footer .legal-links a{transition:color .25s ease}
  .site-footer .footer-links a:hover,.site-footer .legal-links a:hover{color:#c2d5e2}
  .site-footer .footer-section-heading{color:#fff;font-size:.8125rem;font-weight:700}
  .site-footer .legal-links{display:flex;flex-direction:column;gap:12px;color:#c2cbd2;font-size:.75rem;line-height:1.5}
  .site-footer .privacy-preferences-open{width:fit-content;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;font:inherit;text-align:left;text-decoration:underline;text-underline-offset:3px}
  .site-footer .privacy-preferences-open:hover{color:#fff}
  .site-footer .privacy-preferences-open:focus-visible,.site-footer .privacy-preferences-dialog button:focus-visible,.site-footer .privacy-preferences-dialog input:focus-visible{outline:2px solid #55b5d5;outline-offset:3px}
  .site-footer .privacy-preferences-dialog{width:min(92vw,540px);max-width:540px;max-height:min(85vh,720px);padding:clamp(1.25rem,4vw,2rem);border:1px solid #dbe5eb;border-radius:16px;background:#fff;color:#183448;box-shadow:0 24px 70px rgba(0,30,45,.28);font-family:Arial,Helvetica,sans-serif}
  .site-footer .privacy-preferences-dialog::backdrop{background:rgba(11,31,43,.56)}
  .site-footer .privacy-preferences-dialog h2{margin:0;color:#183448;font-size:1.35rem;line-height:1.3}
  .site-footer .privacy-preferences-dialog p{margin:.75rem 0;color:#637582;font-size:.875rem;line-height:1.65}
  .site-footer .privacy-preference-row{display:flex;align-items:flex-start;gap:.75rem;padding:1rem 0;border-top:1px solid #e7edef}
  .site-footer .privacy-preference-row input{width:1rem;height:1rem;flex:0 0 1rem;margin:.2rem 0 0;accent-color:#0d425c}
  .site-footer .privacy-preference-row label{color:#324b5a;font-size:.875rem;font-weight:600;line-height:1.5}
  .site-footer .privacy-preference-row label span{display:block;margin-top:.25rem;color:#71818a;font-size:.75rem;font-weight:400}
  .site-footer .privacy-preferences-actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.6rem;margin-top:1rem}
  .site-footer .privacy-preferences-actions button{min-height:40px;padding:.65rem .9rem;border:1px solid #cbd9df;border-radius:6px;background:#fff;color:#0d425c;cursor:pointer;font:inherit;font-size:.78rem;font-weight:700}
  .site-footer .privacy-preferences-actions .privacy-preferences-save{border-color:#0d425c;background:#0d425c;color:#fff}
  .site-footer .privacy-preferences-status{min-height:1.4em;margin:.75rem 0 0!important;font-size:.75rem!important}
  .site-footer .copyright a{text-decoration:none}
  .site-footer .copyright .privacy-preferences-open{font-size:inherit;text-decoration:none}
  .site-footer .copyright a:hover,.site-footer .copyright .privacy-preferences-open:hover{color:#227a9c}
  .site-footer .corporate-info p{overflow-wrap:anywhere}
  .site-footer .footer-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:2rem;margin-top:clamp(1rem,2vw,1.5rem)}
  .site-footer .back-top{display:inline-flex;align-items:center;justify-content:space-between;gap:8px;width:fit-content;padding:4px 0;border:0;background:transparent;color:#b8c5ce;cursor:pointer;font-size:.75rem;font-family:inherit;transition:color .2s ease}
  .site-footer .back-top:hover{color:#fff}
  .site-footer .back-top:focus-visible{outline:2px solid #55b5d5;outline-offset:4px}
  .site-footer .back-top .arrow{display:flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:#324454;color:#c2d5e2;font-size:.875rem}
  .site-footer .newsletter{display:flex;width:100%;flex-direction:column;align-items:flex-start}
  .site-footer .newsletter-link{display:inline-flex;max-width:100%;align-items:center;justify-content:center;min-height:38px;padding:0 .9rem;border-radius:30px;background:#fff;color:#003e58;font-size:.8125rem;font-weight:600;text-align:center;transition:background-color .2s ease}
  .site-footer .newsletter-link:hover{background:#e8f1f5}
  .site-footer .copyright{width:100%;padding:.65rem var(--footer-gutter);background:#fff;color:#003e58;font-size:.75rem;line-height:1.5}
  .site-footer .copyright-inner{display:flex;width:min(100%,1400px);flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.75rem 2rem;margin:0 auto}
  .site-footer .copyright-brand,.site-footer .copyright-links{display:flex;flex-wrap:wrap;align-items:center;gap:.35rem 1.25rem}
  .site-footer .copyright-links{justify-content:flex-end}
  @media (max-width:900px){
    .site-footer .footer-top{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem 2rem}
    .site-footer .footer-brand{grid-column:1/-1}
    .site-footer .corporate-info{grid-column:1}
    .site-footer .newsletter{grid-column:2}
  }
  @media (max-width:520px){
    .site-footer .footer{gap:1.5rem;padding:20px 22px}
    .site-footer .footer-top{gap:1.5rem 15px}
    .site-footer .footer-bottom{flex-direction:column;align-items:stretch;gap:1.5rem;margin-top:0}
    .site-footer .newsletter-link{width:100%}
    .site-footer .copyright{padding-inline:1rem;text-align:center}
    .site-footer .copyright-inner,.site-footer .copyright-brand,.site-footer .copyright-links{justify-content:center}
    .site-footer .copyright-inner{flex-direction:column;gap:.5rem}
  }
  @media (prefers-reduced-motion:reduce){.site-footer .footer-links a,.site-footer .legal-links a{transition:none}}`;

  /* ---------- 4. HTML ---------- */
  const enlaces = CONFIG.enlaces.map((e) => `<a href="${ruta(e.url)}">${e.texto}</a>`).join("");
  const redes = redesSociales.map((r) => `<a href="${r.url}" target="_blank" rel="noopener noreferrer">${r.texto}</a>`).join("");
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
        <nav class="footer-links" aria-label="Navegación">
          <strong class="footer-section-heading">Navegación</strong>
          ${enlaces}
        </nav>
        <nav class="footer-links" aria-label="Redes sociales">
          <strong class="footer-section-heading">Redes Sociales</strong>
          ${redes}
        </nav>
        <div class="legal-links corporate-info">
          <strong class="footer-section-heading" id="contacto">Corporativo</strong>
          <p>${CONFIG.direccion}</p>
          <a href="mailto:${CONFIG.correo}">${CONFIG.correo}</a>
          <a href="tel:${CONFIG.telefonoLink}">${CONFIG.telefono}</a>
        </div>
        <div class="newsletter">
          <a class="newsletter-link" href="${ruta("paginas/contacto.html")}">Cuéntanos sobre tu proyecto</a>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="back-top-container">
          <button type="button" class="back-top">
            <span>Volver al inicio</span>
            <span class="arrow" aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
    <dialog class="privacy-preferences-dialog" aria-labelledby="privacy-preferences-title" aria-describedby="privacy-preferences-description">
      <h2 id="privacy-preferences-title">Preferencias de cookies</h2>
      <p id="privacy-preferences-description">Las cookies necesarias permiten el funcionamiento y la seguridad del sitio. Las tecnologías opcionales de analítica permanecerán desactivadas salvo que usted las habilite. Puede cambiar su elección en cualquier momento.</p>
      <div class="privacy-preference-row">
        <input id="privacy-cookie-necessary" type="checkbox" checked disabled>
        <label for="privacy-cookie-necessary">Necesarias <span>Siempre activas; requeridas para el funcionamiento y la seguridad del sitio.</span></label>
      </div>
      <div class="privacy-preference-row">
        <input id="privacy-cookie-analytics" type="checkbox">
        <label for="privacy-cookie-analytics">Analítica (opcional) <span>Permiten medir visitas e interacciones para mejorar el sitio.</span></label>
      </div>
      <p class="privacy-preferences-status" role="status" aria-live="polite"></p>
      <div class="privacy-preferences-actions">
        <button class="privacy-preferences-reject" type="button">Rechazar opcionales</button>
        <button class="privacy-preferences-accept" type="button">Aceptar todas</button>
        <button class="privacy-preferences-save" type="button">Guardar selección</button>
      </div>
    </dialog>
    <div class="copyright" aria-label="Derechos reservados">
      <div class="copyright-inner">
        <div class="copyright-brand">
          <span>${CONFIG.empresa}</span>
          <span>${anio} © Todos los derechos reservados.</span>
        </div>
        <nav class="copyright-links" aria-label="Privacidad y cookies">
          <a href="${ruta("paginas/aviso_privacidad.html")}">Aviso de Privacidad</a>
          <button class="privacy-preferences-open" type="button">Preferencias de cookies</button>
        </nav>
      </div>
    </div>
  </section>`;

  script.insertAdjacentHTML("beforebegin", html);

  /* ---------- 5. Comportamiento ---------- */
  const footer = script.previousElementSibling; // la <section class="site-footer">
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const preferenciasDialog = footer.querySelector(".privacy-preferences-dialog");
  const preferenciasAnalitica = footer.querySelector("#privacy-cookie-analytics");
  const preferenciasStatus = footer.querySelector(".privacy-preferences-status");
  const clavePreferencias = "drfcCookiePreferences";

  const leerPreferencias = () => {
    const guardadas = window.localStorage.getItem(clavePreferencias);
    if (!guardadas) return null;

    try {
      const preferencias = JSON.parse(guardadas);
      return preferencias && typeof preferencias === "object" && typeof preferencias.analytics === "boolean" ? preferencias : null;
    } catch (error) {
      preferenciasStatus.textContent = "No se pudieron leer las preferencias guardadas. Seleccione una opción para continuar.";
      return null;
    }
  };

  const abrirPreferencias = () => {
    preferenciasStatus.textContent = "";
    try {
      const guardadas = leerPreferencias();
      preferenciasAnalitica.checked = Boolean(guardadas && guardadas.analytics);
    } catch (error) {
      preferenciasAnalitica.checked = false;
      preferenciasStatus.textContent = "No se pudo acceder al almacenamiento de preferencias. Puede seleccionar una opción e intentar guardarla.";
    }
    preferenciasDialog.showModal();
  };

  const guardarPreferencias = (analitica) => {
    const valor = { necessary: true, analytics: analitica, updatedAt: new Date().toISOString() };
    try {
      window.localStorage.setItem(clavePreferencias, JSON.stringify(valor));
    } catch (error) {
      preferenciasStatus.textContent = "No fue posible guardar su elección en este navegador. Revise la configuración de almacenamiento e inténtelo de nuevo.";
      return;
    }

    window.dispatchEvent(new CustomEvent("drfc:cookie-preferences-changed", { detail: valor }));
    preferenciasStatus.textContent = "Sus preferencias se guardaron.";
    preferenciasDialog.close();
  };

  footer.querySelectorAll(".privacy-preferences-open").forEach((boton) => {
    boton.addEventListener("click", abrirPreferencias);
  });
  document.querySelectorAll(".privacy-inline-preferences").forEach((boton) => {
    boton.addEventListener("click", abrirPreferencias);
  });
  footer.querySelector(".privacy-preferences-save").addEventListener("click", () => {
    guardarPreferencias(preferenciasAnalitica.checked);
  });
  footer.querySelector(".privacy-preferences-reject").addEventListener("click", () => {
    preferenciasAnalitica.checked = false;
    guardarPreferencias(false);
  });
  footer.querySelector(".privacy-preferences-accept").addEventListener("click", () => {
    preferenciasAnalitica.checked = true;
    guardarPreferencias(true);
  });

  footer.querySelector(".back-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducir ? "auto" : "smooth" });
  });

})();
