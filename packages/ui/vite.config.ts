import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import ts from 'typescript'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const pkg = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

// 运行时依赖与 peer 一律外部化：打进产物等于下游既按 dependencies 再装一遍、
// 运行时又拿到第二份实例（dayjs 的 extend/locale、@emotion/cache 的插入点都是全局状态）。
const externalPackages = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
    'react',
    'react-dom'
]

// rollup 的 external 数组只精确匹配 id，而源码里有 dayjs/plugin/utc 这类子路径，
// 所以按包名段判定；相对路径与虚拟模块（\0 前缀）留给 rollup 自己处理。
const isExternal = (id: string) => {
    if (id.startsWith('.') || id.startsWith('/') || id.startsWith('\0')) {
        return false
    }
    const segments = id.split('/')
    const packageName = id.startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0]
    return externalPackages.includes(packageName)
}

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
        // minify 保持开启：实测它不影响摇树（Button 12,425 B gzip vs 关掉压缩的 12,423 B），
        // 但关掉会让 Vite 的 CSS 压缩链停摆，style.css 丢掉 -webkit/-moz 前缀（实测 8 处 appearance）。
        minify: true,
        rollupOptions: {
            external: isExternal,
            // 关键改动：不再把 1400 个模块压成单个 index.js。模块边界一旦消失，
            // 下游打包器就摇不动树——实测 import { Button } 从 12 KB gzip 涨到 327 KB gzip，
            // 且会把 rrule / react-dropzone 这些用不到的实现一起带进消费方产物。
            output: [
                {
                    format: 'es',
                    // rollup 默认不保留入口模块的指令序言：源码 src/index.ts 第 1 行的
                    // 'use client' 会在打包时被丢掉，而 guides/next.zh-CN.md 向 Next.js 用户承诺
                    // 入口顶部有这条指令、无需自己加。banner 把它还给 ESM 产物。
                    // 只给 ESM 输出加：CJS 输出以 'use strict' 开头，再插一条指令序言会静默削弱严格模式。
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
