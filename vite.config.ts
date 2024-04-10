import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import checker from 'vite-plugin-checker'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ["vite.svg"],
      manifest: {
        name: "Your App",
        short_name: "your-app",
        description: "Your App Description",
        theme_color: '#171717',
        background_color: '#f0e7db',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/svg'
          }
        ],
        display: "standalone",
        scope: '/',
        start_url: "/",
        orientation: 'portrait'
      }
    }),
  ],
})
