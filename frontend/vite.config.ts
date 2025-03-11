import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({

  plugins: [react()],
  // server: {
  //   middlewareMode: true,
  //   hmr: true,
  // },
  // build: {
  //   outDir: 'dist',
  // },
  // // Fallback for client-side routing
  // resolve: {
  //   alias: {
  //     '@': '/src',
  //   },
  // },
})
