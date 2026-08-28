# Guía de contribución

## Flujo de ramas

```
feature/xxx  →  develop  →  staging  →  main
hotfix/xxx   →  main (y back-merge a develop)
```

- `main`: producción y **rama por defecto del repositorio**. Sólo vía PR desde `staging` o `hotfix/*`.
- `staging`: QA / preproducción.
- `develop`: rama de integración de features. Es la base de los PR de `feature/*`.

> `main` es la default en GitHub, así que los PR nuevos se abren contra `main`
> automáticamente. Para una feature hay que **cambiar la base a `develop`** a mano
> (o usar `gh pr create --base develop`).

## Nombres de rama

`feature/<slug>`, `fix/<slug>`, `hotfix/<slug>`, `chore/<slug>`, `docs/<slug>`

## Commits

Conventional Commits:

```
feat(cart): añade contador en el header
fix(product): corrige selector de talla
chore(deps): actualiza next
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`.

## Pull requests

1. Rama desde `develop`.
2. `npm run lint && npm run typecheck && npm run build` en verde.
3. PR hacia `develop` (recuerda cambiar la base, ver arriba) con descripción y capturas si hay cambios de UI.
4. Requiere al menos una revisión.

`main` y `staging` no tienen protección de ramas activada (requiere GitHub Pro o
repositorio público), así que estas reglas son una convención del equipo: no
hagas push directo a `main` ni a `staging`.
