# Escape Libre — Segunda entrega

Aplicación web de una tienda de autopartes desarrollada con React para el segundo parcial de Taller de Desarrollo Web 2026.

## Autores

- Santino Mussetti
- Aghassi Mingorance

## Funcionalidades

- Navegación entre páginas mediante React Router.
- Catálogo obtenido desde una API simulada con JSON Server.
- Búsqueda de productos por nombre, marca o descripción.
- Filtrado de productos por categoría.
- Carrito de compras persistente mediante localStorage.
- Modificación de cantidades con un mínimo de una unidad.
- Eliminación individual y vaciado completo del carrito.
- Cálculo automático del total.
- Formulario de contacto con validación en tiempo real.
- Envío de consultas a la API simulada.
- Diseño adaptable para computadoras y dispositivos móviles.

## Tecnologías utilizadas

- React
- Vite
- React Router DOM
- JavaScript
- Sass
- JSON Server
- localStorage
- Fetch API
- ESLint
- Git y GitHub

## Requisitos previos

Para ejecutar el proyecto es necesario tener instalados:

- Node.js
- npm

## Instalación

Desde la carpeta `segunda-entrega`, instalar las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar simultáneamente la aplicación y la API simulada:

```bash
npm run dev:all
```

La aplicación estará disponible en:

```text
http://localhost:5173/
```

La API simulada estará disponible en:

```text
http://localhost:3001/
```

Endpoint de productos:

```text
http://localhost:3001/productos
```

Endpoint de consultas:

```text
http://localhost:3001/consultas
```

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia solamente la aplicación React |
| `npm run server` | Inicia solamente JSON Server |
| `npm run dev:all` | Inicia la aplicación y la API |
| `npm run lint` | Revisa la calidad del código |
| `npm run build` | Genera la versión de producción |
| `npm run preview` | Previsualiza la versión de producción |

## Estructura principal

- `src/api`: funciones para comunicarse con la API.
- `src/components`: componentes reutilizables.
- `src/context`: estado global del carrito.
- `src/hooks`: hooks personalizados.
- `src/pages`: páginas de la aplicación.
- `src/styles`: estilos Sass.
- `public`: imágenes y archivos públicos.
- `db.json`: datos utilizados por JSON Server.

## Comprobaciones

Antes de entregar el proyecto se recomienda ejecutar:

```bash
npm audit
npm run lint
npm run build
```