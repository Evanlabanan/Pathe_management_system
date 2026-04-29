import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // LA LIGNE MAGIQUE POUR WINDOWS/DOCKER
    },
    host: '0.0.0.0',
    port: 3000,
  }
})