# 移除 Turbo 并全面迁移到 Vite 实施方案

## Context

当前 `react-ui` 是一个基于 pnpm workspace + Turbo 的 React 组件库 monorepo。各 workspace 的构建工具已经大部分迁移到 Vite：

-   `packages/ui`、`packages/hooks`：已使用 `vite.config.ts`，`dev/build` 脚本为 `vite build --watch` / `vite build`
-   `apps/docs`、`apps/playground`：已使用 Vite 应用配置
-   只有根目录仍通过 `turbo run dev/build/release` 编排任务，并依赖 `turbo@2.0.5`
-   `apps/website` 当前使用 dumi 作为文档站点

用户要求：

1. 去除整个项目的 Turbo 模块
2. 改为以 Vite 为核心
3. `apps/website` 一并从 dumi 迁移，参考 Element Plus 文档站点风格
4. 保留空的 `packages/core` 目录
5. 接受放弃 Turbo 的跨包增量缓存

由于 Element Plus 文档站点基于 VitePress（Vue 生态），无法直接用于 React 项目，因此选用 React 生态中体验最接近的 **Nextra（Next.js + MDX）** 作为 `apps/website` 的新文档方案。

## 目标架构

-   **编排层**：仅使用 pnpm workspace 原生能力，不再使用 Turbo
-   **构建层**：全部使用 Vite（组件库）或基于 Vite 的技术栈
-   **文档站**：`apps/website` 从 dumi 迁移到 Nextra 4 + Next.js 15 + React 19
-   **缓存**：放弃 Turbo 跨包缓存，依赖 Vite 自身 transform 缓存；CI 中缓存 `node_modules` 与 pnpm store

## 依赖拓扑

```
@react-ui/hooks
    ↓
@react-ui/ui
    ↓
apps/docs, apps/playground, apps/website, apps/demos
```

`pnpm -r build` 会按照 workspace 依赖拓扑顺序执行，天然替代 Turbo 的 `dependsOn: ["^build"]`。

## 文件变更清单

### 删除

| 文件/目录                                                                      | 说明                                        |
| ------------------------------------------------------------------------------ | ------------------------------------------- |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/turbo.json`              | Turbo 任务配置                              |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/.turbo/`                 | Turbo 本地缓存目录                          |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/.dumirc.ts` | dumi 配置                                   |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/docs/`      | dumi 文档源（内容迁移到 Nextra 结构后删除） |

### 修改

| 文件                                                                               | 变更内容                                                                                                                   |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/package.json`                | 移除 `turbo` 依赖；scripts 改为 `pnpm -r ...` / `pnpm --filter ...`                                                        |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/.gitignore`                  | 删除 `.turbo` 行；新增 Next.js/Nextra 产物忽略（`.next`、`out`）                                                           |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/ui/package.json`    | `release` 脚本改为 `npm publish`（避免 root release 重复构建）；将 `@react-ui/hooks` 加入 `devDependencies` 以稳定拓扑排序 |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/hooks/package.json` | 新增 `release: npm publish` 脚本                                                                                           |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/package.json`   | 替换 dumi 依赖为 `next`、`nextra`、`nextra-theme-docs`、`react`、`react-dom` 等                                            |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/tsconfig.json`  | 改为 Next.js + Nextra 兼容配置                                                                                             |

### 新增（apps/website 迁移到 Nextra）

| 文件                                                                                                 | 说明                                                        |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/next.config.js`                   | Next.js 配置，启用 static export，配置 `@react-ui/ui` alias |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/theme.config.tsx`                 | Nextra 主题配置（logo、标题、导航、footer 等）              |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/_app.mdx` 或 `_app.tsx`     | Nextra 应用包裹层，可注入全局样式/Provider                  |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/_meta.json`                 | 根级导航配置                                                |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/index.mdx`                  | 首页（迁移自 `docs/index.md` + `docs/index.tsx`）           |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/components/_meta.json`      | 组件文档分组配置                                            |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/components/button.mdx`      | Button 组件文档                                             |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/pages/components/scroll-area.mdx` | ScrollArea 组件文档                                         |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/components/Demo.tsx`              | 代码示例容器组件：渲染 Demo + 源码展示                      |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/components/ApiTable.tsx`          | 组件 API 表格组件                                           |
| `/Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/demos/ScrollArea.tsx`                     | 补充 website 中引用但实际不存在的 ScrollArea demo           |

## 根 package.json Scripts 新设计

