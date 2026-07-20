# 文档站 antd → react-ui 迁移计划

> 目标：将 `apps/docs` 文档站从 Ant Design 生态全面迁移到 `packages/ui`（react-ui）组件库。
> 决策：全部彻底替换 antd（含 AI 主题生成器、主题编辑器的 react-ui 重写），图标统一使用 `react-icons`。

---

## 一、背景与目标

当前 `apps/docs` 是从 Ant Design 文档直接复制并填充 react-ui 组件内容而来，核心 UI 仍大量依赖 antd：

- 约 **120+ 文件** 依赖 antd 生态
- 约 **100 个文件** 直接 import `antd` 组件/工具
- 约 **84 处** 使用 `antd-style` / `@ant-design/cssinjs` / `@ant-design/fast-color`
- 约 **39 处** 使用 `@ant-design/icons`

迁移目标：

1. 文档站所有 UI 组件、布局、主题、样式均使用 `@react-ui/ui` + `@react-ui/hooks`。
2. 图标统一迁移到 `react-icons`。
3. 从 `package.json` 中彻底移除 `antd` 及相关生态依赖。
4. AI 主题生成器与主题编辑器用 react-ui 重写，不再依赖 `@ant-design/x` 和 `antd-token-previewer`。

---

## 二、决策结论

| 决策项 | 结论 |
| --- | --- |
| 是否彻底移除 antd | 是，包括主题编辑器、AI 主题抽屉 |
| 图标库 | 统一使用 `react-icons`（项目已依赖） |
| 样式方案 | 从 `antd-style` + CSS-in-JS 迁移到 react-ui `factory` + `CSS Modules` + `createVarsResolver` |
| 主题方案 | 从 `ConfigProvider` + `theme` 迁移到 `UIProvider` + `useUITheme` + `data-ui-color-scheme` |
| 布局方案 | 从 antd `Layout`/`Row`/`Col` 迁移到 `AppShell`/`Grid`/`SimpleGrid`/`Stack`/`Group`/`Flex` |
| 导航方案 | 从 antd `Menu`/`Anchor` 迁移到自定义 `DocsMenu`（基于 `NavLink`/`Accordion`/`Tree`）和 `DocsAnchor` |
| 消息反馈 | 从 antd `App.useApp` 迁移到 `Notifications.show` / `notifications` store |

---

## 三、依赖移除清单

迁移完成后，以下依赖应从 `apps/docs/package.json` 中移除：

```text
antd
@ant-design/compatible
@ant-design/cssinjs
@ant-design/fast-color
@ant-design/happy-work-theme
@ant-design/icons
@ant-design/x
@ant-design/x-sdk
antd-style
antd-token-previewer
rc-footer
```

可保留的第三方依赖（与 antd 无关）：

```text
@codesandbox/sandpack-react
@dnd-kit/*
@emotion/react
@emotion/server
@microflash/rehype-figure
@prettier/sync
@rc-component/util
@stackblitz/sdk
clsx
dayjs
fs-extra
lodash
mermaid
motion
nprogress
prettier
prismjs
react-icons
react-sticky-box
scroll-into-view-if-needed
swr
throttle-debounce
vanilla-jsoneditor
```

---

## 四、组件映射表

### 4.1 可直接替换

