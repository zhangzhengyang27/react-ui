---
category: Styles
title: Unstyled
subtitle: 无样式
description: react-ui Unstyled 文档。
---


## 将 ReactUI 用作 headless UI 库

你可以将 ReactUI 作为 headless UI 库使用。要做到这一点，只需不在应用中导入 `@ui/*/styles.css`。
然后你就可以使用 [Styles API](/docs/styles/styles-api/) 配合任意你喜欢的样式方案为 ReactUI 组件设置样式。

## HeadlessUIProvider

`HeadlessUIProvider` 是 [UIProvider](/docs/theming/ui-provider) 的替代方案，
用于你想将 ReactUI 作为 headless UI 库时。它会移除所有与 ReactUI 样式相关的功能：

- 不再为组件应用 ReactUI class
- 不再通过 `style` 属性添加内联 CSS 变量
- 移除所有配色方案相关功能
- 不生成全局样式

`HeadlessUIProvider` 的限制：

- [配色方案切换](/docs/theming/color-schemes/) 将不可用。如果你的应用需要深色模式，你需要自行实现。
- 所有与样式相关的 props（如 `color`、`radius`、`size` 等）都不会生效。
- 一些依赖样式的组件将无法使用（如 [Grid](/components/grid)、[SimpleGrid](/components/simple-grid)、[Container](/components/container) 等）。
- `lightHidden`/`darkHidden`、`visibleFrom`/`hiddenFrom` props 将不可用。
- [Style props](/docs/styles/style-props/) 只对显式值有效，例如 `mt="xs"` 无效，但 `mt={5}` 有效。

要使用 `HeadlessUIProvider`，请参考 [入门指南](/getting-started/)，并将 `UIProvider` 替换为 `HeadlessUIProvider`。
注意，你的应用中不需要使用 [ColorSchemeScript](/docs/theming/color-schemes/#colorschemescript)，它不会产生任何效果，
因此可以忽略指南中的相关部分。

```tsx
import { HeadlessUIProvider } from '@xiaoye-react/ui';

function App() {
  return (
    <HeadlessUIProvider>
      {/* Your application */}
    </HeadlessUIProvider>
  );
}
```

## unstyled prop

大多数 ReactUI 组件都支持 `unstyled` prop，它可以移除组件的库样式，让你可以从头开始设置样式。
注意，`unstyled` prop 不支持复合组件（如 `Tabs.Tab`、`Menu.Dropdown`、`Accordion.Control` 等）——
它只对根组件（如 `Tabs`、`Menu`、`Accordion` 等）有效。

无样式的 [Tabs](/components/tabs) 组件示例：


> **在 unstyled prop 和 headless 组件之间选择**
>
> `unstyled` prop 适合只想移除单个组件的库样式，但保留其他组件样式时使用。
> 例如，如果 [Tabs](/components/tabs) 组件不符合你的设计系统要求，但其他组件都符合，
> 你可以对 Tabs 使用 `unstyled` prop 移除样式并从头自定义，同时让其他组件保持 ReactUI 样式。
>
> 注意，`unstyled` prop 不会从你的 `.css` 打包文件中移除 ReactUI 库样式——
> 它只是不将这些样式应用到带有 `unstyled` prop 的组件上。

<code src="./unstyled/demo/unstyled.tsx"></code>
