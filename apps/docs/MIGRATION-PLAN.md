# 文档全量迁移计划（apps/website → apps/docs）

## 源目录与目标

| 类型 | 源（apps/website） | 目标（apps/docs） |
| --- | --- | --- |
| mdx 文档正文 | `src/pages/{core,charts,hooks,dates,form,styles,theming,guides,x,schedule}/*.mdx` + 根目录 mdx | `docs/{core,charts,hooks,dates,form,styles,theming,guides,x,schedule}/*.zh-CN.md` + 根目录 zh-CN.md |
| 导航/元数据 | `src/mdx/data/mdx-*-data.ts`（11 个文件） | `.dumirc.ts` 的 `nav` 配置 + 各页 frontmatter |
| 特殊页面 | `src/pages/{getting-started,about,contribute,support,browser-support}.mdx` + `index.tsx` | `docs/{getting-started,about,contribute,support,browser-support}.zh-CN.md` + `index/index.tsx` |
| Demo 内容 | `packages/@react-ui/docs-demos/src/demos/**` | `apps/docs/demos/**`（已复制完成） |
| Demo 引擎 | `packages/@react-ui/demo/src/**` | `.dumi/theme/builtins/DemoEngine/`（已搭建完成） |
| 19 个 Mdx 辅助组件 | `src/components/MdxProvider/MdxSharedContent/*.tsx` | `.dumi/theme/builtins/{Gradient,Polymorphic,...}/index.tsx`（已搭建完成） |
| MdxProvider 剩余辅助组件 | `src/components/MdxProvider/{MdxInstallScript,MdxNpmScript,MdxPackagesInstallation,MdxKeyboardEventsTable,MdxTemplatesList,MdxVideo,MdxInfo,MdxPre,MdxDataTable,MdxExamplesButton,MdxSponsorButton,MdxLlmButton}.tsx` | `.dumi/theme/builtins/{InstallScript,NpmScript,PackagesInstallation,KeyboardEventsTable,TemplatesList,Video,Info,Pre,DataTable,ExamplesButton,SponsorButton,LlmButton}/index.tsx` |

---

## 用户确认的关键决策

1. **内容融合策略**：保留现有 dumi 文档骨架（`## 何时使用` + `## 代码演示` + `## API` + `## 主题变量` + `## FAQ`），补充旧 mdx 的详细用法章节
2. **Demo 引用方式**：每个 `<Demo data={XxxDemos.xxx} />` 转换为独立 `demo/xxx.tsx` 文件 + `<code src="./demo/xxx.tsx"></code>`
3. **Mdx 辅助组件**：保留所有 `<Gradient>`、`<Polymorphic>`、`<GetElementRef>` 等标签（需先修复 `<Gradient>` 导致后续内容消失的 dumi 解析问题）
4. **整体风格**：沿用 dumi 文档站既有风格（frontmatter、章节命名、API 表格结构）
5. **UIProvider**：每个 demo 独立 UIProvider（通过 `.dumi/theme/builtins/DemoEngine` 中的 wrapper 包裹）
6. **Demo 存放位置**：demo 文件放在 `components/<component>/demo/` 下

---

## 阶段零：前置修复（必须先完成）

### 0.1 修复 `<Gradient>` 导致后续内容消失

**问题**：在 dumi markdown 中使用 `<Gradient component="Button" />` 后，该标签之后的所有内容都不渲染。

**调查方向**：
- 检查 `.dumi/remarkMeta.ts` 和 `.dumi/rehypeDocs.ts` 是否截断了 JSX（dumi 自定义 remark/rehype 插件）
- 检查 dumi 的 `codeBlockMode: 'passive'` 是否影响 JSX 解析
- 参考 dumi 文档中 `<Modal.Root>` 等标签的使用方式
- 可能需要将 `<Gradient component="Button" />` 改为 `<Gradient component="Button"></Gradient>` 显式闭合

**验证**：在 `docs/demo-engine-test.zh-CN.md` 中验证 `<Gradient>` 后的内容能正常渲染。

