import path from 'node:path';
import fs from 'node:fs';
import { defineConfig } from 'dumi';

import rehypeDocs from './.dumi/rehypeDocs';
import rehypeChangelog from './.dumi/rehypeChangelog';
import remarkAnchor from './.dumi/remarkAnchor';
import remarkMeta from './.dumi/remarkMeta';

// react-router 的 matchPath 每次调用都重新编译路由正则；本站路由表数千条 +
// 异步 chunk 加载引发的高频重渲染，实测单次切页约 90 万次正则编译，是切页
// 卡顿的主要来源。alias 到带缓存的补丁实现（apps/docs/patches/react-router-cache.ts）。
// 注意：pnpm 下存在多份 react-router；bundle 里实际打包的是 renderer 依赖
// react-router-dom@6.3.0 邻居目录中的 react-router@6.3.0，补丁的全量 re-export
// 必须指向这一份，不能用顶层 node_modules 的 7.x 副本。
const rendererEntry = require.resolve('@umijs/renderer-react', { paths: [__dirname] });
const reactRouterDomEntry = require.resolve('react-router-dom', {
    paths: [path.dirname(rendererEntry)],
});
const reactRouterActual = require.resolve('react-router/index.js', {
    paths: [path.dirname(reactRouterDomEntry)],
});

export default defineConfig({
    plugins: ['dumi-plugin-color-chunk'],

    // 路由与产物
    hash: true,
    mfsu: false,
    // ⚠️ 2026-09-16 回退 webpack：mako 0.11.x 的 chunk 图存在两类致命问题——
    //  1) md 页面被拆成 texts 元模块 + 内容模块两个虚拟模块，部分页面的路由 import()
    //     被错接到无 default 的 texts 模块，路由内容永不挂载（week-view 等 schedule 页
    //     稳定复现，其余页面随机）；
    //  2) demo 资产异步就位后 React 的 Suspense 重试偶发不被调度，demo 骨架停留 20s+。
    // 应用层手段（dumi DumiDemo 去 memo 补丁、Content 插槽 nudge）只能缓解 2)，无法解决 1)。
    // webpack 冷构建约 20 分钟，但产物正确。根治需迁移 rspress 等新一代框架（见 ROADMAP）。
    // mako: {},
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
        // matchPath 正则编译缓存补丁：'react-router$' 为精确匹配（$ 后缀），
        // 只拦截裸 'react-router' 导入（react-router-dom/内部实现走这里），
        // 不影响 'react-router-dom' 等其它子路径。
        'react-router$': path.join(__dirname, 'patches/react-router-cache.ts'),
        // 补丁内部 re-export 的真实 react-router 实现（配置期解析出的具体文件）
        'react-router-actual$': reactRouterActual,
        '@xiaoye-react/ui': path.join(__dirname, '../../packages/ui/es/index.js'),
        '@xiaoye-react/hooks': path.join(__dirname, '../../packages/hooks/src/index.ts'),
        // 同上：pro 默认会经 node_modules 解析到 es/index.js，干净克隆里没有那份产物
        '@xiaoye-react/pro': path.join(__dirname, '../../packages/@xiaoye-react/pro/src/index.ts'),
        // @xiaoye-react/demo 包未发布，指向本地 DemoEngine（已导出 Demo/UIDemo/ConfiguratorControlOptions）
        '@xiaoye-react/demo': path.join(__dirname, '.dumi/theme/builtins/DemoEngine/index.ts'),
        // docgen 生成的 JSON 数据（仅保留有消费者的产物）
        '@docs/docgen': path.join(__dirname, '.docgen/docgen.json'),
        '@docs/css-exports': path.join(__dirname, '.docgen/css-exports.json'),
        // styles-api 数据
        '@xiaoye-react/docs-styles-api': path.join(__dirname, '../../packages/@xiaoye-react/docs-styles-api/src/index.ts'),
        // dev-icons / meta
        '@xiaoye-react/dev-icons': path.join(__dirname, '../../packages/@xiaoye-react/dev-icons/src/index.ts'),
        '@xiaoye-react/meta': path.join(__dirname, '../../packages/@xiaoye-react/meta/src/index.ts'),
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
        // Umami 访问统计（自托管 https://analytics.zhangzhengyang.com，网站条目 react-ui）
        {
            defer: true,
            src: 'https://analytics.zhangzhengyang.com/script.js',
            'data-website-id': 'abbb420d-20d7-440d-b882-b43ba8be1228',
        },
    ],
});
