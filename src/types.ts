export type MessageKind = "user" | "support" | "error";

export interface WidgetOptions {
  /** Base URL of the chat backend, e.g. "http://localhost:8080". */
  readonly apiUrl: string;
  /** Heading shown in the chat panel. */
  readonly title?: string;
}
