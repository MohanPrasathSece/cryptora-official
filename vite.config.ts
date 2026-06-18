import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { put, list } from "@vercel/blob";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    plugins: [
      react(),
      tailwindcss(),
      tsconfigPaths(),
      {
        name: "vercel-blob-proxy",
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url?.startsWith("/api/blob-put")) {
              let body = "";
              req.on("data", (chunk) => { body += chunk; });
              req.on("end", async () => {
                try {
                  const url = new URL(req.url!, "http://localhost");
                  const pathname = url.searchParams.get("pathname");
                  if (!pathname) throw new Error("Missing pathname");
                  const blob = await put(pathname, body, {
                    access: "private",
                    token: env.VITE_BLOB_READ_WRITE_TOKEN,
                  });
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify(blob));
                } catch (e: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: e.message }));
                }
              });
              return;
            }

            if (req.url?.startsWith("/api/blob-list")) {
              try {
                const url = new URL(req.url!, "http://localhost");
                const prefix = url.searchParams.get("prefix");
                const blobs = await list({
                  prefix: prefix || undefined,
                  token: env.VITE_BLOB_READ_WRITE_TOKEN,
                });
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify(blobs));
              } catch (e: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
              return;
            }

            next();
          });
        },
      },
    ],
    server: {
      host: "::",
      port: 8080,
      hmr: {
        clientPort: 8081,
      },
    },
  };
});
