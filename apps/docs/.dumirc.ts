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
    // 用 mako（Rust 极速打包器）替代默认 webpack，dev/build 速度提升 5-10x。
    // 注：mako 无持久化缓存（0.11.x rust 绑定未实现），dev 每次全量编译约 3 分钟；
    // webpack 路线虽有 filesystem cache（热启动约 2 分钟），但冷启动 20 分钟+ 且入口
    // 产物更大，权衡后保留 mako。根治需迁移 rspress 等新一代框架（见 ROADMAP）。
    mako: {},
    // 关闭生产构建 source map：mako 默认 normalizedDevtool='source-map'，
    // 会为超大 chunk 生成数十 MB 的 .map，使 dist 膨胀到 3G+。
    // devtool 是 umi/dumi 顶层配置键（mako 子配置不支持该键）；
    // bundler-mako 读取 opts.config.devtool，为 false 时关闭 JS 与 less 的 source map。
    devtool: false,
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

    // @xiaoye-react/ui 指向已构建的 ES 产物（含正确顺序的 CSS module）。
    // 注意：不能指向 src 源码——mako 重新编译 CSS module 时会按文件名字母序排列，
    // 导致 UnstyledButton 的 reset 排在 Button 之后，覆盖 background: var(--button-bg)。
    // @xiaoye-react/hooks 无 CSS，保留指向 src 便于调试。
    alias: {
        '@xiaoye-react/ui': path.join(__dirname, '../../packages/ui/es/index.js'),
        '@xiaoye-react/hooks': path.join(__dirname, '../../packages/hooks/src/index.ts'),
        // @xiaoye-react/demo 包未发布，指向本地 DemoEngine（已导出 Demo/UIDemo/ConfiguratorControlOptions）
        '@xiaoye-react/demo': path.join(__dirname, '.dumi/theme/builtins/DemoEngine/index.ts'),
        // docgen 生成的 JSON 数据（仅保留有消费者的产物）
        '@docs/docgen': path.join(__dirname, '.docgen/docgen.json'),
        '@docs/css-exports': path.join(__dirname, '.docgen/css-exports.json'),
        // styles-api 数据
        '@xiaoye-react/docs-styles-api': path.join(__dirname, '../../packages/@xiaoye-react/docs-styles-api/src/index.ts'),
        // colors-generator
        '@xiaoye-react/colors-generator': path.join(__dirname, '../../packages/@xiaoye-react/colors-generator/src/index.ts'),
        // docs-demos
        '@xiaoye-react/docs-demos': path.join(__dirname, '../../packages/@xiaoye-react/docs-demos/src/index.ts'),
        // dev-icons / meta / modals
        '@xiaoye-react/dev-icons': path.join(__dirname, '../../packages/@xiaoye-react/dev-icons/src/index.ts'),
        '@xiaoye-react/meta': path.join(__dirname, '../../packages/@xiaoye-react/meta/src/index.ts'),
        '@xiaoye-react/modals': path.join(__dirname, '../../packages/@xiaoye-react/modals/src/index.ts'),
    },

    extraRehypePlugins: [rehypeDocs, rehypeChangelog],
    extraRemarkPlugins: [remarkMeta, remarkAnchor],

    metas: [{ name: 'theme-color', content: '#339AF0' }],

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
