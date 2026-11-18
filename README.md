# Page_drfc_demo
Repositorio de la propuesta para la pagina oficial de DRFC

## Estructura del proyecto

```
index.html                  Página principal
paginas/                    Páginas completas del sitio
  contacto.html
  ingenieria-y-diseno.html
  construccion-de-red.html
  infraestructura-y-obra-civil.html
componentes/                Componentes reutilizables (se insertan con <script>)
  menu.js                   Menú superior
  footer.js                 Pie de página
  tarjetas.js               Tarjetas de beneficios / herramientas
secciones/                  Secciones sueltas (prototipos independientes)
assets/
  css/
    paginas/                Estilos de cada página (index/ y contacto/ divididos por sección)
    secciones/              Estilos de cada sección suelta
  js/
    config/                 Configuración de Tailwind
    paginas/                Scripts de cada página
    secciones/              Scripts de las secciones sueltas
  img/
    marca/                  Logos e íconos de DRFC
    certificaciones/        ISO, contratista
    clientes/               Logos de clientes (carrusel)
    encabezados/            Portadas y fondos de los heroes
    servicios/              Fotos de construcción, infraestructura y mantenimiento
    fotos/                  Fotos generales
```

### Rutas en los componentes

`menu.js` y `footer.js` calculan la raíz del proyecto a partir de su propia
ubicación, así que en su `CONFIG` todas las rutas (páginas e imágenes) se
escriben **desde la raíz**, por ejemplo `paginas/contacto.html` o
`assets/img/marca/Logo_Menu.png`.

Para incluirlos en una página:

- Desde `index.html`: `<script src="componentes/menu.js"></script>`
- Desde `paginas/`: `<script src="../componentes/menu.js"></script>`

### CSS de producción

Las páginas de Construcción, Ingeniería e Infraestructura usan Tailwind CSS compilado localmente; el hosting no necesita ejecutar Node.js.

```powershell
npm install
npm run build:css
```

Vuelve a generar `assets/css/tailwind.production.css` cuando cambien las clases Tailwind de esas páginas.

### Contenedor Docker

La imagen compila Tailwind y publica las páginas principales mediante Nginx. Las páginas HTML no se almacenan en caché; CSS, JavaScript e imágenes usan caché de un día.

```powershell
docker build -t drfc-web .
docker run --name drfc-web --restart unless-stopped -p 8080:80 drfc-web
```

En el VPS, dirige el dominio `www.drfc.mx` al puerto publicado y termina HTTPS en el proxy inverso o servicio TLS del servidor. El contenedor atiende HTTP en el puerto 80; no configura DNS ni certificados.
