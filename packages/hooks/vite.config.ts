import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [react(), dts({ outDir: 'es', include: ['src'], rollupTypes: false })],
    build: {
        lib: {
            entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
            formats: ['es'],
            fileName: () => 'index.js'
        },
        outDir: 'es',
        minify: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime']
        }
    }
})
