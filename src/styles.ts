export const STYLES = `
:host { all: initial; }
*, *::before, *::after { box-sizing: border-box; }

.root {
  --ink: #1c2a38;
  --paper: #f7f2e7;
  --line: #ddd0b8;
  --muted: #786f5e;
  --stamp: #2f6e4f;
  --stamp-dark: #20503a;
  --alert: #a23420;
  --warn: #8a5a15;

  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2147483000;
  font: 14px/1.5 ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  color: var(--ink);
}

button, textarea { font: inherit; color: inherit; }
button:focus-visible, textarea:focus-visible { outline: 2px solid var(--stamp); outline-offset: 2px; }

.launcher {
  display: flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-radius: 10px;
  padding: 11px 18px 11px 14px;
  background: var(--ink);
  color: var(--paper);
  font-weight: 600;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(28, 42, 56, 0.3);
}
.launcher:hover { background: #26384a; }
.launcher[hidden] { display: none; }

.mark {
  flex: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--stamp);
  box-shadow: 0 0 0 3px rgba(47, 110, 79, 0.28);
}

.panel {
  display: flex;
  flex-direction: column;
  width: min(366px, calc(100vw - 40px));
  height: min(528px, calc(100vh - 40px));
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 48px rgba(28, 42, 56, 0.28);
}
.panel[hidden] { display: none; }

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 10px 14px 18px;
  background: var(--ink);
  color: var(--paper);
}
.header-id {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}
.title {
  margin: 0;
  font-family: ui-serif, Georgia, "Times New Roman", serif;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.close {
  flex: none;
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--paper);
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
}
.close:hover { background: rgba(247, 242, 231, 0.14); }
.close:focus-visible { outline-color: var(--paper); }

.messages {
  flex: 1;
  margin: 0;
  padding: 18px;
  list-style: none;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--paper);
}
.message {
  max-width: 88%;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.message.support {
  align-self: flex-start;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--line);
}
.message.user {
  align-self: flex-end;
  padding: 9px 13px;
  background: var(--stamp);
  color: #fff8f0;
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 100%, 0 100%);
  padding-right: 20px;
}
.message.error {
  align-self: stretch;
  max-width: none;
  padding: 9px 13px;
  border: 1px dashed var(--alert);
  color: var(--alert);
  font-size: 13px;
}

.composer {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: end;
  padding: 14px;
  border-top: 1px solid var(--line);
  background: #fff;
}
.input {
  resize: none;
  width: 100%;
  min-height: 42px;
  max-height: 120px;
  padding: 9px 11px;
  border: 1px dashed var(--line);
  border-radius: 6px;
  background: var(--paper);
}
.input:focus-visible { border-style: solid; }
.send {
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: 6px;
  background: var(--stamp);
  color: #fff8f0;
  font-weight: 600;
  cursor: pointer;
  transition: transform 100ms ease-out, background-color 100ms ease-out;
}
.send:hover:not(:disabled) { background: var(--stamp-dark); }
.send:active:not(:disabled) { transform: scale(0.96) rotate(-1deg); }
.send:disabled { opacity: 0.4; cursor: not-allowed; }

.limit {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 10px;
}
.meter {
  flex: 1;
  height: 4px;
  background: repeating-linear-gradient(90deg, var(--line) 0 2px, transparent 2px 5px);
}
.meter-fill {
  height: 100%;
  width: 0;
  background: repeating-linear-gradient(90deg, var(--stamp) 0 2px, transparent 2px 5px);
  transition: width 120ms ease-out;
}
.counter { font-size: 12px; color: var(--muted); font-variant-numeric: tabular-nums; }
.limit[data-state="warn"] .meter-fill { background: repeating-linear-gradient(90deg, var(--warn) 0 2px, transparent 2px 5px); }
.limit[data-state="warn"] .counter { color: var(--warn); }
.limit[data-state="full"] .meter-fill { background: repeating-linear-gradient(90deg, var(--alert) 0 2px, transparent 2px 5px); }
.limit[data-state="full"] .counter { color: var(--alert); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .meter-fill, .send { transition: none; }
}
`;
