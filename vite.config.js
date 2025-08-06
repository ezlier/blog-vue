import { fileURLToPath, URL } from 'node:url'
import { Buffer } from 'buffer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

globalThis.Buffer = Buffer

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    imagetools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    outDir: "docs"
  }
})
