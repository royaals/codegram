import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      'process.env': env
    },
  }
})
