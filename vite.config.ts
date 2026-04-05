import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { legacyChunksPlugin } from "./src/vite-plugins/legacyChunksPlugin";
import { siteHtmlPlugin } from "./src/vite-plugins/siteHtmlPlugin";

export default defineConfig({
  plugins: [react(), siteHtmlPlugin(), ...legacyChunksPlugin()],
  publicDir: "public",
});
