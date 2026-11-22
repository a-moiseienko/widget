# 0004. Render messages as plain text

Status: Accepted (2026-11-22)

## Context

Messages come from visitors and from the server. A message that contains HTML must not run script on a customer's page.

## Decision

Set message content with `textContent`. Never use `innerHTML` for message text. Keep line breaks with `white-space: pre-wrap`.

## Consequences

- The widget cannot show links, bold text, or images in an answer.
- Cross-site scripting through message content is not possible by construction.
- Rich answers need a new decision, with a sanitizer and a defined set of allowed markup.
