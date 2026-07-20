# Website 剩余功能迁移计划（apps/website → apps/docs）

> 本计划聚焦于 `apps/website` 中尚未迁移到 `apps/docs` 的核心功能模块。
> 与 `MIGRATION-PLAN.md`（已完成的整体内容迁移）不同，本计划专注于功能性迁移。

---

## 目录

- [阶段 1：API 表格系统（P0）](#阶段-1api-表格系统p0)
- [阶段 2：Colors Generator 工具页（P1）](#阶段-2colors-generator-工具页p1)
- [阶段 3：首页 Sections 增强（P1）](#阶段-3首页-sections-增强p1)
- [阶段 4：综合演示页（P2）](#阶段-4综合演示页p2)
- [阶段 5：Mdx 辅助组件补全（P3）](#阶段-5mdx-辅助组件补全p3)
- [阶段 6：辅助功能组件（P4）](#阶段-6辅助功能组件p4)
- [附录：依赖与构建配置](#附录依赖与构建配置)

---

## 阶段 1：API 表格系统（P0）

### 1.1 目标

将 website 的「PropsTable + StylesApiTable + 5 个生成脚本」整套体系迁移到 docs，让所有组件文档页的 API 表格从「占位符」变为「自动生成的真实数据」。

### 1.2 现状

- **website**：完整体系，由 5 个脚本生成 JSON 数据驱动 4 个表格组件
- **docs**：[`.dumi/theme/builtins/APITable/index.tsx`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/.dumi/theme/builtins/APITable/index.tsx) 仅是占位符 `<>API Table</>`，[TokenTable](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/.dumi/theme/builtins/TokenTable/index.tsx) 已存在但未与数据打通

### 1.3 迁移清单

#### 1.3.1 代码生成脚本（5 个）

| 脚本 | 源路径 | 目标路径 | 功能 |
| --- | --- | --- | --- |
| docgen.ts | `apps/website/scripts/docgen.ts` | `apps/docs/scripts/docgen.ts` | 用 ts-morph 从 `packages/ui/src/components/*.tsx` 提取 props/stylesNames/cssVariables/variants/modifiers；从 `packages/hooks/src/use-*.ts` 提取 hook params/returns |
| generate-css-exports.ts | `apps/website/scripts/generate-css-exports.ts` | `apps/docs/scripts/generate-css-exports.ts` | 收集所有 CSS module 文件清单到 `css-exports.json` |
| generate-theme-tokens.ts | `apps/website/scripts/generate-theme-tokens.ts` | `apps/docs/scripts/generate-theme-tokens.ts` | 从 `default-theme.ts` 和 `default-colors.ts` 求值出主题 tokens |
| generate-count.ts | `apps/website/scripts/generate-count.ts` | `apps/docs/scripts/generate-count.ts` | 统计组件/hooks/demos/pages 数量 |
| generate-demo-registry.ts | `apps/website/scripts/generate-demo-registry.ts` | `apps/docs/scripts/generate-demo-registry.ts` | 生成 demo 注册表 |

**输出目录**：`apps/docs/.docgen/`（生成 `docgen.json`、`hooks.json`、`css-exports.json`、`theme-tokens.json`、`count.json`、`demo-registry.json`）

#### 1.3.2 表格展示组件（4 个）

| 组件 | 源路径 | 目标路径 | 功能 |
| --- | --- | --- | --- |
| PropsTable | `apps/website/src/components/PropsTable/` | `apps/docs/.dumi/theme/builtins/PropsTable/` | Props 表格，支持 Fuse.js 模糊搜索 |
| StylesApiTable | `apps/website/src/components/StylesApiTable/` | `apps/docs/.dumi/theme/builtins/StylesApiTable/` | 样式 API 表格（Tabs: 选择器/CSS 变量/数据属性） |
| StylePropsTable | `apps/website/src/components/StylePropsTable/` | `apps/docs/.dumi/theme/builtins/StylePropsTable/` | 样式 props 表格 |

#### 1.3.3 辅助组件（4 个）

| 组件 | 源路径 | 目标路径 | 功能 |
| --- | --- | --- | --- |
| HtmlText | `apps/website/src/components/HtmlText/` | `apps/docs/.dumi/theme/builtins/HtmlText/` | 把 markdown 风格字符串（`code`、`!important!`、`@deprecated`、链接）转为 HTML |
| TableError | `apps/website/src/components/TableError/` | `apps/docs/.dumi/theme/builtins/TableError/` | 表格数据缺失时的错误占位 |
| TableInlineCode | `apps/website/src/components/TableInlineCode/` | `apps/docs/.dumi/theme/builtins/TableInlineCode/` | 表格内的行内代码展示 |
| getComponentName | `apps/website/src/components/PropsTable/getComponentName.ts` | `apps/docs/.dumi/theme/builtins/PropsTable/getComponentName.ts` | 组件名解析工具 |
| replace-types | `apps/website/src/components/PropsTable/replace-types.ts` | `apps/docs/.dumi/theme/builtins/PropsTable/replace-types.ts` | 类型字符串美化 |

### 1.4 适配要点

1. **依赖路径替换**：
   - `@/.docgen/docgen.json` → 相对路径或新增 alias `@docs/docgen`
   - `@/components/*` → 改为 dumi 内部相对路径
2. **package.json scripts 添加**：
   ```json
   {
     "scripts": {
       "docs:gen": "tsx scripts/docgen.ts && tsx scripts/generate-css-exports.ts && tsx scripts/generate-count.ts && tsx scripts/generate-demo-registry.ts && tsx scripts/generate-theme-tokens.ts",
       "predev": "pnpm docs:gen",
       "prebuild": "pnpm docs:gen"
     }
   }
   ```
3. **新增依赖**（apps/docs/package.json）：
   - `ts-morph`、`fuse.js`、`tsx`、`@types/fuse.js`
4. **改造 APITable 内置组件**：把 `<>API Table</>` 替换为真实实现，从 frontmatter 读取 `component` 字段，渲染 `<PropsTable component={component} />`
5. **dumi 自动注册**：将新组件放入 `.dumi/theme/builtins/` 自动被 dumi 识别为 markdown 标签

### 1.5 验证标准

- `pnpm docs:gen` 能成功生成所有 JSON 文件
- 打开 `/components/button` 页面，API 表格显示 ButtonProps 全部字段（含类型/默认值/说明）
- 搜索框可过滤 props
- 表格样式与文档站风格一致
- 抽查 10 个组件页面（含 hooks）确认 API 表格正常

### 1.6 工作量预估

- 脚本迁移：5 个脚本，可直接复制（路径常量需改）
- 组件迁移：8 个组件 + 工具函数，需调整 import 路径
- APITable 改造：1 个组件
- 联调与测试：10 个页面抽查

---

## 阶段 2：Colors Generator 工具页（P1）

### 2.1 目标

迁移 website 的颜色生成器独立页面，作为 docs 的 `/colors-generator` 路由。

### 2.2 现状

- **website**：[colors-generator.tsx](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/src/pages/colors-generator.tsx) + [ColorsGenerator/](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/src/components/ColorsGenerator/) 完整组件
- **docs**：无，仅在 [theming/colors.zh-CN.md](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/docs/theming/colors.zh-CN.md) 中有静态展示

### 2.3 迁移清单

| 文件 | 源路径 | 目标路径 |
| --- | --- | --- |
| 页面入口 | `apps/website/src/pages/colors-generator.tsx` | `apps/docs/.dumi/pages/colors-generator/index.tsx` |
| 主组件 | `apps/website/src/components/ColorsGenerator/ColorsGenerator.tsx` | 同上目录内 |
| ColorsInput | `apps/website/src/components/ColorsGenerator/ColorsInput/` | 同上目录内 |
| ColorsList | `apps/website/src/components/ColorsGenerator/ColorsList/` | 同上目录内 |
| ColorsOutput | `apps/website/src/components/ColorsGenerator/ColorsOutput/` | 同上目录内 |
| ComponentsPreview | `apps/website/src/components/ColorsGenerator/ComponentsPreview/` | 同上目录内 |
| colors-preset | `apps/website/src/components/ColorsGenerator/ColorsInput/colors-preset.ts` | 同上目录内 |

### 2.4 适配要点

1. **next/router 替换**：`useRouter` → `useLocation`（dumi/umi）
2. **依赖确认**：`@react-ui/colors-generator` 包是否已在根 workspace（需在根 package.json 或 apps/docs/package.json 添加）
3. **localStorage hook**：`@react-ui/hooks` 的 `useLocalStorage` 已可用
4. **导航入口**：在 Header Navigation 或首页 EcosystemSection 添加入口
5. **样式适配**：保留原 CSS Module，CSS 变量前缀 `--ui-*` 已对齐

### 2.5 验证标准

- 访问 `/colors-generator` 页面正常渲染
- 颜色输入框可输入十六进制颜色
- 颜色列表实时生成（10 阶色板）
- ComponentsPreview 用生成的色板渲染按钮/输入框等组件预览
- ColorsOutput 显示可复制的 CSS 变量代码
- URL 参数 `?color=#xxxxxx` 可初始化颜色
- 暗色模式下显示正常

---

## 阶段 3：首页 Sections 增强（P1）

### 3.1 目标

将 website 首页的多个高价值 sections 迁移到 docs 首页，提升营销能力。

### 3.2 迁移清单（按优先级）

#### P1（必迁）

| Section | 源路径 | 目标路径 | 价值 |
| --- | --- | --- | --- |
| HomePageDarkColorScheme | `apps/website/src/components/HomePage/HomePageDarkColorScheme/` | `apps/docs/.dumi/pages/index/components/DarkColorScheme/` | 暗色模式对比展示（含 demo.webp/light.png/dark.png） |
| HomePageExtensions | `apps/website/src/components/HomePage/HomePageExtensions/` | `apps/docs/.dumi/pages/index/components/Extensions/` | 扩展模块展示（Carousel/CodeHighlight/Dropzone/Modals/Notifications/Spotlight/Tiptap） |

#### P2（应迁）

| Section | 源路径 | 目标路径 | 价值 |
| --- | --- | --- | --- |
| HomePageForm | `apps/website/src/components/HomePage/HomePageForm/` | `apps/docs/.dumi/pages/index/components/FormSection/` | 表单能力展示 |
| HomePageHooks | `apps/website/src/components/HomePage/HomePageHooks/` | `apps/docs/.dumi/pages/index/components/HooksSection/` | Hooks 能力展示 |
| HomePageStyles | `apps/website/src/components/HomePage/HomePageStyles/` | `apps/docs/.dumi/pages/index/components/StylesSection/` | 样式系统能力展示 |
| HomePageStats | `apps/website/src/components/HomePage/HomePageStats/` | `apps/docs/.dumi/pages/index/components/Stats/` | 数据统计（依赖 `count.json`，需先完成阶段 1） |

#### P3（可选）

| Section | 源路径 | 目标路径 | 价值 |
| --- | --- | --- | --- |
| HomePageLLM | `apps/website/src/components/HomePage/HomePageLLM/` | `apps/docs/.dumi/pages/index/components/LLMSection/` | LLM 集成展示 |
| HomePageCommunity | `apps/website/src/components/HomePage/HomePageCommunity/` | `apps/docs/.dumi/pages/index/components/Community/` | 社区评价（reviews-data.ts） |
| HomePageSponsors | `apps/website/src/components/HomePage/HomePageSponsors/` | `apps/docs/.dumi/pages/index/components/Sponsors/` | 赞助商展示 |
| HomePageJoin | `apps/website/src/components/HomePage/HomePageJoin/` | `apps/docs/.dumi/pages/index/components/Join/` | 社交入口（SocialCards） |
| HomePageUI | `apps/website/src/components/HomePage/HomePageUI/` | `apps/docs/.dumi/pages/index/components/UIBanner/` | UI 横幅（banner.webp） |
| HomePageCombobox | `apps/website/src/components/HomePage/HomePageCombobox/` | `apps/docs/.dumi/pages/index/components/ComboboxSearch/` | 站内搜索入口 |

### 3.3 共享组件迁移

[HomePage/shared/](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/website/src/components/HomePage/shared/) 下有 6 个共享组件，所有 sections 都依赖：

| 组件 | 源路径 | 目标路径 |
| --- | --- | --- |
| HomePageContainer | `shared/HomePageContainer/` | `apps/docs/.dumi/pages/index/components/shared/Container/` |
| HomePageDescription | `shared/HomePageDescription/` | `apps/docs/.dumi/pages/index/components/shared/Description/` |
| HomePageFeatures | `shared/HomePageFeatures/` + HomePageFeature | `apps/docs/.dumi/pages/index/components/shared/Features/` |
| HomePageLearnMore | `shared/HomePageLearnMore/` | `apps/docs/.dumi/pages/index/components/shared/LearnMore/` |
| HomePageTabs | `shared/HomePageTabs/` | `apps/docs/.dumi/pages/index/components/shared/Tabs/` |
| HomePageTitle | `shared/HomePageTitle/` | `apps/docs/.dumi/pages/index/components/shared/Title/` |

### 3.4 适配要点

1. **next/link 替换**：所有 `<Link href="...">` → dumi `<Link to="...">` 或 `react-router-dom`
2. **图片资源**：webp/png 图片复制到对应目录，注意 dumi 静态资源引用方式
3. **路由前缀**：`/core/package` → `/components/overview`、`/getting-started` → `/docs/react/getting-started`
4. **集成到首页**：在 [`apps/docs/.dumi/pages/index/index.tsx`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/.dumi/pages/index/index.tsx) 中按顺序引入新 sections
5. **依赖 `@phosphor-icons/react`**：HomePageJumbotron 使用了 `ArrowRightIcon`、`ArrowUpRightIcon`，需在 apps/docs/package.json 添加

### 3.5 首页新结构

```
HeroSection
FeaturesSection           ← 已有
ComponentShowcase         ← 已有
DarkColorScheme           ← 新增（P1）
FormSection               ← 新增（P2）
HooksSection              ← 新增（P2）
StylesSection             ← 新增（P2）
Extensions                ← 新增（P1）
Stats                     ← 新增（P2，依赖 count.json）
EcosystemSection          ← 已有
LLMSection                ← 新增（P3）
Community                 ← 新增（P3）
Sponsors                  ← 新增（P3）
FooterCTA                 ← 已有
```

### 3.6 验证标准

- 首页滚动流畅，各 section 视觉层次清晰
- 暗色模式下所有 section 显示正常
- 移动端（390px）响应式布局正常
- 所有内部链接可访问（无 404）
- 图片资源加载成功

---

## 阶段 4：综合演示页（P2）

### 4.1 目标

迁移 website 的 Combobox 和 AppShell 综合演示页，作为 docs 的独立路由。

### 4.2 迁移清单

#### 4.2.1 Combobox 综合演示页

| 文件 | 源路径 | 目标路径 |
| --- | --- | --- |
| 页面入口 | `apps/website/src/pages/combobox.tsx` | `apps/docs/.dumi/pages/combobox/index.tsx` |
| ComboboxPage | `apps/website/src/combobox-examples/ComboboxPage/ComboboxPage.tsx` | 同上目录内 |
| ComboboxShell | `apps/website/src/combobox-examples/ComboboxShell/` | 同上目录内 |
| ComboboxNavbar | `apps/website/src/combobox-examples/ComboboxShell/ComboboxNavbar/` | 同上目录内 |
| ComboboxLinksGroup | `apps/website/src/combobox-examples/ComboboxShell/ComboboxNavbar/ComboboxLinksGroup/` | 同上目录内 |
| get-grouped-data | `apps/website/src/combobox-examples/ComboboxShell/ComboboxNavbar/get-grouped-data.ts` | 同上目录内 |
| index.ts | `apps/website/src/combobox-examples/index.ts` | 同上目录内 |

#### 4.2.2 AppShell 综合示例页

| 文件 | 源路径 | 目标路径 |
| --- | --- | --- |
| 页面入口 | `apps/website/src/pages/app-shell.tsx` | `apps/docs/.dumi/pages/app-shell/index.tsx` |
| AppShellPage | `apps/website/src/app-shell-examples/AppShellPage/AppShellPage.tsx` | 同上目录内 |
| ExamplesDrawer | `apps/website/src/app-shell-examples/AppShellPage/ExamplesDrawer/` | 同上目录内 |
| index.ts | `apps/website/src/app-shell-examples/index.ts` | 同上目录内 |

### 4.3 适配要点

1. **next/router 替换**：使用 dumi 的 `useLocation` + `useNavigate`
2. **导航入口**：在 Header Navigation 添加「示例」菜单项，或从 EcosystemSection 入口
3. **样式适配**：保留原 CSS Module，CSS 变量前缀已对齐
4. **响应式**：保留原有的移动端适配

### 4.4 验证标准

- `/combobox` 页面：左侧导航分组展示所有 combobox 示例，右侧渲染选中示例
- `/app-shell` 页面：完整的应用骨架演示，含抽屉式示例切换
- 暗色模式正常
- 移动端响应式正常

---

## 阶段 5：Mdx 辅助组件补全（P3）

### 5.1 目标

补全 docs 中尚缺的 MdxProvider 辅助组件，确保 markdown 文档中所有自定义标签都能正常渲染。

### 5.2 迁移清单

#### 5.2.1 需补全的 Mdx 组件

| 组件 | 源路径 | 目标路径 | 状态 |
| --- | --- | --- | --- |
| MdxTemplatesList | `MdxProvider/MdxTemplatesList/` + data.ts + community-data.ts | `builtins/TemplatesList/` | 已有目录，需补 data.ts |
| MdxVideo | `MdxProvider/MdxVideo/` | `builtins/Video/` | 已有目录，需对比实现 |
| MdxLlmAffix | `MdxProvider/MdxLlmAffix/` | `builtins/LlmAffix/` | 新建 |
| MdxLlmButton | `MdxProvider/MdxLlmButton/` | `builtins/LlmButton/` | 已有目录，需对比实现 |
| MdxNpmScript | `MdxProvider/MdxNpmScript/` | `builtins/NpmScript/` | 已有目录，需对比实现 |
| MdxPackagesInstallation | `MdxProvider/MdxPackagesInstallation/` + data.ts | `builtins/PackagesInstallation/` | 已有目录，需补 data.ts |
| MdxSponsorButton | `MdxProvider/MdxSponsorButton/` | `builtins/SponsorButton/` | 已有目录，需对比实现 |
| MdxInfo | `MdxProvider/MdxInfo/` | `builtins/Info/` | 已有目录，需对比实现 |
| MdxPre | `MdxProvider/MdxPre/` | `builtins/Pre/` | 已有目录，需对比实现 |
| MdxDataTable | `MdxProvider/MdxDataTable/` | `builtins/DataTable/` | 已有目录，需对比实现 |
| MdxExamplesButton | `MdxProvider/MdxExamplesButton/` | `builtins/ExamplesButton/` | 已有目录，需对比实现 |
| MdxInstallScript | `MdxProvider/MdxInstallScript/` | `builtins/InstallScript/` | 已有目录，需对比实现 |
| MdxKeyboardEventsTable | `MdxProvider/MdxKeyboardEventsTable/` | `builtins/KeyboardEventsTable/` | 已有目录，需对比实现 |
| MdxTypography | `MdxProvider/MdxTypography/` | `builtins/Typography/` | 新建（如需要） |
| MdxTitle | `MdxProvider/MdxTitle/` | `builtins/Title/` | 新建（如需要） |
| MdxRawContent | `MdxProvider/MdxRawContent/` | `builtins/RawContent/` | 新建（如需要） |
| MdxSiblings | `MdxProvider/MdxSiblings/` + get-mdx-siblings.ts | `builtins/Siblings/` | 新建（如需要） |
| MdxTabs | `MdxProvider/MdxTabs/` | `builtins/Tabs/` | 新建（如需要） |
| MdxPage | `MdxProvider/MdxPage/` | `builtins/Page/` | 新建（如需要） |
| MdxPageHeader | `MdxProvider/MdxPageHeader/` | `builtins/PageHeader/` | 新建（如需要） |
| MdxLayout | `MdxProvider/MdxLayout/` | `builtins/Layout/` | 新建（如需要） |

#### 5.2.2 需迁移的样式专用组件

| 组件 | 源路径 | 目标路径 | 功能 |
| --- | --- | --- | --- |
| CssFilesList | `apps/website/src/components/CssFilesList/` | `apps/docs/.dumi/theme/builtins/CssFilesList/` | CSS 文件清单展示（依赖 `css-exports.json`） |
| CssVariablesGroup | `apps/website/src/components/CssVariablesGroup/` | `apps/docs/.dumi/theme/builtins/CssVariablesGroup/` | CSS 变量分组展示 |
| CssVariablesList | `apps/website/src/components/CssVariablesList/` | `apps/docs/.dumi/theme/builtins/CssVariablesList/` | CSS 变量列表（依赖 `css-exports.json`） |
| ThemeColors | `apps/website/src/components/ThemeColors/` | `apps/docs/.dumi/theme/builtins/ThemeColors/` | 主题色板展示 |
| DocsFooter | `apps/website/src/components/DocsFooter/` | `apps/docs/.dumi/theme/builtins/DocsFooter/` | 文档页页脚（LinksGroup + data.ts） |

### 5.3 适配要点

1. **依赖数据文件**：CssFilesList/CssVariablesList 依赖阶段 1 生成的 `css-exports.json`
2. **import 路径替换**：`@/components/*` → 相对路径
3. **antd 组件替换**：原 Mdx 组件可能用了 antd，需替换为 react-ui 组件
4. **dumi 自动注册**：放入 `.dumi/theme/builtins/` 自动注册
5. **新增 builtins 需重启 dev server**：dumi 启动时扫描 builtins 目录

### 5.4 验证标准

- 在 markdown 中使用 `<TemplatesList />`、`<Video src="..." />` 等标签能正常渲染
- CssFilesList 页面显示所有 CSS module 文件清单
- CssVariablesList 页面显示所有 CSS 变量分组
- ThemeColors 页面显示所有主题色板

---

## 阶段 6：辅助功能组件（P4）

### 6.1 目标

迁移其他次要但有用的辅助组件。

### 6.2 迁移清单

| 组件 | 源路径 | 目标路径 | 功能 | 优先级 |
| --- | --- | --- | --- | --- |
| LogoAssets | `apps/website/src/components/LogoAssets/` | `apps/docs/.dumi/pages/logo-assets/` | Logo 资源页（mantine-logo-*.svg） | P4 |
| VersionsList | `apps/website/src/components/VersionsList/` | `apps/docs/.dumi/theme/builtins/VersionsList/` | 版本列表（changelog 页面用） | P4 |
| GaScript | `apps/website/src/components/GaScript/` | `apps/docs/.dumi/theme/common/GaScript/` | Google Analytics 脚本 | P4 |
| Search | `apps/website/src/components/Search/` | 不迁移 | 自定义搜索（dumi 内置搜索已够用） | 不迁 |
| SocialButton | `apps/website/src/components/SocialButton/` | `apps/docs/.dumi/theme/builtins/SocialButton/` | 社交分享按钮 | P4 |
| HotKeysHandler | `apps/website/src/components/HotKeysHandler/` | `apps/docs/.dumi/theme/common/HotKeysHandler/` | 快捷键处理 | P4 |
| PageBase | `apps/website/src/components/PageBase/` | `apps/docs/.dumi/theme/layouts/PageBase/` | 页面基础布局 | P4 |
| PageHead | `apps/website/src/components/PageHead/` | `apps/docs/.dumi/theme/common/PageHead/` | 页面 head 信息 | P4 |
| DocsSection | `apps/website/src/components/DocsSection/` | `apps/docs/.dumi/theme/builtins/DocsSection/` | 文档分区 | P4 |
| Banner | `apps/website/src/components/Banner/` | `apps/docs/.dumi/theme/builtins/Banner/` | 顶部公告横幅 | P4 |
| ModalsProviderDemo | `apps/website/src/components/ModalsProviderDemo/` | `apps/docs/.dumi/theme/builtins/ModalsProviderDemo/` | Modals Provider 演示 | P4 |

### 6.3 适配要点

- **GaScript**：需配置 GA tracking ID，在生产环境注入
- **LogoAssets**：作为独立页面 `/logo-assets`，提供 Logo 下载
- **VersionsList**：集成到 changelog 页面

---

## 附录：依赖与构建配置

### A.1 apps/docs/package.json 新增依赖

```json
{
  "dependencies": {
    "@phosphor-icons/react": "^2.1.10",
    "@react-ui/colors-generator": "workspace:*",
    "fuse.js": "^7.4.2",
    "chroma-js": "^3.2.0"
  },
  "devDependencies": {
    "@types/chroma-js": "^3.1.2",
    "@types/fuse.js": "^3.5.0",
    "ts-morph": "^28.0.0",
    "tsx": "^4.23.0"
  }
}
```

### A.2 scripts 字段更新

```json
{
  "scripts": {
    "dev": "dumi dev",
    "build": "dumi build",
    "docs:gen": "tsx scripts/docgen.ts && tsx scripts/generate-css-exports.ts && tsx scripts/generate-count.ts && tsx scripts/generate-demo-registry.ts && tsx scripts/generate-theme-tokens.ts",
    "predev": "pnpm docs:gen",
    "prebuild": "pnpm docs:gen"
  }
}
```

### A.3 .dumirc.ts alias 新增

```typescript
alias: {
  '@react-ui/ui': path.join(__dirname, '../../packages/ui/es/index.js'),
  '@react-ui/hooks': path.join(__dirname, '../../packages/hooks/src/index.ts'),
  '@react-ui/demo': path.join(__dirname, '.dumi/theme/builtins/DemoEngine/index.ts'),
  // 新增
  '@react-ui/colors-generator': path.join(__dirname, '../../packages/colors-generator/src/index.ts'),
  '@docs/docgen': path.join(__dirname, '.docgen/docgen.json'),
  '@docs/hooks': path.join(__dirname, '.docgen/hooks.json'),
  '@docs/css-exports': path.join(__dirname, '.docgen/css-exports.json'),
  '@docs/theme-tokens': path.join(__dirname, '.docgen/theme-tokens.json'),
  '@docs/count': path.join(__dirname, '.docgen/count.json'),
}
```

### A.4 .gitignore 更新

```
# 新增
.docgen/
```

### A.5 tsconfig.json 配置

确保 `tsconfig.json` 包含 `scripts/` 目录以支持 tsx 运行 ts-morph 脚本：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["src", "scripts", ".dumi"]
}
```

---

## 执行节奏

```
阶段 1（P0，API 表格系统）
  ├─ 1.1 迁移 5 个生成脚本
  ├─ 1.2 迁移 4 个表格组件 + 4 个辅助组件
  ├─ 1.3 改造 APITable 内置组件
  ├─ 1.4 配置 package.json scripts 和 alias
  └─ 1.5 验证 10 个组件页面
         ↓
阶段 2（P1，Colors Generator）
  ├─ 2.1 迁移 ColorsGenerator 组件树
  ├─ 2.2 替换 next/router 为 dumi useLocation
  ├─ 2.3 添加导航入口
  └─ 2.4 验证功能完整性
         ↓
阶段 3（P1+P2，首页 Sections）
  ├─ 3.1 迁移 shared/ 共享组件（6 个）
  ├─ 3.2 P1: DarkColorScheme + Extensions
  ├─ 3.3 P2: FormSection + HooksSection + StylesSection + Stats
  ├─ 3.4 P3: LLMSection + Community + Sponsors + Join + UIBanner + ComboboxSearch
  ├─ 3.5 集成到 index.tsx
  └─ 3.6 验证首页所有 sections
         ↓
阶段 4（P2，综合演示页）
  ├─ 4.1 迁移 Combobox 综合演示页
  ├─ 4.2 迁移 AppShell 综合示例页
  ├─ 4.3 添加导航入口
  └─ 4.4 验证功能
         ↓
阶段 5（P3，Mdx 辅助组件补全）
  ├─ 5.1 对比已有 builtins，补全缺失实现
  ├─ 5.2 迁移样式专用组件（CssFilesList 等）
  ├─ 5.3 迁移 DocsFooter
  └─ 5.4 验证 markdown 标签渲染
         ↓
阶段 6（P4，辅助功能组件）
  ├─ 6.1 LogoAssets / VersionsList / GaScript
  ├─ 6.2 SocialButton / HotKeysHandler / PageBase / PageHead
  ├─ 6.3 DocsSection / Banner / ModalsProviderDemo
  └─ 6.4 最终全站验证
```

---

## 进度跟踪

### 已完成

- ✅ 阶段 0：antd → react-ui 迁移（见 MIGRATION-ANTD-TO-REACTUI.md）
- ✅ 阶段 0：白屏/暗色模式/侧边栏/链接修复
- ✅ 组件总览页 `/components/overview` 创建
- ✅ 阶段 1：API 表格系统（5 个 docgen 脚本 + PropsTable/StylesApiTable/APITable 组件）
- ✅ 阶段 2：Colors Generator 工具页（/colors-generator 路由）
- ✅ 阶段 3：首页 Sections 增强（DarkColorScheme/Form/Hooks/Styles/Extensions/Stats）
- ✅ 阶段 4：综合演示页（/combobox + /app-shell 路由）
- ✅ 阶段 5：Mdx 辅助组件补全（CssFilesList/CssVariablesList/ThemeColors/DocsFooter）
- ✅ 阶段 6：辅助功能组件（Banner/DocsSection/SocialButton/VersionsList/ModalsProviderDemo/GaScript/HotKeysHandler/PageBase/PageHead/LogoAssets）

---

## 风险与注意事项

1. **ts-morph 性能**：docgen.ts 全量扫描组件源码可能较慢（website 项目约 30s），需在 predev/prebuild 钩子中执行，dev 模式下可考虑跳过
2. **dumi builtins 自动注册**：新增 builtins 目录需重启 dev server
3. **CSS Module 排序问题**：如出现样式覆盖，确认 alias 指向 ES 产物而非源码（见 project_memory.md）
4. **next 依赖残留**：迁移组件中所有 `next/link`、`next/router`、`next/image` 必须替换
5. **图片资源路径**：webp/png 图片需复制到 dumi 静态资源目录或对应页面目录
6. **@phosphor-icons/react 体积**：该包较大，仅首页 Jumbotron 用了 2 个图标，可考虑用 react-icons 替代
7. **JSON 数据热更新**：`.docgen/*.json` 在 dev 模式下不会自动重新生成，修改组件源码后需手动 `pnpm docs:gen`