### 0.2 验证 `Polymorphic`、`GetElementRef` 等辅助组件

在测试页面逐个验证 19 个 Mdx 辅助组件，修复渲染问题。

---

## 阶段一：MdxProvider 剩余辅助组件迁移（11 个）

**目标**：把 `apps/website/src/components/MdxProvider/` 下尚未迁移的辅助组件移植到 `.dumi/theme/builtins/`。

### 1.1 迁移清单

| 组件 | 源文件 | 目标文件 | 用途 |
| --- | --- | --- | --- |
| MdxInstallScript | `MdxInstallScript/MdxInstallScript.tsx` | `builtins/InstallScript/index.tsx` | npm/yarn/pnpm/bun 安装命令切换 |
| MdxNpmScript | `MdxNpmScript/MdxNpmScript.tsx` | `builtins/NpmScript/index.tsx` | 单条 npm 安装命令 |
| MdxPackagesInstallation | `MdxPackagesInstallation/MdxPackagesInstallation.tsx` + `data.ts` | `builtins/PackagesInstallation/index.tsx` + `data.ts` | 多包安装表格 |
| MdxKeyboardEventsTable | `MdxKeyboardEventsTable/MdxKeyboardEventsTable.tsx` | `builtins/KeyboardEventsTable/index.tsx` | 键盘事件表格 |
| MdxTemplatesList | `MdxTemplatesList/MdxTemplatesList.tsx` + `data.ts` + `community-data.ts` | `builtins/TemplatesList/index.tsx` + `data.ts` | 模板列表 |
| MdxVideo | `MdxVideo/MdxVideo.tsx` | `builtins/Video/index.tsx` | 视频嵌入 |
| MdxInfo | `MdxInfo/MdxInfo.tsx` | `builtins/Info/index.tsx` | 信息提示框（用文档站 Alert 替代，需对齐 API） |
| MdxPre | `MdxPre/MdxPre.tsx` | `builtins/Pre/index.tsx` | 代码块容器 |
| MdxDataTable | `MdxDataTable/MdxDataTable.tsx` | `builtins/DataTable/index.tsx` | 数据表格 |
| MdxExamplesButton | `MdxExamplesButton/MdxExamplesButton.tsx` | `builtins/ExamplesButton/index.tsx` | 示例跳转按钮 |
| MdxLlmButton | `MdxLlmButton/MdxLlmButton.tsx` | `builtins/LlmButton/index.tsx` | LLMs.md 按钮 |

### 1.2 适配要点

- 用文档站外壳 antd 组件替代旧 mdx 中的 react-ui 组件（`Typography`、`Alert`、`Table`、`Tabs`、`Segmented` 等，仅用于文档站 UI，不影响 react-ui 库本身）
- 保留原组件的 props 接口
- 在 `.dumi/theme/builtins/index.ts`（或通过 dumi 自动注册机制）导出

### 1.3 在 markdown 中可用的标签名

dumi 通过 frontmatter 或 `builtins` 自动注册，标签名约定为 PascalCase：
- `<InstallScript packages={['@react-ui/ui', '@react-ui/hooks']} />`
- `<NpmScript pkg="@react-ui/ui" />`
- `<PackagesInstallation />`
- `<KeyboardEventsTable data={...} />`
- `<TemplatesList />`
- `<Video src="..." />`

---

## 阶段二：core 组件迁移（117 个组件）

### 2.1 迁移脚本 `scripts/migrate-component.js`

**输入**：
- 旧 mdx：`apps/website/src/pages/core/{component}.mdx`
- 旧 demos：`apps/docs/demos/core/{Component}/*.demo.*.tsx`（已复制）
- 元数据：`apps/website/src/mdx/data/mdx-core-data.ts`

**脚本逻辑**：

#### a) 解析旧 mdx

