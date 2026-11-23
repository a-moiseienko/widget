# 0011. One conversation per tab, kept across reloads

Status: Proposed (2026-11-23)

## Context

Right now every page load starts a fresh, stateless conversation: the widget sends each message with no history and the backend answers one message at a time. Visitors expect a reload to keep their conversation, and a second tab to start a separate one.

## Decision

- Store the session key in `sessionStorage`, not `localStorage` or a cookie: it is per-tab by design, survives a reload of that tab, and a new tab (or a duplicated one) gets a new key.
- Generate the key client-side on first use with the Web Crypto API (`crypto.randomUUID()`), not a counter or a timestamp, and send it to the backend as a header on every request.
- The backend owns key validation and storage (see the backend's own ADR for that).

## Consequences

- Closing a tab drops that conversation; nothing is kept past `sessionStorage`'s lifetime unless the backend persists it separately.
- Opening the widget in two tabs gives two independent conversations, which matches how visitors already expect tabs to behave.
- `askQuestion()` and the fetch call in `api.ts` need to read and send this key; the API's request shape changes.