| antd | react-ui | 备注 |
| --- | --- | --- |
| `Button` | `Button` / `ActionIcon` / `UnstyledButton` | 按场景选择 |
| `Typography.Text` | `Text` | - |
| `Typography.Title` | `Title` | - |
| `Typography.Link` | `Anchor` | - |
| `Typography.Paragraph` | `Text` | - |
| `Space` | `Stack` / `Group` / `Flex` | 垂直/水平/灵活布局 |
| `Flex` | `Flex` / `Group` | - |
| `Row` / `Col` | `Grid` / `SimpleGrid` | 响应式网格 |
| `Card` | `Card` / `Paper` | - |
| `Tag` | `Badge` / `Pill` | - |
| `Badge` | `Badge` / `Indicator` | - |
| `Avatar` | `Avatar` | - |
| `Divider` | `Divider` | - |
| `Tabs` | `Tabs` | - |
| `Table` | `Table` | 支持 `data`、`striped`、`highlightOnHover` |
| `Tooltip` | `Tooltip` | - |
| `Popover` | `Popover` / `HoverCard` | - |
| `Modal` | `Modal` / `Dialog` | - |
| `Drawer` | `Drawer` | - |
| `Alert` | `Alert` / `Notification` | - |
| `Skeleton` | `Skeleton` | - |
| `Spin` | `Loader` / `LoadingOverlay` | - |
| `Input` | `Input` / `TextInput` | - |
| `Textarea` | `Textarea` | - |
| `Select` | `Select` / `NativeSelect` / `MultiSelect` | - |
| `Segmented` | `SegmentedControl` | - |
| `Checkbox` | `Checkbox` | - |
| `Radio` | `Radio` | - |
| `Switch` | `Switch` | - |
| `Slider` | `Slider` / `RangeSlider` | - |
| `Progress` | `Progress` / `RingProgress` | - |
| `Pagination` | `Pagination` | - |
| `Steps` | `Stepper` | - |
| `Timeline` | `Timeline` | - |
| `Image` | `Image` | - |
| `Affix` | `Affix` | - |
| `Breadcrumb` | `Breadcrumbs` | - |
| `Layout` | `AppShell` | Header/Navbar/Aside/Footer/Main |
| `Empty` | `EmptyState` | - |
| `App.useApp().message` | `Notifications.show` | 命令式通知 |
| `App.useApp().notification` | `Notifications.show` | 命令式通知 |

### 4.2 需要组合/自定义

| antd | react-ui 替代方案 | 工作量 |
| --- | --- | --- |
| `Menu`（内联导航） | 自定义 `DocsMenu`（`NavLink` + `Accordion` + `ScrollArea`） | 中 |
| `Anchor`（文章锚点） | 自定义 `DocsAnchor`（`use-scroll-spy` + `Anchor` 样式） | 中 |
| `FloatButton` / `BackTop` | 自定义 `BackToTop` 按钮 | 低 |
| `Result` | 自定义 `Result` 组件 | 低 |
| `Descriptions` | 使用 `DataList` 或自定义 | 低 |
| `@ant-design/icons` | `react-icons` / 本地 SVG | 中 |
| `ConfigProvider` + `theme` | `UIProvider` + `useUITheme` + `createTheme` | 高 |
| `antd-style` CSS-in-JS | react-ui `factory` + CSS Modules + `createVarsResolver` | 高 |

### 4.3 需要重写的功能模块

| 功能 | 当前实现 | 重写方案 |
| --- | --- | --- |
| AI 主题生成器 | `@ant-design/x` Bubble/Prompts/Sender/Welcome | 用 `Drawer` + `ScrollArea` + 自定义消息列表 + `Textarea`/`Button` 实现 |
| 主题编辑器 | `antd-token-previewer` ThemeEditor | 用 `ColorInput`/`ColorPicker`/`Slider`/`Tabs` + 主题 JSON 编辑器实现 |
| 图标搜索 | `@ant-design/icons` 元数据 + 搜索 | 简化为 `react-icons` 搜索，或移除该页面 |
| 页脚 | `rc-footer` | 用 `AppShellFooter` + `Grid` + `Anchor` 自定义 |

---

## 五、分阶段任务清单

### 阶段 0：基础设施与 POC

- [ ] 选定 POC 范围（建议：404 页面 或 Footer 组件）
- [ ] 创建 react-ui 文档站主题配置 `theme.ts`
- [ ] 验证 `UIProvider` 在 dumi 2 + mako 下的 SSR/CSR 行为
- [ ] 完成 POC 文件迁移并验证构建
- [ ] 输出 POC 复盘与样式规范

### 阶段 1：全局主题与布局迁移

- [ ] 重写 `GlobalLayout.tsx`：移除 `ConfigProvider`/`StyleProvider`/`HappyProvider`，接入 `UIProvider`
- [ ] 重写/移除 `SiteThemeProvider.tsx`
- [ ] 更新 `SiteContext.ts` 中的主题相关类型
- [ ] 用 `AppShell` 替换 antd `Layout`（`DocLayout`、`SidebarLayout`、`ResourceLayout`）
- [ ] 将 `data-prefers-color` 同步改为 `data-ui-color-scheme`
- [ ] 建立文档站级 CSS 变量文件 `global.css`

### 阶段 2：布局槽位迁移

