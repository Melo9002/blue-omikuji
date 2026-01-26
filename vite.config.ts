import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/blue-omikuji/",
  plugins: [react()],
});
