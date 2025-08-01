import { fileURLToPath, URL } from 'node:url'
import { Buffer } from 'buffer'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { imagetools } from 'vite-imagetools'

globalThis.Buffer = Buffer
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    
    imagetools()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
