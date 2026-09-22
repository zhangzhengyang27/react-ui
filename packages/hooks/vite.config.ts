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
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            // 与 packages/ui 同理：压成单个 index.js 会让下游摇不动树，
            // 只 import 一个 use-hotkeys 也要背上全部 87 个 hook。
            output: [
                {
                    format: 'es',
                    // 同 packages/ui：保住 src/index.ts 顶部的 'use client'（只给 ESM 加）
                    banner: "'use client';",
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                    chunkFileNames: '[name].js'
                },
                {
                    format: 'cjs',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].cjs',
                    chunkFileNames: '[name].cjs',
                    exports: 'named'
                }
            ]
        }
    }
})