```json
{
    "scripts": {
        "dev": "pnpm -r --parallel dev",
        "dev:packages": "pnpm --filter './packages/**' --parallel dev",
        "dev:apps": "pnpm --filter './apps/**' --parallel dev",

        "build": "pnpm -r build",
        "build:packages": "pnpm --filter './packages/**' build",
        "build:apps": "pnpm --filter './apps/**' build",

        "test": "pnpm -r test",
        "test:packages": "pnpm --filter './packages/**' test",

        "release": "pnpm build:packages && pnpm --filter './packages/**' release",

        "lint:es": "eslint \"{packages,apps}/**/*.{js,jsx,ts,tsx}\"",
        "lint:style": "stylelint \"{packages,apps}/**/*.{css,ts}\"",
        "lint": "npm run lint:es && npm run lint:style",
        "spellcheck": "cspell lint --dot --gitignore --color --cache --show-suggestions \"(packages|apps)/**/*.@(html|js|cjs|mjs|ts|tsx|css|scss|md)\"",
        "prepare": "husky",
        "commit": "git-cz"
    }
}
```

说明：

-   `pnpm -r build`：按依赖拓扑顺序构建所有 workspace，替代 Turbo 的 `dependsOn: ["^build"]`
-   `pnpm -r --parallel dev`：并发启动所有 workspace 的 dev 脚本
-   `pnpm --filter './packages/**' release`：按拓扑顺序执行 packages 的 release 脚本
-   `apps/website` 的 `dev` 脚本在 Nextra 下为 `next dev`，`build` 为 `next build`

## apps/website Nextra 迁移详细设计

### 技术选型

-   **Nextra 4**：支持 Next.js 15 + React 19，基于 App Router
-   **nextra-theme-docs**：官方文档主题，接近 Element Plus/VitePress 的文档体验
-   **MDX**：组件文档页面使用 MDX，可直接 import React demo 组件
-   **Demo 组件**：自定义 `Demo.tsx`，实现代码示例渲染 + 源码展示
-   **ApiTable 组件**：初期手动维护，后续可扩展为从 TypeScript 类型自动生成

### 页面结构

```
apps/website/
├── next.config.js
├── package.json
├── theme.config.tsx
├── tsconfig.json
├── components/
│   ├── Demo.tsx
│   └── ApiTable.tsx
├── pages/
│   ├── _app.mdx
│   ├── _meta.json
│   ├── index.mdx
│   └── components/
│       ├── _meta.json
│       ├── button.mdx
│       └── scroll-area.mdx
└── public/
    └── logo.png
```

### 关键实现点

1. **首页迁移**

    - 将 `docs/index.md` 的 hero front matter 转换为 Nextra 首页 front matter
    - 将 `docs/index.tsx` 的 Features/Highlighter 内容改写为 MDX 中的 React 组件，或简化为 Nextra 默认 hero + 特性列表
    - 保留品牌标题 "小叶科技 | @react-ui/ui"、主题色偏好（暗色）

2. **组件文档页迁移**

    - 将 dumi 的 `nav/group/order` front matter 转换为 Nextra 的 `_meta.json` 导航配置
    - 将 `<code src="...">` 替换为直接 `import Demo from '...'` 并在 MDX 中使用 `<Demo />`
    - 将 `<API id="...">` 替换为 `<ApiTable component="..." />`，表格数据从 packages/ui 源码中整理

3. **Demo 组件设计**

    - 接收 `src` 属性或 children
    - 渲染 Demo 组件
    - 展示对应源码（可通过 `?raw` import 或运行时读取文件）

4. **ApiTable 组件设计**

    - 接收 `component` 名称
    - 展示 Props 表格（属性、类型、默认值、说明）
    - 初期手动维护数据对象，保持与源码一致

5. **Next.js 配置**

    - `output: 'export'`：生成静态站点
    - `distDir: 'docs-dist'`：保持与 dumi 一致的输出目录
    - 配置 alias：`@react-ui/ui` → `../../packages/ui/src/index.ts`，开发时支持 HMR

6. **依赖处理**
    - 移除：`dumi`、`dumi-theme-lobehub`
    - 新增：`next`、`nextra`、`nextra-theme-docs`、`@types/node`
    - 可选保留：`@lobehub/ui`、`antd-style`、`react-layout-kit`、`lucide-react`（仅用于首页复杂布局）
    - 建议：首页简化后移除 `@lobehub/ui` 等重型依赖，减少维护成本

## 实施步骤

### 阶段一：移除 Turbo

1. 修改根 `package.json`：
    - 移除 `turbo` devDependency
    - 将 `dev/build/release` scripts 改为 `pnpm -r ...` / `pnpm --filter ...`
2. 删除 `turbo.json`
3. 删除 `.turbo/` 目录
4. 修改 `.gitignore`：删除 `.turbo` 行
5. 修改 `packages/ui/package.json`：
    - `release` 改为 `npm publish`
    - 将 `@react-ui/hooks` 加入 `devDependencies`
6. 修改 `packages/hooks/package.json`：新增 `release: npm publish`
7. 执行 `pnpm install` 更新 lockfile
8. 验证：`pnpm build:packages`、`pnpm build` 能按拓扑顺序成功执行

