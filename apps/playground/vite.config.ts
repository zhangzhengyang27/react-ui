import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@react-ui/ui': fileURLToPath(new URL('../../packages/ui/src/index.ts', import.meta.url)),
            '@react-ui/hooks': fileURLToPath(new URL('../../packages/hooks/src/index.ts', import.meta.url))
        }
    },
    server: {
        port: 5173,
        host: true
    }
})
