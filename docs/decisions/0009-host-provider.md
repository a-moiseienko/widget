# 0009. Host provider: pluggable, Render for now

Status: Accepted (2026-11-23)

## Context

[0008](0008-build-once-promote-by-tag.md) left the publish step as a placeholder until a static host was picked. The widget is a static build output (`dist/chat-widget.js` plus a generated `index.html`, see [0010](0010-generated-welcome-page.md)), so it can run on any static host without code changes.

## Decision

- Treat the hosting provider as swappable. Keep provider-specific config in one file (`render.yaml`) rather than spreading assumptions about it through the app or CI.
- Deploy on Render for now: a Blueprint (`render.yaml`) defines a static site built with `npm ci && npm run build` and published from `dist/`. The live backend and widget URLs are passed in as build-time env vars (`WIDGET_API_URL`, `WIDGET_SELF_URL`) rather than hardcoded.
- Do not record a separate ADR per provider switch. Update this one (or replace it) when the provider changes.

## Consequences

- Moving off Render later (for example to Cloudflare Pages) means replacing `render.yaml` with that provider's equivalent and setting the same two env vars, not changing application code.
- The embed URL and backend URL live in Render's env vars, not in source, so they can change without a code change or redeploy of the backend.
