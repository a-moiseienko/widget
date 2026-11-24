import { SESSION_ID_HEADER } from "./session";

export class ChatApiError extends Error {}

interface ChatResponse {
  readonly answer: string;
}

function isChatResponse(value: unknown): value is ChatResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "answer" in value &&
    typeof value.answer === "string"
  );
}

/** Sends one question, as part of the given session, to the backend and returns the answer text. */
export async function askQuestion(apiUrl: string, message: string, sessionId: string): Promise<string> {
  const response = await fetch(apiUrl.replace(/\/+$/, "") + "/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json", [SESSION_ID_HEADER]: sessionId },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new ChatApiError("Request failed with status " + String(response.status));
  }

  const body: unknown = await response.json();
  if (!isChatResponse(body)) {
    throw new ChatApiError("Unexpected response from the server");
  }
  return body.answer;
}
