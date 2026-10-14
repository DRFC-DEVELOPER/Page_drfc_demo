/* ==========================================================
   MENÚ COMPARTIDO - DRFC Ingeniería
   Uso: en cualquier página, donde quieras que aparezca el menú:
     <script src="RUTA/componentes/menu.js"></script>
   ========================================================== */
(function () {
  /* ---------- 1. CONFIGURACIÓN (edita solo esto) ----------
     Todas las rutas son relativas a la CARPETA RAÍZ del proyecto
     (la carpeta que contiene a /componentes y /src).            */
  const CONFIG = {
    logo: "src/Logo_Menu.png",
    inicio: "Inicio.html",
    contacto: "paginas/Contacto.html",
    enlaces: [
      { texto: "Inicio", url: "Inicio.html" },
      { texto: "Proyectos", url: "#" },
      {
        texto: "Servicios",
        submenu: [
          { texto: "Construcción de Red", url: "paginas/Construcción_de_Red.html" }
          // { texto: "Otro servicio", url: "paginas/Otro.html" },
        ]
      },
      { texto: "Acerca de Nosotros", url: "#" },
      { texto: "Bolsa de Trabajo", url: "#" }
    ]
  };

  /* ---------- 2. Calcular la raíz del proyecto ----------
     Se toma de la ubicación de este mismo archivo, así el menú
     funciona igual desde cualquier carpeta o subcarpeta.        */
  const script = document.currentScript;
  const raiz = new URL("../", script.src);
  const ruta = (u) => (!u || u.startsWith("#") || /^[a-z]+:/i.test(u)) ? (u || "#") : new URL(u, raiz).href;
  const actual = location.href.split("#")[0];
  const esActual = (u) => ruta(u).split("#")[0] === actual;

  /* ---------- 3. Estilos del menú ---------- */
  const css = `
  .drfc-header{position:sticky;top:0;z-index:200;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:24px;width:100%;min-height:clamp(100px,8vw,180px);padding:15px clamp(1.5rem,5vw,7.5rem);background:#fff;box-shadow:0 2px 4px rgba(0,0,0,.05);font-family:'Inter',-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box}
  .drfc-header *{box-sizing:border-box;margin:0}
  .drfc-header a{text-decoration:none}
  .drfc-header-logo a{display:flex;align-items:center}
  .drfc-header-logo img{display:block;width:auto;height:clamp(70px,7vw,130px);max-width:220px;object-fit:contain}
  .drfc-header nav{justify-self:center}
  .drfc-header-links{display:flex;align-items:center;justify-content:center;gap:clamp(12px,1.5vw,36px);list-style:none;padding:0}
  .drfc-header-links li{position:relative}
  .drfc-header-links a,.drfc-services-trigger{display:flex;align-items:center;gap:4px;padding:0;border:0;background:transparent;color:#333;font-weight:500;font-size:clamp(1rem,1vw,1.375rem);font-family:inherit;white-space:nowrap;cursor:pointer}
  .drfc-header-links a:hover,.drfc-services-trigger:hover,.drfc-services-trigger:focus-visible{color:#003e58}
  .drfc-header-links a.is-active{text-decoration:underline;text-underline-offset:4px}
  .drfc-services-trigger:focus-visible,.drfc-contact:focus-visible{outline:2px solid #318bb1;outline-offset:4px}
  .drfc-dropdown-arrow{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:2;transition:transform 160ms ease}
  .drfc-services-menu.is-open .drfc-dropdown-arrow{transform:rotate(180deg)}
  .drfc-services-submenu{position:absolute;top:calc(100% + 16px);left:50%;z-index:20;display:none;width:max-content;min-width:18rem;max-width:min(24rem,calc(100vw - 2rem));padding:.5rem;border:1px solid #dbe5eb;border-radius:12px;background:rgba(255,255,255,.98);box-shadow:0 16px 36px rgba(0,45,67,.16);list-style:none;transform:translateX(-50%)}
  .drfc-services-menu.is-open .drfc-services-submenu{display:block}
  .drfc-services-submenu a{display:block;padding:.75rem .875rem;border-radius:7px;color:#31495a;font-size:.9375rem;line-height:1.35;white-space:normal}
  .drfc-services-submenu a:hover{background:#eef5f8}
  .drfc-header-action{justify-self:end}
  .drfc-contact{display:inline-flex;align-items:center;justify-content:center;padding:clamp(.6rem,.8vw,.9rem) clamp(1.3rem,2vw,2.3rem);background:#0d425c;color:#fff!important;font-size:clamp(.8rem,.85vw,1.1rem);font-weight:600;letter-spacing:1px;text-transform:uppercase;white-space:nowrap;transition:background-color .2s ease}
  .drfc-contact:hover{background:#082d40}
  @media (max-width:992px){.drfc-header{display:flex;flex-direction:column;gap:15px;padding:20px}.drfc-header-links{flex-wrap:wrap;gap:15px}}
  @media (max-width:576px){.drfc-header-links{gap:12px}.drfc-header-links a,.drfc-services-trigger{font-size:.9rem}.drfc-services-menu{display:flex;flex-basis:100%;flex-direction:column;align-items:center}.drfc-services-submenu{position:static;width:min(100%,24rem);min-width:0;max-width:none;margin:.5rem auto 0;transform:none}}
  @media (prefers-reduced-motion:reduce){.drfc-dropdown-arrow,.drfc-contact{transition:none}}`;

  /* ---------- 4. HTML del menú ---------- */
  const flecha = '<svg class="drfc-dropdown-arrow" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>';

  const items = CONFIG.enlaces.map((e) => {
    if (e.submenu) {
      const sub = e.submenu.map((s) =>
        `<li><a href="${ruta(s.url)}"${esActual(s.url) ? ' class="is-active"' : ""}>${s.texto}</a></li>`).join("");
      return `<li class="drfc-services-menu">
        <button class="drfc-services-trigger" type="button" aria-expanded="false" aria-controls="drfc-services-submenu">${e.texto} ${flecha}</button>
        <ul class="drfc-services-submenu" id="drfc-services-submenu" aria-label="${e.texto}">${sub}</ul>
      </li>`;
    }
    return `<li><a href="${ruta(e.url)}"${esActual(e.url) ? ' class="is-active"' : ""}>${e.texto}</a></li>`;
  }).join("");

  const html = `
  <style>${css}</style>
  <header class="drfc-header">
    <div class="drfc-header-logo">
      <a href="${ruta(CONFIG.inicio)}" aria-label="DRFC Ingeniería, inicio">
        <img src="${ruta(CONFIG.logo)}" alt="DRFC Ingeniería S.A. de C.V.">
      </a>
    </div>
    <nav aria-label="Navegación principal"><ul class="drfc-header-links">${items}</ul></nav>
    <div class="drfc-header-action">
      <a href="${ruta(CONFIG.contacto)}" class="drfc-contact">Contacto</a>
    </div>
  </header>`;

  // Se inserta justo donde está la etiqueta <script> (sin parpadeo).
  script.insertAdjacentHTML("beforebegin", html);

  /* ---------- 5. Comportamiento ---------- */
  const menu = document.querySelector(".drfc-services-menu");
  if (menu) {
    const boton = menu.querySelector(".drfc-services-trigger");
    const abrir = (si) => { menu.classList.toggle("is-open", si); boton.setAttribute("aria-expanded", si); };
    boton.addEventListener("click", (ev) => { ev.stopPropagation(); abrir(!menu.classList.contains("is-open")); });
    document.addEventListener("click", (ev) => { if (!menu.contains(ev.target)) abrir(false); });
    document.addEventListener("keydown", (ev) => { if (ev.key === "Escape") { abrir(false); boton.focus(); } });
  }

  // Si la página tiene su propio modal de contacto (openModal), el botón lo usa;
  // si no, lleva a la página de contacto.
  document.querySelector(".drfc-contact").addEventListener("click", (ev) => {
    if (typeof window.openModal === "function") { ev.preventDefault(); window.openModal(); }
  });
})();
