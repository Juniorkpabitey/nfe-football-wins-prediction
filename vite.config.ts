import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_OPENROUTER_API_KEY: JSON.stringify(process.env.VITE_OPENROUTER_API_KEY),
      VITE_SITE_URL: JSON.stringify(process.env.VITE_SITE_URL),
      VITE_SITE_NAME: JSON.stringify(process.env.VITE_SITE_NAME)
    }
  }
})
