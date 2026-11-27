import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "_app",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ["gsap", "lenis"]
        }
      }
    }
  }
});