- [ ] `Header`：替换 antd `Alert`/`Button`/`Select`/`Tooltip`/`Popover`/`Row`/`Col`
- [ ] `Navigation`：替换 antd `Menu`/`ConfigProvider`
- [ ] `Sidebar`：用 `DocsMenu` 替换 antd `Menu`
- [ ] `Content`：用 `Grid`/`Stack`/`Group`/`Title` 替换 `Col`/`Flex`/`Space`/`Typography`
- [ ] `DocAnchor`：用 `use-scroll-spy` 重写
- [ ] `Footer`：移除 `rc-footer`，用 `AppShellFooter` + `Grid` 自定义
- [ ] `ContentTabs`：替换 antd `Tabs`

### 阶段 3：common 与 builtins 迁移

- [ ] `common/styles/*`：将 `antd-style` 的 `createStyles`/`useTheme` 改为 react-ui 方式
- [ ] `common/Loading.tsx`、`EditButton.tsx`、`LinkButton.tsx`、`PrevAndNext.tsx` 等
- [ ] `builtins/Badge`、`builtins/Info`、`builtins/DataTable`、`builtins/KeyboardEventsTable`、`builtins/ComponentMeta`、`builtins/ComponentTokenTable`、`builtins/CssVariablesGroup`、`builtins/TokenTable`、`builtins/TemplatesList`、`builtins/PackagesInstallation` 等
- [ ] `builtins/Previewer/Actions.tsx`、`CodePreviewer.tsx`、`DesignPreviewer.tsx`、`DemoFallback.tsx`
- [ ] `builtins/DemoEngine/CodeDemo.tsx`、`StylesApiDemo.tsx`、`ConfiguratorDemo.tsx`
- [ ] `builtins/IconSearch`：整体重写或移除

### 阶段 4：页面级迁移

- [ ] `pages/index/*`：首页各 Section 完全 react-ui 化
- [ ] `pages/404/index.tsx`：替换 `Result`/`Button`/图标
- [ ] `pages/theme-editor/index.tsx`：用 react-ui 重写主题编辑器
- [ ] `theme/common/ThemeSwitch/PromptDrawer.tsx`：用 react-ui 重写 AI 主题抽屉

### 阶段 5：图标与依赖清理

- [ ] 批量替换 `@ant-design/icons` 为 `react-icons`
- [ ] 删除自定义图标文件中对 `@ant-design/icons` Icon 组件的依赖
- [ ] 从 `package.json` 移除 antd 生态依赖
- [ ] 删除 `rc-footer`
- [ ] 更新 `pnpm-lock.yaml`
- [ ] 全局搜索确保无残留 `from 'antd'` / `from '@ant-design/*'` / `from 'antd-style'`

### 阶段 6：验证与收尾

- [ ] `pnpm install` 通过
- [ ] `pnpm build` 通过
- [ ] `pnpm dev` 启动正常
- [ ] 首页、组件列表页、组件详情页、hooks 列表页、hooks 详情页、404、主题编辑器渲染正常
- [ ] 暗色/亮色切换正常
- [ ] 移动端 Sidebar 正常
- [ ] 搜索、代码复制、Demo 展开折叠正常

---

## 六、文件级待改清单

> 按模块分组，实际执行时以 POC 验证后的结论为准。

### 6.1 全局主题/布局

- `apps/docs/.dumi/theme/layouts/GlobalLayout.tsx`
- `apps/docs/.dumi/theme/SiteThemeProvider.tsx`
- `apps/docs/.dumi/theme/slots/SiteContext.ts`
- `apps/docs/.dumi/theme/layouts/DocLayout/index.tsx`
- `apps/docs/.dumi/theme/layouts/SidebarLayout/index.tsx`
- `apps/docs/.dumi/theme/layouts/ResourceLayout/index.tsx`
- `apps/docs/.dumi/theme/layouts/ResourceLayout/AffixTabs.tsx`

### 6.2 布局槽位

