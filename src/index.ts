import { ChatWidget } from "./widget";
import type { WidgetOptions } from "./types";

export type { WidgetOptions } from "./types";

/** Adds the chat widget to the page. Safe to call before the DOM has finished loading. */
export function init(options: WidgetOptions): void {
  const mount = (): void => {
    new ChatWidget(options).mount(document.body);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
}

// Embed with one tag: <script src="chat-widget.js" data-api-url="https://chat.example.com"></script>
const script = document.currentScript;
if (script instanceof HTMLScriptElement && script.dataset.apiUrl !== undefined) {
  const apiUrl = script.dataset.apiUrl;
  const title = script.dataset.title;
  init(title === undefined ? { apiUrl } : { apiUrl, title });
}
