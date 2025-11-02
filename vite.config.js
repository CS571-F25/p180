import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/p180/',
  build: {
    outDir: 'docs'
  },
  server: {
    port: 3000,
    strictPort: false, // If port is taken, automatically try the next available port
    host: true // Listen on all addresses including LAN
  }
})
