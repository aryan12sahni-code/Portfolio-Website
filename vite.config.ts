import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 43123,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 43123,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          gsap: ["gsap", "lenis"],
        },
      },
    },
  },
});
