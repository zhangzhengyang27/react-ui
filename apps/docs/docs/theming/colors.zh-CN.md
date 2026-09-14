---
category: Theming
title: Colors
subtitle: 颜色
description: react-ui Colors 文档。
---


## 添加额外颜色

你可以向 `theme.colors` 对象添加任意数量的额外颜色。这样你就可以在所有支持 `color` 属性的组件中使用它们，例如 [Button](/components/button)、[Badge](/components/badge) 和 [Switch](/components/switch)。


> **每种颜色 10 个色阶**
>
> 颜色覆盖必须为**每种颜色至少包含 10 个色阶**。否则你会收到 TypeScript 错误，并且某些变体将没有正确的颜色。如果你只有一种颜色值，可以手动选择剩余颜色，或使用 [颜色生成器工具](/colors-generator)。
>
> 你可以为每种颜色添加超过 10 个色阶：这些值不会被默认颜色解析器用于 ReactUI 组件，但你仍然可以通过索引引用它们，例如 `color="blue.11"`。

<code src="./colors/demo/colorsOverride.tsx"></code>

## 虚拟颜色

虚拟颜色是一种特殊的颜色，其值在浅色和深色配色方案下应该不同。要定义虚拟颜色，请使用 `virtualColor` 函数，它接受一个对象作为单个参数，该对象具有以下属性：

- `name` – 颜色名称，必须与 `theme.colors` 对象中的键相同
- `light` – 浅色配色方案下 `theme.colors` 对象的键
- `dark` – 深色配色方案下 `theme.colors` 对象的键

要查看实际效果，请在浅色和深色配色方案之间切换（`Ctrl + J`）：