```javascript
// 输入：button.mdx
import { ButtonDemos, StylesDemos, ThemingDemos } from '@react-ui/docs-demos';
import { Layout } from '@/layout';
import { MDX_DATA } from '@/mdx';

export default Layout(MDX_DATA.Button);

## 用法
<Demo data={ButtonDemos.configurator} />

## 紧凑尺寸
`Button` 支持 `xs` – `xl`...
<Demo data={ButtonDemos.compact} />

<Gradient component="Button" />
<Demo data={ButtonDemos.gradient} />

<Polymorphic defaultElement="button" changeToElement="a" component="Button" withNext />
<GetElementRef component="Button" refType="button" />
```

#### b) 提取结构

- 跳过 import 和 `export default Layout(...)` 行
- 按 `## 标题` 分段
- 每段内的 `<Demo data={XxxDemos.xxx} />` 提取 demo key（如 `ButtonDemos.compact` → 组件 `Button` + demo 名 `compact`）
- `<Gradient>`、`<Polymorphic>`、`<GetElementRef>` 等辅助组件标签保留原样
- 普通段落和代码块保留

#### c) 转换 demo 引用

`<Demo data={ButtonDemos.compact} />` → 生成 `demo/compact.tsx` + 在 markdown 中替换为 `<code src="./demo/compact.tsx"></code>`

**demo tsx 模板**（code 类型）：
```tsx
import React from 'react';
import { Button, Group } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    {/* 从 demos/core/Button/Button.demo.compact.tsx 提取的 JSX */}
  </DemoWrap>
);

export default App;
```

**demo tsx 模板**（configurator 类型）：
```tsx
import React from 'react';
import { Button } from '@react-ui/ui';
import { ConfiguratorDemo } from '@react-ui/demo';
import DemoWrap from '../../_util/demoWrap';
import { configurator as demo } from '../../../demos/core/Button';

function Wrapper(props) {
  return (
    <DemoWrap>
      <Button {...props}>Button</Button>
    </DemoWrap>
  );
}

const code = (props) => `<Button ${...} />`;

export default function Demo() {
  return (
    <ConfiguratorDemo
      component={Wrapper}
      code={code}
      controls={demo.controls}
      title={demo.title}
    />
  );
}
```

**注意**：对于 configurator 类型 demo，**不**拆解 controls，直接复用 `demos/core/Button/Button.demo.configurator.tsx` 中导出的 demo 对象，通过 `renderDemo` 函数渲染（已在 `demos/render-demo.tsx` 中实现）：

```tsx
// demo/configurator.tsx
import { configurator } from '../../../demos/core/Button';
import { renderDemo } from '../../../demos/render-demo';

export default renderDemo(configurator);
```

这样能保留所有交互控件。

#### d) 生成新 markdown（沿用 dumi 文档骨架）

对于**已有 dumi 文档页面**的组件（如 button、modal、checkbox 等）：
- 保留现有 `## 何时使用`、`## API`、`## 主题变量`、`## FAQ` 章节
- 在 `## 代码演示` 下追加旧 mdx 的用法章节（`## 紧凑尺寸`、`## 加载状态` 等）

对于**尚未有页面**的组件：
- 按现有 dumi 文档模板创建新页面
- frontmatter：
  ```yaml
  ---
  category: Components
  title: Button
  subtitle: 按钮
  description: react-ui 按钮组件，用于触发一个即时操作。
  group:
    title: 通用
    order: 1
  ---
  ```
- 章节顺序：`## 何时使用` → `## 代码演示` → `## API` → `## 主题变量` → `## FAQ`

#### e) 路径映射

mdx 内的链接自动替换：
- `/core/button` → `/components/button`
- `/hooks/use-fetch` → `/hooks/use-fetch`（保持）
- `/styles/xxx` → `/styles/xxx`（保持）
- `/theming/xxx` → `/theming/xxx`（保持）
- `/guides/xxx` → `/guides/xxx`（保持）

### 2.2 分批迁移顺序

