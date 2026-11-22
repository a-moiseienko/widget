# 0003. Shadow DOM for style isolation

Status: Accepted (2026-11-22)

## Context

Host pages carry their own CSS. Their rules can restyle our buttons and text, and our rules can leak into their page.

## Decision

Attach an open shadow root to a single host `div` appended to `document.body`. Place all widget markup and styles inside it. Reset inherited properties with `:host { all: initial; }`.

## Consequences

- Host CSS does not reach the widget, and widget CSS does not reach the host.
- A host page cannot restyle the widget on purpose either. Theming needs CSS custom properties or options.
- Document-level selectors such as `document.querySelector` cannot find widget elements. Tests must query the shadow root.
