import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'dumi';

import rehypeDocs from './.dumi/rehypeDocs';
import rehypeChangelog from './.dumi/rehypeChangelog';
import remarkAnchor from './.dumi/remarkAnchor';
import remarkMeta from './.dumi/remarkMeta';

export default defineConfig({
    plugins: ['dumi-plugin-color-chunk'],

    // 路由与产物
    hash: true,
    mfsu: false,
    // 用 mako（Rust 极速打包器）替代默认 webpack，dev/build 速度提升 5-10x
    mako: {},
    outputPath: 'dist',
    favicons: ['/favicon.svg'],

    // 文档与组件资产目录
    resolve: {
        docDirs: [{ type: 'doc', dir: 'docs' }],
        atomDirs: [{ type: 'component', dir: 'components' }],
        codeBlockMode: 'passive',
    },

    // 仅中文文档
    locales: [{ id: 'zh-CN', name: '中文', suffix: '' }],

    // @react-ui/ui 指向已构建的 ES 产物（含正确顺序的 CSS module）。
    // 注意：不能指向 src 源码——mako 重新编译 CSS module 时会按文件名字母序排列，
    // 导致 UnstyledButton 的 reset 排在 Button 之后，覆盖 background: var(--button-bg)。
    // @react-ui/hooks 无 CSS，保留指向 src 便于调试。
    alias: {
        '@react-ui/ui': path.join(__dirname, '../../packages/ui/es/index.js'),
        '@react-ui/hooks': path.join(__dirname, '../../packages/hooks/src/index.ts'),
        // @react-ui/demo 包未发布，指向本地 DemoEngine（已导出 Demo/UIDemo/ConfiguratorControlOptions）
        '@react-ui/demo': path.join(__dirname, '.dumi/theme/builtins/DemoEngine/index.ts'),
        // docgen 生成的 JSON 数据
        '@docs/docgen': path.join(__dirname, '.docgen/docgen.json'),
        '@docs/hooks': path.join(__dirname, '.docgen/hooks.json'),
        '@docs/css-exports': path.join(__dirname, '.docgen/css-exports.json'),
        '@docs/theme-tokens': path.join(__dirname, '.docgen/theme-tokens.json'),
        '@docs/count': path.join(__dirname, '.docgen/count.json'),
        // styles-api 数据
        '@react-ui/docs-styles-api': path.join(__dirname, '../../packages/@react-ui/docs-styles-api/src/index.ts'),
        // colors-generator
        '@react-ui/colors-generator': path.join(__dirname, '../../packages/@react-ui/colors-generator/src/index.ts'),
        // docs-demos
        '@react-ui/docs-demos': path.join(__dirname, '../../packages/@react-ui/docs-demos/src/index.ts'),
        // dev-icons / meta / modals
        '@react-ui/dev-icons': path.join(__dirname, '../../packages/@react-ui/dev-icons/src/index.ts'),
        '@react-ui/meta': path.join(__dirname, '../../packages/@react-ui/meta/src/index.ts'),
        '@react-ui/modals': path.join(__dirname, '../../packages/@react-ui/modals/src/index.ts'),
    },

    extraRehypePlugins: [rehypeDocs, rehypeChangelog],
    extraRemarkPlugins: [remarkMeta, remarkAnchor],

    metas: [{ name: 'theme-color', content: '#1677ff' }],

    // 阶段六：导航由 docDirs/atomDirs 目录结构自动生成（dumi 2.4.47 不支持顶层 nav 配置键）。
    // 一级导航 = docs/ 下各子目录 + components/（dumi 默认按目录聚合为侧边栏与顶部导航）。

    // 排除首页 index/components 子路由被误生成
    conventionRoutes: {
        exclude: [/index\/components\//],
    },

    scripts: [
        {
            async: true,
            content: fs.readFileSync(path.join(__dirname, '.dumi', 'scripts', 'webmcp.js')).toString(),
        },
    ],
});
