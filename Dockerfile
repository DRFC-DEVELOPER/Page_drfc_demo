FROM node:22-alpine AS build

WORKDIR /site

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build:css

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /site/index.html /site/robots.txt /site/sitemap.xml /usr/share/nginx/html/
COPY --from=build /site/paginas/ /usr/share/nginx/html/paginas/
COPY --from=build /site/componentes/ /usr/share/nginx/html/componentes/
COPY --from=build /site/secciones/ /usr/share/nginx/html/secciones/
COPY --from=build /site/assets/ /usr/share/nginx/html/assets/

EXPOSE 80
