import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const envDefine: Record<string, string> = {};
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), "VITE_"))) {
    envDefine[`import.meta.env.${key}`] = JSON.stringify(value);
  }

  const tanstackStartDefaults = {
    importProtection: {
      behavior: "error" as const,
      client: {
        files: ["**/server/**"],
        specifiers: ["server-only"],
      },
    },
  };

  return {
    define: envDefine,
    resolve: {
      alias: {
        "@": path.join(rootDir, "src"),
      },
      dedupe: ["react", "react-dom", "@tanstack/react-query", "@tanstack/query-core"],
    },
    plugins: [
      tailwindcss(),
      tsConfigPaths({ projects: ["./tsconfig.json"] }),
      tanstackStart(tanstackStartDefaults),
      nitro({ preset: "vercel" }),
      viteReact(),
    ],
    server: {
      host: "::",
      port: 8080,
    },
  };
});
