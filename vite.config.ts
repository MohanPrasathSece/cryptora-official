import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/vercel-blob': {
        target: 'https://vercel.com/api/blob',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/vercel-blob/, ''),
      },
      '/blob-store': {
        target: 'https://blob.vercel-storage.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blob-store/, ''),
      }
    }
  },
});
