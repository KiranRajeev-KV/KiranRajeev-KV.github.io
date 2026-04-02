import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import mdx from '@mdx-js/rollup'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react({
      include: /\.(jsx|js|mdx|md|tsx|ts)$/,
    }),
    tailwindcss(),
  ],
})
