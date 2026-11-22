# 0005. Client-side 250-character limit by code points

Status: Accepted (2026-11-22)

## Context

The product limits messages to 250 characters. The HTML `maxlength` attribute counts UTF-16 code units, so it counts an emoji as two. The backend counts Unicode code points.

## Decision

Do not set `maxlength`. On every `input` event, cut the text to 250 code points with `Array.from`. Show the count with a meter and a counter that change colour at 225 and 250. Trim the text before sending. The backend remains the final check.

## Consequences

- The widget and the backend agree on the count for emoji.
- A grapheme cluster made of several code points counts as several characters in both places.
- Cutting the text moves the caret to the end of the box when a paste goes over the limit.
- The visitor sees the limit while typing, so a rejection from the backend should not happen in normal use.
