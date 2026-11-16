# Kakapos Shop – Frontend

Parte visual de la tienda online de merchandising **Kakapos**, hecha con React. Forma parte de la práctica de e-commerce del módulo *Desarrollo Web Full Stack (React, Node, Mongo)*.

El backend (API REST con Node, Express y MongoDB) está en otro repositorio: `backend`.

## Tecnologías

- React 19
- Vite
- React Router (`react-router-dom`)
- Tailwind CSS
- ESLint

## Requisitos

- Node.js 22 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

La aplicación se abre en `http://localhost:5173/`.

Otros comandos útiles:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run lint` | Revisa el código con ESLint |

## Rutas

| Ruta | Página |
|---|---|
| `/` | Home: productos principales de la tienda |
| `/login` | Formulario de inicio de sesión |
| `/register` | Formulario de registro |
| `*` | Página «no encontrada» |

## Estructura

```
src/
├── main.jsx        # Punto de entrada y configuración de las rutas
├── App.jsx         # Estructura común: menú de navegación y <Outlet />
├── index.css       # Importa Tailwind
└── pages/
    ├── Home.jsx
    ├── Login.jsx
    └── Register.jsx
```

## Estado actual

- Navegación entre páginas con React Router (menú con enlace activo resaltado).
- Home con una lista de productos de ejemplo escrita a mano.
- Formularios de login y registro todavía sin lógica: aún no están conectados con la API.

## Autor

Victor Reig Herrera – [crryzz9](https://github.com/crryzz9)