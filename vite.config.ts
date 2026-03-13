import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MP4', '**/*.JPG'],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