**第 1 批**（demo ≤ 3 个，约 30 个组件）：Paper、Mark、Stack、Dialog、Fieldset、Collapse、Container、CopyButton、FileButton、FileInput、CloseButton、Image、Indicator、JsonInput、LoadingOverlay、MaskInput、NativeSelect、Notification、NumberFormatter、NumberInput、Pagination、PinInput、Progress、RingProgress、ScrollArea、SemiCircleProgress、SimpleGrid、Skeleton、Space、Spoiler、TableOfContents、Text、Textarea、ThemeIcon、Title、Tooltip、Transition、TreeSelect、VisuallyHidden、BackgroundImage、Blockquote、Breadcrumbs、AspectRatio、Autocomplete、Affix、Anchor、ActionIcon、Center、Code、ColorInput、ColorPicker、ColorSwatch、ComboboxPopover、Container、EmptyState、FloatingIndicator、FloatingWindow、FocusTrap、Group、Highlight、HoverCard、Kbd、List、Marquee、Menu、Menubar、NavLink、Overlay、Pill、PillsInput、Popover、Rating、Scroller、Stack、Stepper、Switch、Table、TagsInput、TextInput、Timeline、Tree、Typography、UnstyledButton 等

**第 2 批**（demo 4-10 个，约 50 个组件）：Avatar、Badge、Burger、Card、Chip、Divider、Drawer、Flex、Grid、Image、Input、Loader、Modal、Radio、Select、Slider、Tabs 等

**第 3 批**（demo ≥ 10 个，约 15 个组件）：Button、Accordion、Combobox、Menu、Popover、Tooltip、Overlay、Alert、Anchor 等

### 2.3 每个组件的验证

- 运行 `node scripts/check-component-pages.js` 验证页面渲染
- 通过 Chrome DevTools MCP 抽查 5-10 个组件：
  - configurator 控件是否可交互
  - 代码展示是否正确
  - `<Gradient>` 等辅助组件是否正常渲染
  - 无控制台错误

---

## 阶段三：charts 组件迁移（17 个组件，227 个 demo）

- 同阶段二流程
- 注意图表 demo 依赖 recharts 和 `_data.ts` 数据文件
- `apps/docs/demos/charts/` 下的 `_data.ts` 文件已复制完成
- 17 个组件：AreaChart、BarChart、BarsList、BubbleChart、CompositeChart、DonutChart、FunnelChart、Heatmap、LineChart、PieChart、RadarChart、RadialBarChart、SankeyChart、ScatterChart、Sparkline、Treemap、GettingStarted

---

## 阶段四：hooks 文档迁移（82 个 hook，115 个 demo）

- hooks 文档主要是类型定义 + 少量 demo
- demo 位于 `apps/docs/demos/hooks/`（11 个 hook 有 demo，其余纯文字）
- 同 core 流程迁移
- 目标路径：`docs/hooks/use-xxx.zh-CN.md`
- 导航归类到 "Hooks"

---

## 阶段五：其他文档迁移（85 个 mdx）

### 5.1 dates（16 个 mdx）→ `docs/dates/`

### 5.2 form（16 个 mdx）→ `docs/form/`

### 5.3 styles（22 个 mdx）→ `docs/styles/`

- 处理 `<InstallScript>`、`<NpmScript>`、`<PackagesInstallation>`、`<DataTable>` 等辅助组件
- 处理 `<CssFilesList>`、`<CssVariablesList>`、`<CssVariablesGroup>`、`<ColorsGenerator>`、`<ThemeColors>` 等样式专用组件（需要从 `apps/website/src/components/` 迁移）

### 5.4 theming（6 个 mdx）→ `docs/theming/`

### 5.5 guides（16 个 mdx）→ `docs/guides/`

- 处理 `<FrameworksGuides>`（Next/Vite/Gatsby/ReactRouter/Redwood 集成指南）
- 迁移 `src/components/FrameworksGuides/` 和 `src/components/icons/` 下的图标

### 5.6 x（9 个 mdx）→ `docs/x/`

- Carousel、CodeHighlight、Dropzone、Extensions、Modals、Notifications、Nprogress、Spotlight、Tiptap
- 对应 demo 已在 `apps/docs/demos/{carousel,code-highlight,dropzone,modals,notifications,nprogress,spotlight,tiptap}/` 下

