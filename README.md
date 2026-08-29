# frontend-maxwear

Tienda online **Maxwear** — aplicación web.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- ESLint + Prettier

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # apunta NEXT_PUBLIC_API_URL a la API
npm run dev                  # http://localhost:3000
```

`NEXT_PUBLIC_API_URL` apunta por defecto a `backend-maxwear` desplegado en Render
(`https://backend-maxwear.onrender.com/api/v1`). Para correr contra una instancia
local, sobrescribe esa variable en `.env.local` con `http://localhost:4000/api/v1`.

## Scripts

| Script              | Descripción            |
| ------------------- | ---------------------- |
| `npm run dev`       | Servidor de desarrollo |
| `npm run build`     | Build de producción    |
| `npm start`         | Sirve el build         |
| `npm run lint`      | ESLint                 |
| `npm run typecheck` | Comprobación de tipos  |
| `npm run format`    | Prettier               |

## Estructura

```
src/
├── app/          # rutas del App Router
├── components/
│   ├── layout/   # header, footer, navegación
│   └── ui/       # componentes reutilizables
├── hooks/
├── lib/          # api client, env, utilidades
├── styles/
└── types/
```

## Ramas

- `main` — producción
- `staging` — preproducción / QA
- `develop` — integración de features

Flujo: `feature/*` → `develop` → `staging` → `main`.
