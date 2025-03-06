import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'https://melis-chatm.vercel.app/',
        methods: ["GET", "POST"],
        ws: true,
      }
    }
  }
})