### 阶段二：迁移 apps/website 到 Nextra

1. 备份并删除 dumi 相关文件：
    - 删除 `apps/website/.dumirc.ts`
    - 迁移 `docs/index.md`、`docs/index.tsx`、`docs/components/*.md` 内容到新结构
    - 删除 `apps/website/docs/` 目录
2. 创建 Next.js + Nextra 基础文件：
    - `next.config.js`
    - `theme.config.tsx`
    - `tsconfig.json`
    - `pages/_app.mdx`
    - `pages/_meta.json`
    - `pages/index.mdx`
    - `pages/components/_meta.json`
3. 创建/迁移组件文档：
    - `pages/components/button.mdx`
    - `pages/components/scroll-area.mdx`
4. 创建通用组件：
    - `components/Demo.tsx`
    - `components/ApiTable.tsx`
5. 补充缺失 demo：
    - 创建 `apps/demos/ScrollArea.tsx`
6. 修改 `apps/website/package.json`：
    - 替换 dumi 相关依赖为 next/nextra
    - 脚本改为 `dev: next dev`、`build: next build`、`start: next start`
7. 执行 `pnpm install`
8. 验证：`pnpm dev` 能启动 website，`pnpm build` 能导出静态站点到 `docs-dist`

### 阶段三：全局验证

1. 清理所有产物：
    ```bash
    rm -rf .turbo packages/*/es apps/website/docs-dist apps/website/.next
    ```
2. 全量构建：
    ```bash
    pnpm build
    ```
3. 运行测试：
    ```bash
    pnpm test
    ```
4. 开发模式验证：
    ```bash
    pnpm dev
    ```
5. 检查 lockfile 中无 `turbo` 条目
6. 检查 git status，确认删除/新增文件符合预期

## 验证步骤

| 步骤          | 命令                                                                              | 期望结果                                              |
| ------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------- |
| 安装依赖      | `pnpm install`                                                                    | 成功，lockfile 中无 turbo                             |
| 构建 packages | `pnpm build:packages`                                                             | 先 hooks 后 ui，生成 `packages/*/es/`                 |
| 全量构建      | `pnpm build`                                                                      | 所有 workspace（含 website）构建成功                  |
| 运行测试      | `pnpm test`                                                                       | `packages/ui` vitest 通过                             |
| 开发模式      | `pnpm dev`                                                                        | packages watch、apps dev server（含 website）并发启动 |
| website 开发  | `pnpm --filter website dev`                                                       | Nextra 站点在默认端口启动，首页/组件页可访问          |
| website 构建  | `pnpm --filter website build`                                                     | 静态站点导出到 `apps/website/docs-dist`               |
| 发布 dry-run  | `pnpm build:packages && pnpm --filter './packages/**' exec npm publish --dry-run` | hooks 先于 ui 发布                                    |

## 风险点与注意事项

1. **Nextra 与 React 19 / Next.js 15 兼容性**：优先使用 Nextra 4，如遇兼容问题可降级到 Nextra 3 + Next.js 14
2. **website 首页依赖重型 UI 库**：`@lobehub/ui`、`antd-style`、`react-layout-kit` 可能增加构建体积和 SSR 兼容风险，建议首页简化后逐步移除
3. **ScrollArea demo 缺失**：`scroll-area.md` 引用了不存在的 `demos/ScrollArea.tsx`，迁移时需补充
4. **API 表格维护成本**：初期手动维护，组件 API 变更时需同步更新；后续可考虑基于 `ts-morph` 或 `react-docgen-typescript` 自动生成
5. **并发输出混杂**：`pnpm -r --parallel dev` 同时输出多个进程日志，可接受或后续引入 `concurrently` 优化
6. **无 Turbo 缓存**：每次 `pnpm build` 都会全量构建，项目当前规模下应可接受
7. **packages/core 保留**：按用户要求保留，但不参与任何脚本
8. **apps/demos 无 scripts**：`pnpm -r dev/build` 会自动跳过没有对应脚本的 workspace
9. **Provider 与 theme**：Nextra 默认主题为亮色，需在 `theme.config.tsx` 中配置暗色为默认主题，与 dumi 配置保持一致
10. **MDX 中 import 路径**：demo 文件路径需与 Nextra 页面位置正确相对，或配置 webpack/Next.js alias

## 总结

本方案的核心是：

-   用 `pnpm -r` 原生递归能力替代 Turbo 的任务编排
-   用 Vite 作为组件库和应用的统一构建工具
-   用 Nextra 替代 dumi，打造类 Element Plus/VitePress 体验的 React 文档站点

迁移后项目结构更精简，脚本语义清晰，文档站基于 React 生态主流方案，长期可维护性更强。
