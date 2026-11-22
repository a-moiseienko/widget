# 0001. Strict TypeScript and type-aware ESLint

Status: Accepted (2026-11-22)

## Context

The team wants the compiler and linter to find defects before runtime. The widget runs on pages we do not control, so a runtime error is hard to see and fix.

## Decision

- `tsconfig.json` sets `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`, `noUnusedLocals`, and `noUnusedParameters`.
- ESLint uses `typescript-eslint` `strictTypeChecked`. Plain `.js` config files get `disableTypeChecked`.
- `npm run check` runs `tsc --noEmit` and then ESLint. CI runs both and fails the build on any error.

## Consequences

- Unsafe `any`, unhandled promises, and unchecked optional values fail the build.
- Code that reads JSON must narrow `unknown` with a type guard.
- With `exactOptionalPropertyTypes`, code cannot pass `undefined` for an optional property. `src/index.ts` builds the options object in two shapes for this reason.
- New contributors need a short time to learn the strict rules.
