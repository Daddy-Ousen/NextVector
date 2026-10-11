import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { articleSplitPlugin } from './vite.articleSplit.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), articleSplitPlugin()],
  build: {
    target: 'esnext',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('virtual:article-summaries')) {
            return 'data-articles';
          }
          if (id.includes('src/data/modelsData')) {
            return 'data-models';
          }
          if (id.includes('src/data/benchmarksData')) {
            return 'data-benchmarks';
          }
        },
      },
    },
  },
})

