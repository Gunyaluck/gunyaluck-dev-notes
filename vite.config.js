/* global __dirname */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Static preview (PM2 + nginx). ไม่ใช้ 3000 — พอร์ตนั้นให้ Express API
  preview: {
    host: "0.0.0.0",
    port: 4173,
    allowedHosts: ["pjsdf.online"],
  },
})
