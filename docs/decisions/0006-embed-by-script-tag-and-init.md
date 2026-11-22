# 0006. Embed with a script tag, configure with data attributes or `init`

Status: Accepted (2026-11-22)

## Context

Site owners should add the widget with one line and no build step. Developers sometimes need to start it from their own code.

## Decision

Support two entry points that share one code path:

- A script tag with `data-api-url` and an optional `data-title` starts the widget when the script runs. The widget reads `document.currentScript` for this.
- `ChatWidget.init({ apiUrl, title })` starts it on demand.

`init` waits for `DOMContentLoaded` when the page is still loading.

## Consequences

- The tag form must load as a classic script. A `type="module"` script leaves `document.currentScript` empty, so the data attributes are ignored.
- Two widgets can mount if a page calls `init` twice. We do not guard against it yet.
- The local demo page imports `init` directly because Vite serves modules, where `currentScript` is empty.