- `apps/docs/.dumi/theme/slots/Header/index.tsx`
- `apps/docs/.dumi/theme/slots/Header/Navigation.tsx`
- `apps/docs/.dumi/theme/slots/Header/Logo.tsx`
- `apps/docs/.dumi/theme/slots/Header/SwitchBtn.tsx`
- `apps/docs/.dumi/theme/slots/Header/SponsorCard.tsx`
- `apps/docs/.dumi/theme/slots/Header/SponsorsNav.tsx`
- `apps/docs/.dumi/theme/slots/Sidebar/index.tsx`
- `apps/docs/.dumi/theme/slots/Content/index.tsx`
- `apps/docs/.dumi/theme/slots/Content/DocAnchor.tsx`
- `apps/docs/.dumi/theme/slots/Content/DocMeta.tsx`
- `apps/docs/.dumi/theme/slots/Content/Contributors.tsx`
- `apps/docs/.dumi/theme/slots/Content/ContributorAvatar.tsx`
- `apps/docs/.dumi/theme/slots/ContentTabs/index.tsx`
- `apps/docs/.dumi/theme/slots/Footer/index.tsx`
- `apps/docs/.dumi/theme/slots/Footer/AdditionalInfo.tsx`
- `apps/docs/.dumi/theme/slots/LiveError/index.tsx`

### 6.3 common

- `apps/docs/.dumi/theme/common/Loading.tsx`
- `apps/docs/.dumi/theme/common/EditButton.tsx`
- `apps/docs/.dumi/theme/common/LinkButton.tsx`
- `apps/docs/.dumi/theme/common/PrevAndNext.tsx`
- `apps/docs/.dumi/theme/common/Marker.tsx`
- `apps/docs/.dumi/theme/common/SemanticPreview.tsx`
- `apps/docs/.dumi/theme/common/SelectSemanticTemplate.tsx`
- `apps/docs/.dumi/theme/common/TreeSelectSemanticTemplate.tsx`
- `apps/docs/.dumi/theme/common/CodePreview.tsx`
- `apps/docs/.dumi/theme/common/LiveCode.tsx`
- `apps/docs/.dumi/theme/common/BrowserFrame.tsx`
- `apps/docs/.dumi/theme/common/ComponentChangelog/ComponentChangelog.tsx`
- `apps/docs/.dumi/theme/common/BehaviorMap/*`
- `apps/docs/.dumi/theme/common/BezierVisualizer/*`
- `apps/docs/.dumi/theme/common/ThemeSwitch/*`
- `apps/docs/.dumi/theme/common/styles/*`

### 6.4 builtins

- `apps/docs/.dumi/theme/builtins/Antd.tsx`
- `apps/docs/.dumi/theme/builtins/Badge/index.tsx`
- `apps/docs/.dumi/theme/builtins/ColorChunk/index.tsx`
- `apps/docs/.dumi/theme/builtins/ComponentMeta/index.tsx`
- `apps/docs/.dumi/theme/builtins/ComponentOverview/index.tsx`
- `apps/docs/.dumi/theme/builtins/ComponentTokenTable/index.tsx`
- `apps/docs/.dumi/theme/builtins/Container/*`
- `apps/docs/.dumi/theme/builtins/CssVariablesGroup/index.tsx`
- `apps/docs/.dumi/theme/builtins/DataTable/index.tsx`
- `apps/docs/.dumi/theme/builtins/DemoEngine/*`
- `apps/docs/.dumi/theme/builtins/DemoWrapper/index.tsx`
- `apps/docs/.dumi/theme/builtins/ExamplesButton/index.tsx`
- `apps/docs/.dumi/theme/builtins/FlexWithImagePreview/index.tsx`
- `apps/docs/.dumi/theme/builtins/IconSearch/*`
- `apps/docs/.dumi/theme/builtins/ImagePreview/index.tsx`
- `apps/docs/.dumi/theme/builtins/Info/index.tsx`
- `apps/docs/.dumi/theme/builtins/InlinePopover/index.tsx`
- `apps/docs/.dumi/theme/builtins/InstallDependencies/*`
- `apps/docs/.dumi/theme/builtins/InstallScript/index.tsx`
- `apps/docs/.dumi/theme/builtins/KeyboardEventsTable/index.tsx`
- `apps/docs/.dumi/theme/builtins/LlmButton/index.tsx`
- `apps/docs/.dumi/theme/builtins/MdxShared/base.tsx`
- `apps/docs/.dumi/theme/builtins/NpmScript/index.tsx`
- `apps/docs/.dumi/theme/builtins/PackagesInstallation/index.tsx`
- `apps/docs/.dumi/theme/builtins/Previewer/*`
- `apps/docs/.dumi/theme/builtins/RefinedChangelog/index.tsx`
- `apps/docs/.dumi/theme/builtins/ResourceArticles/index.tsx`
- `apps/docs/.dumi/theme/builtins/ResourceCards/index.tsx`
- `apps/docs/.dumi/theme/builtins/Sandpack/index.tsx`
- `apps/docs/.dumi/theme/builtins/SponsorButton/index.tsx`
- `apps/docs/.dumi/theme/builtins/TemplatesList/index.tsx`
- `apps/docs/.dumi/theme/builtins/TokenCompare/index.tsx`
- `apps/docs/.dumi/theme/builtins/TokenTable/index.tsx`
- `apps/docs/.dumi/theme/builtins/VideoPlayer/index.tsx`
- `apps/docs/.dumi/theme/builtins/Audio/index.tsx`

