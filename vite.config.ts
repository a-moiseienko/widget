import { defineConfig } from "vite";

export default defineConfig({
  server: {
    // The backend allows exactly this origin, so fail instead of picking another port.
    port: 5173,
    strictPort: true,
  },
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
