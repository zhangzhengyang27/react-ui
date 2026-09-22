import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [
        react(),
        dts({
            outDir: 'es',
            include: ['src/**/*.ts', 'src/**/*.tsx', '../../../@types/**/*.d.ts'],
            exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/test-setup.ts'],
            rollupTypes: false
        })
    ],
    build: {
        lib: {
            entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
            formats: ['es'],
            fileName: () => 'index.js'
        },
        outDir: 'es',
        minify: true,
        rollupOptions: {
            // 保住 src/index.ts 顶部的 'use client'：rollup 默认不保留入口的指令序言，
            // 而 guides/next.zh-CN.md 承诺过发布产物里有它。只加在 ESM 输出上。
            output: { banner: "'use client';" },
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                // peer 依赖不打进产物
                '@xiaoye-react/ui',
                '@xiaoye-react/hooks'
            ]
        }
    }
})
