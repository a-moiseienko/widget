#!/usr/bin/env node
// Writes dist/index.html from templates/welcome.html, filling in the backend
// and widget URLs so the deployed site shows a working demo at "/".
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const apiUrl = process.env.WIDGET_API_URL ?? "http://localhost:8080";
const selfUrl = process.env.WIDGET_SELF_URL ?? "";

const template = readFileSync(join(root, "templates", "welcome.html"), "utf8");
const page = template
  .replaceAll("__API_URL__", apiUrl)
  .replaceAll("__SELF_URL__", selfUrl);

writeFileSync(join(root, "dist", "index.html"), page);
