import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react-social-media-embed") || id.includes("react-youtube")) {
            return "vendor-social";
          }

          if (
            id.includes("/recharts/") ||
            id.includes("/victory-vendor/") ||
            id.includes("/react-smooth/") ||
            id.includes("/d3-")
          ) {
            return "vendor-charts";
          }

          if (id.includes("@supabase") || id.includes("@tanstack/react-query")) {
            return "vendor-data";
          }

          if (id.includes("posthog-js") || id.includes("@vercel/analytics")) {
            return "vendor-analytics";
          }

          if (
            id.includes("@radix-ui") ||
            id.includes("cmdk") ||
            id.includes("embla-carousel-react") ||
            id.includes("vaul")
          ) {
            return "vendor-ui";
          }

          if (id.includes("lucide-react") || id.includes("date-fns") || id.includes("zod")) {
            return "vendor-utils";
          }

          if (/[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom)[\\/]/.test(id)) {
            return "vendor-react";
          }
        },
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
