---
category: Styles
title: VariantsSizes
subtitle: 变体与尺寸
description: react-ui VariantsSizes 文档。
---


## 添加自定义变体

大多数 ReactUI 组件都支持 `variant` prop。它可以在 CSS 变量解析器中使用，
同时也会作为 `data-variant="{value}"` 属性暴露在组件的根元素上。
添加自定义变体最简单的方式，就是编写使用 `[data-variant="{value}"]` 的样式。

为 [Input](/components/input) 组件添加新变体的示例：

- 已添加 `underline` 变体样式
- `filled` 是默认变体——你无需为它定义额外样式


注意，你可以为任何支持 [Styles API](/docs/styles/styles-api) 的 ReactUI 组件添加自定义变体，
即使库本身没有为该组件预定义变体。

> **覆盖已有变体样式**
>
> 除了添加新变体外，你还可以覆盖已有变体，例如使用 `.input[data-variant="filled"]` 选择器
> 来修改 [Input](/components/input) 组件的 `filled` 变体。

<code src="./variants-sizes/demo/customVariant.tsx"></code>

## 自定义变体类型

你可以通过在项目中创建 `ui.d.ts` 文件，并用新的变体类型扩展 `{x}Props` 接口，
来为自定义变体定义类型。

为 [Button](/components/button) 组件添加自定义变体类型的示例：

```tsx
import { ButtonVariant, UISize } from '@react-ui/ui';

type ExtendedButtonVariant = ButtonVariant | 'contrast' | 'radial-gradient';

declare module '@react-ui/ui' {
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
}
```

## variantColorResolver

[Button](/components/button)、[Badge](/components/badge)、[ActionIcon](/components/action-icon) 等
组件都支持通过 [variantColorResolver](/docs/theming/colors#colors-variant-resolver) 使用自定义变体——
它既可以改变颜色，也可以添加新变体。注意 `theme.variantColorResolver` 只负责颜色相关逻辑。
如果你需要修改其他属性，请使用 `data-variant` 属性。

<code src="./variants-sizes/demo/variantColorsResolver.tsx"></code>

## 使用组件 CSS 变量设置尺寸

你可以通过提供自定义 CSS 变量解析器，为任何支持 `size` prop 的组件添加自定义尺寸。
通常这在 `theme.components` 中完成：

<code src="./variants-sizes/demo/vars.tsx"></code>

## 使用 data-size 属性设置尺寸

每个支持 `size` prop 的组件都会将其作为 `data-size="{value}"` 属性暴露在根元素上。
你可以利用它来添加自定义尺寸：

<code src="./variants-sizes/demo/dataSize.tsx"></code>

## 使用静态 CSS 变量设置尺寸

ReactUI 组件的尺寸通常通过 CSS 变量（一般在根元素上）定义。例如，
[ActionIcon](/components/action-icon) 组件有以下 CSS 变量：


你可以通过 [Styles API](/docs/styles/styles-api) 覆盖这些值，或添加新的尺寸值：


注意，部分组件的尺寸由多个 CSS 变量控制。例如，
[Button](/components/button) 组件有以下 CSS 变量：


通常，在这种情况下使用 `data-size` 属性或 [theme](/docs/theming/theme-object) 上的 `vars` 会更加方便。

```css
.root {
  --ai-size-xs: 18px;
  --ai-size-sm: 22px;
  --ai-size-md: 28px;
  --ai-size-lg: 34px;
  --ai-size-xl: 44px;
}
```

```css
.root {
  --button-height-xs: 30px;
  --button-height-sm: 36px;
  --button-height-md: 42px;
  --button-height-lg: 50px;
  --button-height-xl: 60px;

  --button-height-compact-xs: 22px;
  --button-height-compact-sm: 26px;
  --button-height-compact-md: 30px;
  --button-height-compact-lg: 34px;
  --button-height-compact-xl: 40px;

  --button-padding-x-xs: 14px;
  --button-padding-x-sm: 18px;
  --button-padding-x-md: 22px;
  --button-padding-x-lg: 26px;
  --button-padding-x-xl: 32px;

  --button-padding-x-compact-xs: 7px;
  --button-padding-x-compact-sm: 8px;
  --button-padding-x-compact-md: 10px;
  --button-padding-x-compact-lg: 12px;
  --button-padding-x-compact-xl: 14px;
}
```

<code src="./variants-sizes/demo/customSize.tsx"></code>
