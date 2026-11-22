# Features: widget

Status date: 2026-11-22. Each feature lists its business rule and where the code lives.

## F1. Open and close the chat

A "Chat with us" button sits in the bottom-right corner. Clicking it opens the chat panel and hides the button. The close button or the Escape key closes the panel and returns focus to the button.

- Code: `src/widget.ts` (`setOpen`).

## F2. Greet the visitor

The panel opens with a support message that tells the visitor to ask a question and gives two examples.

- Code: `src/widget.ts` (`GREETING`).

## F3. Write a message of up to 250 characters

The visitor types in a text box.

- The limit is 250 characters. An emoji counts as one. Typing or pasting past the limit cuts the text at 250.
- A meter and a counter under the box show the length, for example `42/250`. Both turn amber at 225 and red at 250.
- Enter sends the message. Shift+Enter starts a new line.
- The Send button stays disabled while the box is empty or blank, and while a reply is pending.
- The widget trims leading and trailing whitespace before it sends.
- Code: `src/limits.ts`, `src/widget.ts` (`refresh`, `submit`).

## F4. Send a message and read the answer

Sending adds the visitor's message to the list, calls the backend, and adds the answer.

- Visitor messages sit on the right on a teal background. Support answers sit on the left with a teal rule.
- The list scrolls to the newest message.
- The widget shows one question at a time. It waits for the answer before it accepts the next one.
- Messages show as plain text. Line breaks stay. HTML in a message appears as typed text and never runs.
- Code: `src/widget.ts` (`addMessage`, `submit`), `src/api.ts`.

## F5. Report a failed request

When the backend does not answer or returns an error, the list shows: "Couldn't reach support. Check your connection and send the message again." The visitor can send again. The failed message stays in the list.

- Code: `src/widget.ts` (`NETWORK_ERROR`).

## F6. Embed on a website

A site owner adds one tag:

    <script src="https://cdn.example.com/chat-widget.js" data-api-url="https://chat.example.com"></script>

- `data-api-url` points to the backend. `data-title` changes the panel heading (default "Support chat").
- A page can call `ChatWidget.init({ apiUrl, title })` instead.
- The widget waits for the page to finish loading before it appears.
- The backend must list the site's origin in its CORS settings.
- Code: `src/index.ts`.

## F7. Work with a keyboard and a screen reader

- The panel is a labelled dialog. The message list is a live region, so new answers are announced.
- Every control has a visible focus ring and a text label.
- The meter animation stops when the visitor prefers reduced motion.
- Code: `src/widget.ts`, `src/styles.ts`.

## Not available yet

Messages from a human agent, conversation history after a page reload, visitor identity, file attachments, read receipts, and typing indicators. See [analysis.md](analysis.md).
