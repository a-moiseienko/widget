# 0010. Generate a welcome page at build time

Status: Accepted (2026-11-23)

## Context

`vite build` runs in `lib` mode (see [0002](0002-vanilla-typescript-single-script.md)) to emit a single embeddable file, `dist/chat-widget.js`. Lib mode ignores `index.html`, so the first deploy to Render served nothing at `/` and returned 404. The demo `index.html` at the repo root also isn't right for production: it loads `src/demo.ts` as a module for local dev, which doesn't exist in the built output.

## Decision

- Add `templates/welcome.html`, a static page that loads the real built `chat-widget.js` as a classic script, the same way an embedding site would.
- Add `scripts/build-page.js`, run after `vite build`, that fills in `__API_URL__` and `__SELF_URL__` placeholders from the `WIDGET_API_URL` / `WIDGET_SELF_URL` environment variables and writes the result to `dist/index.html`.
- Keep the plain-JS script outside type-aware linting (ESLint's `**/*.js` override in `eslint.config.js` already does this) so it doesn't need a `tsconfig` entry.

## Consequences

- Visiting the deployed root URL shows a working page with the widget mounted and the embed snippet filled in, instead of 404.
- The repo's dev-only `index.html` (used by `npm run dev`) and the production `templates/welcome.html` are two separate files. Changes to the widget's demo copy need to be made in both if they should match.
- `WIDGET_API_URL` and `WIDGET_SELF_URL` must be set wherever the build runs (see [0009](0009-host-provider.md)); a missing value falls back to `http://localhost:8080` and an empty self URL.
