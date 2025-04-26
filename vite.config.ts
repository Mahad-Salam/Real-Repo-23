import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      // Allow serving files from one level up (the project root)
      allow: ['..'],
    },
  },
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Make text folder accessible as static assets
  publicDir: "public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // Copy text folder to dist during build
    assetsInlineLimit: 0
  },
  define: {
    // Fix for the __DEFINES__ error
    __DEFINES__: {},
  }
}));
