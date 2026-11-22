# widget

TypeScript (strict) chat widget, built with Vite into one embeddable script.

## Run locally

Start the backend first (see `chat-backend/README.md`), then:

    npm install
    npm run dev

Open http://localhost:5173. The demo page loads the widget and talks to http://localhost:8080.

## Checks

    npm run check    # tsc --noEmit + type-aware ESLint
    npm run build    # writes dist/chat-widget.js

## Embed

    <script src="https://cdn.example.com/chat-widget.js" data-api-url="https://chat.example.com"></script>

Or call `ChatWidget.init({ apiUrl: "https://chat.example.com" })` after loading the script.
