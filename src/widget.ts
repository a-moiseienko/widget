import { askQuestion } from "./api";
import { MAX_MESSAGE_LENGTH, clampToLimit, countChars } from "./limits";
import { STYLES } from "./styles";
import type { MessageKind, WidgetOptions } from "./types";

const WARN_AT = 225;
const GREETING = 'Hi! Ask me a question. Try "Hello" or "What are your opening hours?".';
const NETWORK_ERROR = "Couldn't reach support. Check your connection and send the message again.";

function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className !== undefined) {
    node.className = className;
  }
  return node;
}

function limitState(count: number): "ok" | "warn" | "full" {
  if (count >= MAX_MESSAGE_LENGTH) return "full";
  if (count >= WARN_AT) return "warn";
  return "ok";
}

export class ChatWidget {
  private readonly apiUrl: string;
  private readonly host = el("div");
  private readonly launcher = el("button", "launcher");
  private readonly panel = el("section", "panel");
  private readonly messages = el("ul", "messages");
  private readonly input = el("textarea", "input");
  private readonly sendButton = el("button", "send");
  private readonly limit = el("div", "limit");
  private readonly meterFill = el("div", "meter-fill");
  private readonly counter = el("span", "counter");
  private pending = false;

  constructor(options: WidgetOptions) {
    this.apiUrl = options.apiUrl;
    const title = options.title ?? "Support chat";

    const style = el("style");
    style.textContent = STYLES;

    this.launcher.type = "button";
    this.launcher.textContent = "Chat with us";
    this.launcher.setAttribute("aria-expanded", "false");

    this.panel.hidden = true;
    this.panel.setAttribute("role", "dialog");
    this.panel.setAttribute("aria-label", title);

    const header = el("header", "header");
    const heading = el("h2", "title");
    heading.textContent = title;
    const closeButton = el("button", "close");
    closeButton.type = "button";
    closeButton.textContent = "×";
    closeButton.setAttribute("aria-label", "Close chat");
    header.append(heading, closeButton);

    this.messages.setAttribute("role", "log");
    this.messages.setAttribute("aria-live", "polite");

    const form = el("form", "composer");
    form.noValidate = true;
    this.input.rows = 2;
    this.input.placeholder = "Type your question";
    this.input.autocomplete = "off";
    this.input.setAttribute("aria-label", "Your message");
    this.sendButton.type = "submit";
    this.sendButton.textContent = "Send";

    const meter = el("div", "meter");
    meter.append(this.meterFill);
    this.limit.append(meter, this.counter);
    form.append(this.input, this.sendButton, this.limit);

    this.panel.append(header, this.messages, form);

    const root = el("div", "root");
    root.append(this.launcher, this.panel);
    this.host.attachShadow({ mode: "open" }).append(style, root);

    this.launcher.addEventListener("click", () => {
      this.setOpen(true);
    });
    closeButton.addEventListener("click", () => {
      this.setOpen(false);
    });
    this.panel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.setOpen(false);
    });
    this.input.addEventListener("input", () => {
      this.input.value = clampToLimit(this.input.value);
      this.refresh();
    });
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey && !event.isComposing) {
        event.preventDefault();
        void this.submit();
      }
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void this.submit();
    });

    this.addMessage("support", GREETING);
    this.refresh();
  }

  mount(parent: HTMLElement): void {
    parent.append(this.host);
  }

  private setOpen(open: boolean): void {
    this.panel.hidden = !open;
    this.launcher.hidden = open;
    this.launcher.setAttribute("aria-expanded", String(open));
    if (open) {
      this.input.focus();
    } else {
      this.launcher.focus();
    }
  }

  private addMessage(kind: MessageKind, text: string): void {
    const item = el("li", "message " + kind);
    item.textContent = text; // textContent, never innerHTML: messages are plain text
    this.messages.append(item);
    this.messages.scrollTop = this.messages.scrollHeight;
  }

  private refresh(): void {
    const count = countChars(this.input.value);
    this.counter.textContent = String(count) + "/" + String(MAX_MESSAGE_LENGTH);
    this.meterFill.style.width = String((count / MAX_MESSAGE_LENGTH) * 100) + "%";
    this.limit.dataset.state = limitState(count);
    this.sendButton.disabled = this.pending || this.input.value.trim() === "";
  }

  private async submit(): Promise<void> {
    const text = this.input.value.trim();
    if (text === "" || this.pending) return;

    this.input.value = "";
    this.addMessage("user", text);
    this.pending = true;
    this.refresh();

    try {
      this.addMessage("support", await askQuestion(this.apiUrl, text));
    } catch {
      this.addMessage("error", NETWORK_ERROR);
    } finally {
      this.pending = false;
      this.refresh();
      this.input.focus();
    }
  }
}
