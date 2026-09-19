import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import ts from 'typescript'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [
        react(),
        dts({
            outDir: 'es',
            include: ['src/**/*.ts', 'src/**/*.tsx', '../../@types/**/*.d.ts'],
            // story 文件只用于本地预览，进了 .d.ts 就等于把 52 个无关声明发布出去
            exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.story.tsx', 'src/test-setup.ts'],
            // 声明发射有类型错误时，对应文件会被静默跳过（产物 import 变 TS2307），必须失败
            afterDiagnostic: diagnostics => {
                const errors = diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error)
                if (errors.length > 0) {
                    const first = ts.flattenDiagnosticMessageText(errors[0].messageText, ' ')
                    throw new Error(
                        `[vite:dts] ${errors.length} 个类型错误，声明产物不完整。首个：${first}`
                    )
                }
            },
            rollupTypes: false,
            // Workaround: vite-plugin-dts adds an extra underscore to re-exported
            // identifiers starting with '__' (e.g. __BaseInputProps → ___BaseInputProps),
            // and only rewrites the import/export side while type references keep the
            // original double underscore, which breaks the emitted .d.ts.
            // Normalize every triple-underscore identifier back to double underscore.
            beforeWriteFile: (filePath, content) => ({
                filePath,
                content: content.replace(/___([A-Za-z])/g, '__$1')
            })
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
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime'
            ]
        }
    }
})