虚拟颜色支持 [autoContrast](/docs/theming/theme-object/#autocontrast)：`filled` 组件的文本颜色会根据解析后的背景颜色针对每种配色方案单独计算。在主题或组件上启用 `autoContrast`，并在浅色和深色配色方案之间切换（`Ctrl + J`）以查看文本颜色如何根据底层虚拟颜色进行调整：

<code src="./colors/demo/virtualColors.tsx"></code>

<code src="./colors/demo/virtualColorsAutoContrast.tsx"></code>

## colorsTuple

使用 `colorsTuple` 函数可以：

- 将单一颜色用作所有色阶的相同颜色
- 将动态字符串数组转换为 ReactUI 颜色元组（数组仍应包含 10 个值）

```tsx
import { colorsTuple, createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  colors: {
    custom: colorsTuple('#FFC0CB'),
    dynamic: colorsTuple(
      Array.from({ length: 10 }, (_, index) => '#FFC0CB')
    ),
  },
});
```

## 支持的颜色格式

你可以在 `theme.colors` 中使用以下颜色格式：

- HEX: `#fff`, `#ffffff`
- RGB: `rgb(255, 255, 255)`, `rgba(255, 255, 255, 0.5)`
- HSL: `hsl(0, 0%, 100%)`, `hsla(0, 0%, 100%, 0.5)`
- OKLCH: `oklch(96.27% 0.0217 238.66)`, `oklch(96.27% 0.0217 238.66 / 0.5)`

向主题添加 oklch 颜色的示例：

<code src="./colors/demo/oklch.tsx"></code>

## primaryColor

`theme.primaryColor` 是 `theme.colors` 的键，它的用途包括：

- 作为大多数支持 `color` 属性的组件的默认值
- 设置默认 focus ring 轮廓颜色


> **`theme.primaryColor` 的 CSS 颜色值**
>
> `theme.primaryColor` 的值必须是 `theme.colors` 对象的键。例如，`blue`、`orange` 或 `green`。
> 你不能分配 CSS 颜色值；例如，以下代码会在主题合并期间抛出错误：
>
> ```tsx
> import { UIProvider } from '@xiaoye-react/ui';
>
> function Demo() {
>   return (
>     <UIProvider
>       theme={{
>         primaryColor: '#CEFEDC', // This will throw an error
>       }}
>     >
>       {/* Your app here */}
>     </UIProvider>
>   );
> }
> ```

<code src="./colors/demo/primaryColor.tsx"></code>

## primaryShade

`theme.primaryShade` 是一个 0 到 9 之间的数字。它决定了具有 `color` 属性的组件将使用哪个色阶。


你也可以分别为浅色和深色配色方案自定义 primary shade：

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider theme={{ primaryShade: { light: 6, dark: 8 } }}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

<code src="./colors/demo/primaryShadeConfigurator.tsx"></code>

## color 属性

支持更改颜色的组件具有 `color` 属性。该属性支持以下值：

- `theme.colors` 的键，例如 `blue` 或 `green`
- 带颜色索引的 `theme.colors` 键，例如 `blue.5` 或 `green.9`
- CSS 颜色值，例如 `#fff` 或 `rgba(0, 0, 0, 0.5)`

<code src="./colors/demo/colorProp.tsx"></code>

## 颜色索引参考

你可以在 `color` 属性和 [style props](/docs/styles/style-props) 中通过索引引用颜色，例如 `c` 属性：

<code src="./colors/demo/colorsIndexConfigurator.tsx"></code>

## color 与 c 属性的区别

`color` 属性用于控制组件的多个 CSS 属性。这些属性因组件而异，但通常 `color` 属性控制 `background`、`color` 和 `border-color` CSS 属性。例如，当你在 [Button](/components/button) 组件上设置 `color="#C3FF36"`（`variant="filled"`）时，它会设置以下 CSS 属性：

- `background-color` 为 `#C3FF36`
- 按钮悬停时的 `background-color` 为 `#B0E631`（`#C3FF36` 加深 10%）
- `color` 为 `var(--ui-color-white)`
- `border-color` 为 `transparent`

`c` 是一个 [style prop](/docs/styles/style-props) – 它负责设置单个 CSS 属性 `color`（文本颜色）。你可以组合使用这两个属性以获得更好的文本与背景对比度。在以下示例中：

- `color` 属性设置 `background: #C3FF36` 和 `color: var(--ui-color-white)`
- `c` 属性将颜色样式覆盖为 `color: var(--ui-color-black)`

<code src="./colors/demo/colorAndCProps.tsx"></code>

## 颜色变体解析器

`theme.variantColorResolver` 是一个函数，用于确定以下组件中不同变体使用的颜色：[Alert](/components/alert)、[Avatar](/components/avatar)、[Button](/components/button)、[Badge](/components/badge) 和 [ActionIcon](/components/action-icon)。

它接受一个对象参数，该对象具有以下属性：


`theme.variantColorResolver` 必须返回一个具有以下属性的对象：


你可以使用 `theme.variantColorResolver` 自定义默认变体的颜色处理，或添加对新变体的支持：

```tsx
interface VariantColorsResolverInput {
  /** `color` prop passed to component */
  color: UIColor | undefined;

  /** `variant` prop passed to component */
  variant: string;

  /** `gradient` prop passed to component, used only for gradient variant by default */
  gradient?: UIGradient;

  /** Theme object */
  theme: UITheme;
}
```

```tsx
interface VariantColorResolverResult {
  background: string;
  hover: string;
  color: string;
  border: string;
}
```

<code src="./colors/demo/variantColorsResolver.tsx"></code>

## 颜色生成

你可以使用 [颜色生成器](/colors-generator) 基于单个值生成 10 个色阶，或安装 `@xiaoye-react/colors-generator` 包以在应用中生成动态颜色：

> **ℹ️ 发布状态**：`@xiaoye-react/colors-generator` 尚未发布到 npm，当前随本仓库源码提供。

<InstallScript packages="chroma-js @xiaoye-react/colors-generator"></InstallScript>

该包导出一个 `generateColors` 函数，它接受一个颜色值并返回 10 个色阶的数组。注意，`generateColors` 函数对深色（蓝色、紫色、红色）效果最佳，对浅色（黄色、青色、橙色）可能会产生对比度较差的颜色。通常，最好提前生成颜色以避免对比度问题。

```tsx
import { generateColors } from '@xiaoye-react/colors-generator';
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider
      theme={{
        colors: {
          'pale-blue': generateColors('#375EAC'),
        },
      }}
    >
      {/* Your app here */}
    </UIProvider>
  );
}
```

## 默认颜色

<ThemeColors></ThemeColors>

## 添加自定义颜色类型

TypeScript 在访问主题时只会自动补全 ReactUI 的默认颜色。要将你的自定义颜色添加到 UIColor 类型中，你可以使用 TypeScript 模块声明。

```ts
import {
  DefaultUIColor,
  UIColorsTuple,
} from '@xiaoye-react/ui';

type ExtendedCustomColors =
  | 'primaryColorName'
  | 'secondaryColorName'
  | DefaultUIColor;

declare module '@xiaoye-react/ui' {
  export interface UIThemeColorsOverride {
    colors: Record<ExtendedCustomColors, UIColorsTuple>;
  }
}
```
