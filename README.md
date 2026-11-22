# widget

Chat widget for websites. A visitor opens a chat window, types a question of up to 250 characters, and reads the answer from [chat-backend](https://github.com/a-moiseienko/chat-backend). The site owner adds it with one script tag.

TypeScript in strict mode, no runtime dependencies, built with Vite into one file.

## Quick start

You need Node 26 (see `.nvmrc`) and the backend running on http://localhost:8080.

    npm install
    npm run dev

Open http://localhost:5173 and click "Chat with us". The demo page lists the questions the backend answers. The dev server must keep port 5173, because the backend only allows that origin.

## Embed on a website

    <script src="https://cdn.example.com/chat-widget.js"
            data-api-url="https://chat.example.com"
            data-title="Acme support"></script>

Or start it from your own code after loading the script:

    ChatWidget.init({ apiUrl: "https://chat.example.com", title: "Acme support" });

| Option | Script attribute | Default | Purpose |
|--------|------------------|---------|---------|
| `apiUrl` | `data-api-url` | none, required | Base URL of the backend |
| `title` | `data-title` | `Support chat` | Heading of the chat panel |

Load it as a classic script, not `type="module"`. The backend must list your site in its `chat.allowed-origins`.

## What it does

- Opens and closes from a button in the bottom-right corner.
- Accepts up to 250 characters, counted as Unicode code points, with a meter and a counter.
- Sends on Enter. Shift+Enter starts a new line.
- Shows answers as plain text and shows an error message when the backend does not answer.
- Keeps its styles in a Shadow DOM, so the host page cannot break them.

The full list is in [docs/features.md](docs/features.md).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Demo page with live reload |
| `npm run typecheck` | `tsc --noEmit` with strict settings |
| `npm run lint` | ESLint with type-aware rules |
| `npm run check` | Typecheck and lint |
| `npm run build` | Writes `dist/chat-widget.js` |

## Project layout

    src/
      index.ts    entry point: init() and the script-tag start
      widget.ts   the chat UI
      api.ts      the call to the backend
      limits.ts   the 250-character rule
      styles.ts   CSS for the Shadow DOM
      types.ts    shared types
      demo.ts     local demo only
    index.html    demo page
    docs/         analysis, features, and architecture decisions

## Build and release

GitHub Actions runs the pipeline in `.github/workflows/ci.yml`.

| Event | What happens |
|-------|--------------|
| Pull request to `master` | `npm ci`, typecheck, lint, build |
| Push to `master` | The same checks, then `dist/` is stored as an artifact and deployed to `dev` |
| Tag `v*` | A build from the tagged commit, then a deploy to `production` after a reviewer approves |

To release, tag a commit that is already on `master`:

    git tag v0.1.0
    git push origin v0.1.0

The publish steps are placeholders until a static host is chosen. Set up the `dev` and `production` environments (with required reviewers on `production`) and protect `master` in the GitHub repository settings.

## Docs

- [Analysis](docs/analysis.md): current state, gaps, risks
- [Features](docs/features.md): what the widget does and its rules
- [Decisions](docs/decisions/): architecture decision records