### 6.5 页面

- `apps/docs/.dumi/pages/index/index.tsx`
- `apps/docs/.dumi/pages/index/components/*`
- `apps/docs/.dumi/pages/404/index.tsx`
- `apps/docs/.dumi/pages/theme-editor/index.tsx`

### 6.6 hooks / plugins

- `apps/docs/.dumi/hooks/useMenu.tsx`
- `apps/docs/.dumi/hooks/useThemeAnimation.ts`
- `apps/docs/.dumi/theme/plugins/build-assets.ts`
- `apps/docs/.dumi/theme/plugins/routes.ts`

### 6.7 icons

- `apps/docs/.dumi/theme/icons/*`

---

## 七、POC 计划

### 7.1 POC 目标

1. 验证 `UIProvider` 在 dumi 2 + mako 环境下能否正常提供主题。
2. 验证 react-ui 组件替换 antd 组件后，页面能正常构建和渲染。
3. 验证 `react-icons` 替换 `@ant-design/icons` 的可行性。
4. 输出一套可复用的替换范式（组件、样式、图标）。

### 7.2 建议 POC 范围（待用户确认）

| 候选 | 优点 | 缺点 |
| --- | --- | --- |
| **404 页面** | 只涉及 `Button`/`Result`/图标，简单快速 | 覆盖场景少 |
| **Footer 组件** | 涉及布局、链接、图标、样式，有一定代表性 | 依赖 `rc-footer`，需自定义 |
| **首页 HeroSection** | 视觉核心，验证 react-ui 主题和按钮效果 | 已在部分使用 react-ui，边界不够 |

**推荐：Footer 组件**，因为它同时覆盖布局、图标替换、`rc-footer` 移除、样式迁移，难度适中且代表性足够。

### 7.3 POC 验收标准

- [ ] 该页面/组件不再 import `antd`、`@ant-design/*`、`antd-style`。
- [ ] 使用 `react-icons` 替换所有 antd 图标。
- [ ] 样式使用 react-ui 的 `factory` + CSS Modules 或内联 `sx`/`style` 实现。
- [ ] `pnpm build` 不因此文件报错。
- [ ] 页面在 dev 模式下视觉基本正常（允许微调）。

---

## 八、风险与注意事项

1. **主题体系不兼容**：antd 的 `theme` token 与 react-ui 的 `UITheme` 结构完全不同，必须重新设计文档站主题 token，不要尝试桥接。
2. **导航菜单缺失**：react-ui 没有现成内联导航 Menu，需要投入时间封装 `DocsMenu`。
3. **图标替换遗漏**：`@ant-design/icons` 图标众多，建议写脚本批量替换 + 人工兜底。
4. **IconSearch 功能**：该页面依赖大量 antd 图标元数据，建议简化或移除。
5. **AI 主题抽屉重写**：需自行实现聊天 UI，工作量较大，但可复用首页已有的 `ThemePreview/themeCodeUtils.ts`。
6. **主题编辑器重写**：需要设计一套基于 react-ui 的主题配置 UI，是迁移中工作量最大的单一页面之一。
7. **SSR 风险**：`UIProvider` 需要在服务端正确设置 `data-ui-color-scheme`，避免水合不一致。

---

## 九、参考文件

- react-ui 组件入口：`packages/ui/src/components/index.ts`
- react-ui 核心入口：`packages/ui/src/core/index.ts`
- react-ui Provider：`packages/ui/src/core/UIProvider/UIProvider.tsx`
- react-ui hooks：`packages/hooks/src/index.ts`
- 当前文档站 antd 使用：`apps/docs/.dumi/theme/*`、`apps/docs/.dumi/pages/*`
- 项目约束记忆：`/Users/zhangzhengyang/.trae-cn/memory/projects/-Users-zhangzhengyang-Desktop-Code-react-UI-react-ui/project_memory.md`
