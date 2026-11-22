# 0007. Check backend responses at runtime

Status: Accepted (2026-11-22)

## Context

The widget calls a backend that changes on its own schedule. TypeScript types disappear at runtime, so a changed response shape would produce `undefined` in the message list.

## Decision

Read the response body as `unknown` and narrow it with a type guard (`isChatResponse`) before use. Treat an unexpected shape the same as a failed request and show the standard error message. Keep the request and response types by hand in `src/api.ts`.

## Consequences

- A contract change shows up as a visible error and not as a blank message.
- The types can drift from the backend between releases. Generating them from the backend's DTOs (or from an OpenAPI file) is a later option.
- The widget adds no schema library.
