/** Maximum message length in characters (Unicode code points, same rule as the backend). */
export const MAX_MESSAGE_LENGTH = 250;

/** Array.from iterates by code point, so an emoji counts once, matching Java's codePointCount. */
export function countChars(text: string): number {
  return Array.from(text).length;
}

export function clampToLimit(text: string): string {
  const chars = Array.from(text);
  return chars.length <= MAX_MESSAGE_LENGTH ? text : chars.slice(0, MAX_MESSAGE_LENGTH).join("");
}
