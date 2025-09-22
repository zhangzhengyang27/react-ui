import { defineConfig } from 'dumi'
import path from 'node:path'

const isProduction = /* process.env.NODE_ENV === 'production' */ true
const isWin = process.platform === 'win32'

export default defineConfig({
    outputPath: 'docs-dist',
    npmClient: 'pnpm',
    mfsu: isWin ? undefined : {},
    apiParser: isProduction ? {} : false,
    resolve: {
        // 配置入口文件路径，API 解析将从这里开始
        entryFile: path.join(__dirname, '../../packages/ui/src/index.ts')
    },
    locales: [{ id: 'zh-CN', name: '中文' }],
    themeConfig: {
        // favicons: ['https://xxx/favicon.ico'],
        logo: 'https://zhangzhengyang.oss-cn-beijing.aliyuncs.com/images/202509221201531.png',
        title: '小叶科技 | @react-ui/ui',
        // name: '小叶',
        footer: false,
        hideHomeNav: true,
        prefersColor: {
            default: 'dark',
            switch: false
        }
    },
    styles: [
        `html, body { background: transparent;  }

        @media (prefers-color-scheme: dark) {
            html, body { background: #000; }
        }
        `
    ],
    alias: {
        '@react-ui/ui': path.join(__dirname, '../../packages/ui/src')
    }
})
