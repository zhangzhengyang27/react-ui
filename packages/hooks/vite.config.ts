import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [
        react(),
        dts({
            outDir: 'es',
            include: ['src/**/*.ts', 'src/**/*.tsx', '../../@types/**/*.d.ts'],
            exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/test-setup.ts'],
            rollupTypes: false
        })
    ],
    build: {
        lib: {
            entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
            // 同时产出 ESM(.js) 与 CJS(.cjs)：type: module 下 .cjs 才会被 Node 当作 CommonJS
            formats: ['es', 'cjs'],
            fileName: format => (format === 'es' ? 'index.js' : 'index.cjs')
        },
        outDir: 'es',
        minify: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime']
        }
    }
})
