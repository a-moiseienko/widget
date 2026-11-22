# 0002. No framework, one script file

Status: Accepted (2026-11-22)

## Context

The widget loads on customer pages. Every extra kilobyte slows those pages, and a bundled framework can clash with the host page's own copy.

## Decision

Write the widget in plain TypeScript with DOM calls. Build it with Vite in library mode as a single IIFE file, `chat-widget.js`. Use no runtime dependencies. Keep Vite, TypeScript, and ESLint as dev dependencies only.

## Consequences

- The unminified bundle is about 11 KB.
- The UI code builds elements by hand. A bigger UI would make this tedious, and we would revisit the decision then (for example with Preact).
- The IIFE exposes a global `ChatWidget` object with `init`.
- Styles ship as a string inside the script, so the widget needs no separate CSS request.