### 5.7 schedule（13 个 mdx）→ `docs/schedule/`

### 5.8 根目录特殊页面

- `getting-started.mdx` → `docs/getting-started.zh-CN.md`
- `about.mdx` → `docs/about.zh-CN.md`
- `contribute.mdx` → `docs/contribute.zh-CN.md`
- `support.mdx` → `docs/support.zh-CN.md`
- `browser-support.mdx` → `docs/browser-support.zh-CN.md`
- `index.tsx`（首页）→ `.dumi/pages/index/index.tsx`（已存在，需对比内容融合）

---

## 阶段六：导航重建与最终验证

### 6.1 重建 dumi 导航

在 `.dumirc.ts` 的 `nav` 配置中按 `mdx-nav-data.ts` 的分类重建：

```typescript
nav: [
  { title: '开始', 'order': 1, link: '/docs/getting-started' },
  { title: '组件', 'order': 2, link: '/components/overview' },
  { title: '图表', 'order': 3, link: '/charts/area-chart' },
  { title: 'Hooks', 'order': 4, link: '/hooks/use-fetch' },
  { title: '日期', 'order': 5, link: '/dates/getting-started' },
  { title: '表单', 'order': 6, link: '/form/use-form' },
  { title: '样式', 'order': 7, link: '/styles/styles-overview' },
  { title: '主题', 'order': 8, link: '/theming/theme-object' },
  { title: '指南', 'order': 9, link: '/guides/controlled-vs-uncontrolled' },
  { title: '扩展', 'order': 10, link: '/x/carousel' },
  { title: '日程', 'order': 11, link: '/schedule/getting-started' },
]
```

各分类内部的子菜单通过 frontmatter 的 `group` 字段和 `order` 字段排序。

### 6.2 最终验证

- 运行 `node scripts/check-component-pages.js` 验证所有页面
- 运行 `node scripts/check-demo-imports.js` 验证 demo 导入完整性
- 检查导航菜单完整性
- 检查搜索功能
- 检查主题切换
- 通过 Chrome DevTools MCP 抽查 20+ 个页面

---

## 当前进度

### 已完成

- ✅ DemoEngine 基础设施搭建（`.dumi/theme/builtins/DemoEngine/`）
- ✅ 19 个 Mdx 辅助组件创建（`.dumi/theme/builtins/{Gradient,Polymorphic,...}/`）
- ✅ docs-demos 2147 个文件复制到 `apps/docs/demos/`
- ✅ `@react-ui/demo` alias 配置完成
- ✅ `render-demo.tsx` 添加 UIProvider 包裹
- ✅ 35 个 demo 文件相对路径修复
- ✅ Gradient 组件导入路径修复
- ✅ ConfiguratorDemo 验证通过（在 Button 页面成功渲染）
- ✅ 126 个组件页面骨架已生成（dumi 文档模板）
- ✅ 部分组件已有完整 dumi 文档页面（button、modal、checkbox、card 等）

### 待完成

- ⏳ 阶段零：修复 `<Gradient>` 导致后续内容消失的问题
- ⏳ 阶段一：MdxProvider 剩余 11 个辅助组件迁移
- ⏳ 阶段二：core 组件迁移（117 个，逐个补充旧 mdx 的详细用法）
- ⏳ 阶段三：charts 组件迁移（17 个）
- ⏳ 阶段四：hooks 文档迁移（82 个）
- ⏳ 阶段五：其他文档迁移（85 个 mdx）
- ⏳ 阶段六：导航重建与最终验证

---

## 执行节奏

1. **先修复阶段零**（`<Gradient>` 问题）——这是阻塞所有组件迁移的关键问题
2. **阶段一**（剩余辅助组件迁移）——为阶段五的 styles/guides 文档迁移铺路
3. **阶段二第 1 批**（demo ≤ 3 的组件）——验证迁移脚本和流程
4. **阶段二第 2、3 批**——批量执行
5. **阶段三、四、五**——按类别推进
6. **阶段六**——最终验证
