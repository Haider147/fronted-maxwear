# CLAUDE.md

Guía para Claude Code al trabajar en este repositorio. Este proyecto es
**independiente**: no comparte código, convenciones ni contexto con otros
proyectos en los que el usuario haya trabajado.

## Regla crítica: nunca tocar el backend

Este repositorio (`frontend-maxwear`) contiene **únicamente el frontend**. El backend vive en un
proyecto/repositorio separado (`backend-maxwear`, `http://localhost:4000`) que **no** forma parte
de este working directory.

- **Nunca**, bajo ninguna circunstancia, edites, ejecutes, instales, configures ni modifiques nada
  perteneciente al backend (código, base de datos, infraestructura, variables de entorno del
  servidor, despliegues, etc.), aunque tengas acceso técnico a hacerlo o el cambio parezca trivial.
- Esto aplica incluso si arreglar el backend parece la solución más rápida o evidente a un problema.
- El frontend solo debe consumir la API a través de `NEXT_PUBLIC_API_URL` (ver `.env.example`),
  nunca modificar cómo esa API está implementada.

### Qué hacer si algo falla y parece un problema de backend

Si durante el desarrollo, testing o debugging se detecta un fallo, bug, comportamiento inesperado
o limitación que parece originarse en el backend (API, base de datos, autenticación del servidor,
endpoints, etc.):

1. **No intentes arreglarlo ni rodearlo modificando el backend.**
2. Diagnostica y documenta el problema desde el lado del frontend (request/response, endpoint
   afectado, payload, status code, pasos para reproducir).
3. **Propón siempre generar un reporte para el equipo de backend** con esa información, en lugar
   de intentar resolverlo directamente.
4. Si es posible, implementa un manejo de error / fallback en el frontend mientras el equipo de
   backend investiga, pero deja claro que es una mitigación temporal, no una corrección del
   problema real.

## Qué es

Frontend de **Maxwear**, tienda online. Consume la API de `backend-maxwear`
(repo aparte, mantenido por otro miembro del equipo). Este repo es
frontend-only: no hay lógica de servidor propia más allá de lo que ofrece
Next.js (rutas, server components, etc.).

## Comandos

```bash
npm install
cp .env.example .env.local   # apunta NEXT_PUBLIC_API_URL a la API
npm run dev                  # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
npm run format
```

Requiere `backend-maxwear` corriendo en `http://localhost:4000` para datos
reales; mientras no esté disponible o el endpoint no exista aún, usar datos
mock tipados con los `types` de `src/types/`.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- ESLint + Prettier (con `prettier-plugin-tailwindcss`, ordena clases automáticamente)

## Estructura

```
src/
├── app/          # rutas del App Router
├── components/
│   ├── layout/   # header, footer, navegación
│   └── ui/       # componentes reutilizables (primitivas de diseño)
├── hooks/
├── lib/          # api client (api.ts), env (env.ts), utilidades (utils.ts)
├── styles/
└── types/        # tipos compartidos (Product, Category, ...)
```

- `lib/env.ts` centraliza el acceso a variables de entorno — no leer
  `process.env` directamente en componentes.
- `lib/api.ts` expone `api<T>(path, init)`, un wrapper de `fetch` tipado que
  lanza `ApiError` en respuestas no-OK. Todas las llamadas a la API deben
  pasar por aquí, no por `fetch` directo.
- `lib/utils.ts` tiene `cn()` para clases condicionales y `formatPrice()`
  para formatear precios (`Intl.NumberFormat`, locale `es-CO` por defecto).

## Ramas y flujo de trabajo

```
feature/xxx  →  develop  →  staging  →  main
hotfix/xxx   →  main (y back-merge a develop)
```

- `main`: producción, rama por defecto en GitHub. Solo vía PR desde `staging`
  o `hotfix/*`.
- `staging`: QA / preproducción.
- `develop`: integración de features. **Base de los PR de `feature/*`.**
- Nombres de rama: `feature/<slug>`, `fix/<slug>`, `hotfix/<slug>`,
  `chore/<slug>`, `docs/<slug>`.
- Como `main` es la rama por defecto, los PR nuevos se abren contra `main`
  automáticamente — hay que cambiar la base a `develop` a mano (o
  `gh pr create --base develop`).
- `main` y `staging` no tienen branch protection activa (requiere plan
  pago/repo público): es convención del equipo no hacer push directo ahí.

### Commits — Conventional Commits

```
feat(cart): añade contador en el header
fix(product): corrige selector de talla
chore(deps): actualiza next
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.

### Pull requests

1. Rama nueva desde `develop`.
2. `npm run lint && npm run typecheck && npm run build` en verde antes de abrir el PR.
3. PR hacia `develop` (cambiar la base manualmente) con descripción y
   capturas si hay cambios visuales.
4. Requiere al menos una revisión antes de mergear.
5. Sigue la plantilla en `.github/pull_request_template.md`.

## Flujo de trabajo con diseños

El usuario (responsable de frontend) entrega diseños/mockups y a partir de
ahí se construyen componentes y páginas. Por cada entrega:

1. Crear rama `feature/<slug>` desde `develop`.
2. Construir el componente/página en `src/components/` o `src/app/`
   siguiendo la estructura y convenciones existentes (usar `cn()`,
   `formatPrice()`, tipos de `src/types/`, wrapper `api()` para llamadas a
   backend — nunca `fetch` directo).
3. Si el diseño requiere datos que la API aún no expone, usar mocks locales
   tipados y dejar un comentario `// TODO(api):` señalando qué endpoint
   falta, para no bloquear el avance del frontend.
4. Verificar `lint`, `typecheck` y `build` antes de dar la tarea por
   terminada.
5. No mergear a `develop`/`staging`/`main` sin aprobación explícita del
   usuario — dejar el PR abierto y avisar.

## Notas

- Sin suite de tests configurada por ahora.
- `formatPrice` usa locale `es-CO` por defecto — confirmar con el usuario si
  Maxwear vende en otra moneda/región antes de cambiarlo.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
