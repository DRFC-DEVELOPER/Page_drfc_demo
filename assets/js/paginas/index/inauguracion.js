/*
 * Pantalla de inauguración del sitio.
 * Cuenta regresiva de 1:00 a 0:00 con segundero; al llegar a cero se desvanece y deja ver el sitio.
 * Para desactivarla después del lanzamiento, cambia INAUGURACION_ACTIVA a false
 * (o quita este script y su hoja de estilos de index.html).
 * Tecla Esc: la salta (útil en ensayos).
 */
(() => {
  const INAUGURACION_ACTIVA = true;
  const DURACION_MS = 60 * 1000;
  if (!INAUGURACION_ACTIVA) return;

  const SVG = "http://www.w3.org/2000/svg";
  const raiz = document.documentElement;
  raiz.classList.add("inauguracion-activa");

  const capa = document.createElement("div");
  capa.className = "inauguracion";
  capa.setAttribute("role", "dialog");
  capa.setAttribute("aria-modal", "true");
  capa.setAttribute("aria-label", "Cuenta regresiva para la inauguración del sitio");
  capa.innerHTML = `
    <p class="inauguracion-marca"><img src="assets/img/marca/Ícono DRFC.png" alt="">DRFC Ingeniería</p>
    <h1 class="inauguracion-titulo">Inauguración de nuestro nuevo sitio</h1>
    <div class="inauguracion-reloj">
      <svg viewBox="-110 -110 220 220" aria-hidden="true">
        <g class="inauguracion-marcas"></g>
        <circle class="inauguracion-pista" r="84"></circle>
        <circle class="inauguracion-progreso" r="84" transform="rotate(-90)"></circle>
        <g class="inauguracion-aguja">
          <line class="inauguracion-segundero" x1="0" y1="-58" x2="0" y2="-80"></line>
          <circle class="inauguracion-eje" cy="-84" r="5"></circle>
        </g>
      </svg>
      <div class="inauguracion-tiempo" aria-live="off">1:00</div>
    </div>
    <p class="inauguracion-leyenda">Soluciones integrales en telecomunicaciones</p>`;

  // 60 marcas, una por segundo; cada 5 s una más larga
  const marcas = capa.querySelector(".inauguracion-marcas");
  for (let i = 0; i < 60; i++) {
    const l = document.createElementNS(SVG, "line");
    const mayor = i % 5 === 0;
    l.setAttribute("x1", "0");
    l.setAttribute("y1", mayor ? "-108" : "-104");
    l.setAttribute("x2", "0");
    l.setAttribute("y2", "-96");
    l.setAttribute("transform", `rotate(${i * 6})`);
    if (mayor) l.classList.add("is-mayor");
    marcas.appendChild(l);
  }

  const progreso = capa.querySelector(".inauguracion-progreso");
  const segundero = capa.querySelector(".inauguracion-aguja");
  const tiempo = capa.querySelector(".inauguracion-tiempo");
  const circunferencia = 2 * Math.PI * 84;
  progreso.style.strokeDasharray = `${circunferencia}`;

  const insertar = () => document.body.prepend(capa);
  if (document.body) insertar();
  else document.addEventListener("DOMContentLoaded", insertar, { once: true });

  let inicio = null;
  let terminado = false;
  let ultimoTexto = "";

  const terminar = () => {
    if (terminado) return;
    terminado = true;
    capa.classList.add("is-terminada");
    raiz.classList.remove("inauguracion-activa");
    document.removeEventListener("keydown", alPresionar);
    // El carrusel del hero siguió avanzando detrás; se regresa a la primera diapositiva
    document.querySelector('.drfc-hero [data-slide-to="0"]')?.click();
    setTimeout(() => capa.remove(), 1000);
  };

  const alPresionar = (e) => { if (e.key === "Escape") terminar(); };
  document.addEventListener("keydown", alPresionar);

  const cuadro = (ahora) => {
    if (terminado) return;
    if (inicio === null) inicio = ahora;
    const transcurrido = Math.min(ahora - inicio, DURACION_MS);
    const restante = DURACION_MS - transcurrido;

    // Texto m:ss; se redondea hacia arriba para que muestre 1:00 al inicio y 0:00 solo al final
    const seg = Math.ceil(restante / 1000);
    const texto = `${Math.floor(seg / 60)}:${String(seg % 60).padStart(2, "0")}`;
    if (texto !== ultimoTexto) { tiempo.textContent = texto; ultimoTexto = texto; }

    // El segundero da una vuelta completa en 60 s; el anillo se vacía al mismo ritmo
    const fraccion = transcurrido / DURACION_MS;
    segundero.setAttribute("transform", `rotate(${fraccion * 360})`);
    progreso.style.strokeDashoffset = `${-circunferencia * fraccion}`;

    if (restante <= 0) {
      capa.classList.add("is-cero");
      setTimeout(terminar, 1200);
      return;
    }
    requestAnimationFrame(cuadro);
  };
  requestAnimationFrame(cuadro);
})();
