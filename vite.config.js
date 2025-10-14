import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: {
    // Transpile optional chaining/nullish coalescing for Puppeteer’s Chromium
    target: 'es2018',         // if the error persists, drop to 'es2017'
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})