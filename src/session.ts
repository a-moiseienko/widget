const STORAGE_KEY = "chat-widget:session-id";

/** Header the backend reads the session id from (see the backend's session-keys ADR). */
export const SESSION_ID_HEADER = "X-Session-Id";

/**
 * Returns this tab's session id, generating and storing one on first use.
 * sessionStorage is per-tab: a reload keeps the id, a new or duplicated tab does not share it.
 */
export function getSessionId(storage: Storage = window.sessionStorage): string {
  const existing = storage.getItem(STORAGE_KEY);
  if (existing !== null) return existing;

  const id = crypto.randomUUID();
  storage.setItem(STORAGE_KEY, id);
  return id;
}
