import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "ChatWidget",
      formats: ["iife"],
      fileName: () => "chat-widget.js",
    },
    outDir: "dist",
  },
});
