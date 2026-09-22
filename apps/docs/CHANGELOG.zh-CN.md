---
order: 6
title: 更新日志
timeline: true
tag: vVERSION
---

`react-ui` 遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：每周末会进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：每月发布一个带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性，不在发布周期内。

---

## 3.0.0

`2026-09-22`

- 💥 **破坏性变更**：`@xiaoye-react/ui` 的 `react` / `react-dom` peer 由 `^18.0.0 || ^19.0.0` 收窄为 `^19.0.0`。包内 6 处使用 React 19 独有的 `use()`（FormProvider、ScheduleEvent、DatesProvider、CodeHighlightProvider、Modals、UIEmotionProvider），此前在 React 18 下能装上也必在运行时抛错，现在改为安装期即拒绝。`@xiaoye-react/hooks` 仍兼容 React 18。
- 📦 构建产物由"单个 1.71 MB 已压缩 bundle"改为 `preserveModules` 逐模块输出，并把全部运行时依赖外部化。实测下游 `import { Button }` 的打包体积从 327,370 B gzip 降到 12,425 B gzip；`@xiaoye-react/hooks` 单个 hook 从 29,590 B 降到 266 B。`style.css` 与旧产物字节一致。
- 🐞 修复表单 `form.watch(field, cb)` 在 `field` 变化而回调身份稳定时不重新订阅的问题：新字段收不到任何通知、旧字段却仍在误通知。
- 🐞 修复 `useMatches` 的两处退化：`getInitialValueInEffect: false` 不再被忽略；断点值写成 `min()/clamp()` 这类含逗号的形式时不再被拆坏。
- 🐞 `Checkbox` / `Radio` / `Switch` 设置 `error` 时补上 `aria-invalid`（与 `Input` 既有约定对齐），读屏用户此前完全感知不到错误态。
- 🐞 `Popover` 的 `portalProps` 此前传到 Dropdown 就丢失，现已透传。
- 💄 `AppShell` 的 `fixed` 布局改用 `react-remove-scroll` 锁滚动：不再覆写消费者自己的 `body` inline overflow，并有滚动条宽度补偿。
- 🩹 `Text` 的 `truncate="start"` 在 RTL 文档下会截错一端，补上反向分支。
- 🔧 发布链路修复：`release` 改用 `pnpm publish`（`npm publish` 不重写 `workspace:` 协议）；根 `pnpm-lock.yaml` 纳入版本控制；`release:tag` 不再写死 `v2.0.0`；9 个私有包的 `main/module/types` 从不存在的 `./cjs|./esm|./lib` 改回源码。
- 🧹 退役未上线的 `@xiaoye-react/demo` 包：文档站的类型检查此前一直对着这份不上线的副本，改指真身后立刻暴露并修复了 DemoEngine 里 4 个从未被检查到的类型错误。

---

## 0.0.1

`2026-07-19`

- 🎉 `react-ui` 首个公开版本发布。
- 📦 包含 core 通用组件（Button、Input、Modal、Select、Tabs 等 117 个）。
- 🪝 提供 `@xiaoye-react/hooks` 工具钩子集合（82 个）。
- 📊 ~~内置 charts 图表组件（基于 recharts，17 个）~~：与事实不符，本库从未包含图表组件、也未依赖 recharts（该条 2026-09-22 更正；曾有的 `@xiaoye-react/charts` 包已删除）。
- 📅 提供 dates 日期组件、form 表单方案、theming 主题系统、styles 样式工具。
- 🎨 支持 light / dark 主题切换，CSS 变量统一使用 `--ui-*` 前缀。
- 📖 文档站基于 dumi 2 + antd theme 构建。
