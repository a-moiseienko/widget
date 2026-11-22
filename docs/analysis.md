# Analysis: widget

Date: 2026-11-22

## Purpose

The widget gives website visitors a chat window to reach support. A site owner adds one script tag. The widget talks to `chat-backend`.

## Current state

- A "Chat with us" button opens a panel with a message list and a text input.
- The input accepts at most 250 characters and shows a meter and counter.
- The visitor sends a message and sees the backend's answer in the list.
- Network and server errors show a message in the list.
- The widget builds to one file, `dist/chat-widget.js`, with no runtime dependencies.
- Styles live in a Shadow DOM, so the host page cannot break them.
- Strict TypeScript and type-aware ESLint check the code at build time.
- A local demo page at http://localhost:5173 loads the widget against http://localhost:8080.

## Gap to the MVP

| Planned MVP item | Status |
|------------------|--------|
| Launcher and chat panel | Done |
| Text input limited to 250 characters, with counter | Done |
| Message list rendering | Done |
| Real-time messages from an agent | Not started (needs WebSocket in the backend) |
| Visitor session kept across page reloads | Not started |
| Conversation history after reload | Not started |
| Read receipts and typing indicators | Moved to post-MVP backlog |

## Risks

- **No automated tests.** Only the type checker and linter guard the code. Add Vitest with a DOM environment before the widget grows.
- **Lint setup unverified.** The ESLint flat config was fixed after a first failure and has not run clean on CI yet.
- **Hand-kept API contract.** The request and response shapes are copied by hand from the backend. A runtime check catches a mismatch, but only when a visitor hits it.
- **Hosting page conflicts.** The widget sets `z-index: 2147483000` and listens for keys only inside its panel. Test it on a page with its own focus handling and modal dialogs.
- **Accessibility not audited.** The panel uses `role="dialog"`, a live message log, labelled controls, and visible focus. No screen reader test has happened. The dialog does not trap focus.

## Open questions

- Which CDN hosts `chat-widget.js` in dev and production?
- Does the widget need theming (accent colour, position, language) per customer site?
- Does the visitor identify themselves before chatting?
