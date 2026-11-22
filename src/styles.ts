export const STYLES = `
:host { all: initial; }
*, *::before, *::after { box-sizing: border-box; }

.root {
  --ink: #16212c;
  --mist: #f3f6f8;
  --line: #d6dee5;
  --muted: #5d6b79;
  --harbour: #0b6e6e;
  --harbour-dark: #08504f;
  --alert: #b4351f;
  --warn: #9a6200;

  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2147483000;
  font: 14px/1.45 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  color: var(--ink);
}

button, textarea { font: inherit; color: inherit; }
button:focus-visible, textarea:focus-visible { outline: 2px solid var(--harbour); outline-offset: 2px; }

.launcher {
  border: 0;
  border-radius: 999px;
  padding: 12px 20px;
  background: var(--harbour);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(22, 33, 44, 0.25);
}
.launcher:hover { background: var(--harbour-dark); }
.launcher[hidden] { display: none; }

.panel {
  display: flex;
  flex-direction: column;
  width: min(360px, calc(100vw - 40px));
  height: min(520px, calc(100vh - 40px));
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(22, 33, 44, 0.22);
}
.panel[hidden] { display: none; }

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px 12px 16px;
  background: var(--ink);
  color: #fff;
}
.title { margin: 0; font-size: 15px; font-weight: 600; }
.close {
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
}
.close:hover { background: rgba(255, 255, 255, 0.14); }
.close:focus-visible { outline-color: #fff; }

.messages {
  flex: 1;
  margin: 0;
  padding: 16px;
  list-style: none;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--mist);
}
.message {
  max-width: 86%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.message.support {
  align-self: flex-start;
  padding-left: 10px;
  border-left: 3px solid var(--harbour);
}
.message.user {
  align-self: flex-end;
  padding: 8px 12px;
  border-radius: 10px 10px 3px 10px;
  background: var(--harbour);
  color: #fff;
}
.message.error {
  align-self: stretch;
  max-width: none;
  padding: 8px 12px;
  border-radius: 6px;
  background: #fbe9e5;
  color: var(--alert);
  font-size: 13px;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  align-items: end;
  padding: 12px;
  border-top: 1px solid var(--line);
  background: #fff;
}
.input {
  resize: none;
  width: 100%;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
}
.send {
  height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 8px;
  background: var(--harbour);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}
.send:hover:not(:disabled) { background: var(--harbour-dark); }
.send:disabled { opacity: 0.45; cursor: not-allowed; }

.limit {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.meter {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: var(--line);
  overflow: hidden;
}
.meter-fill {
  height: 100%;
  width: 0;
  background: var(--harbour);
  transition: width 120ms ease-out, background-color 120ms ease-out;
}
.counter { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
.limit[data-state="warn"] .meter-fill { background: var(--warn); }
.limit[data-state="warn"] .counter { color: var(--warn); }
.limit[data-state="full"] .meter-fill { background: var(--alert); }
.limit[data-state="full"] .counter { color: var(--alert); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .meter-fill { transition: none; }
}
`;
