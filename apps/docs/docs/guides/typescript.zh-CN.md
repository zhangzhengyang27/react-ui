---
category: Guides
title: Typescript
subtitle: TypeScript
description: react-ui Typescript 文档。
---


## 组件 props 类型

每个导出组件的 `@xiaoye-react/` 包也会导出这些组件的 props 类型。
你可以在组件名后添加 `Props` 来导入组件的 props 类型。
例如，可以像这样导入 Button 和 DatePicker 的组件 props：


注意，props 类型有两种变体：多态组件和普通组件。
普通组件的 props 类型包含 `React.ComponentProps<'X'>`，其中 `X` 是根元素类型，例如 `'div'`。

扩展普通组件 props 的示例：

```tsx
import type { ButtonProps } from '@xiaoye-react/ui';
import type { DatePickerProps } from '@xiaoye-react/ui';
```

```tsx
import { Group, GroupProps } from '@xiaoye-react/ui';

// 接口包含 `React.ComponentProps<'div'>`
interface MyGroupProps extends GroupProps {
  spacing: number;
}

function MyGroup({ spacing, ...others }: MyGroupProps) {
  return <Group my={spacing} {...others} />;
}
```

## 多态组件 props 类型

[多态组件](/docs/guides/polymorphic)的 props 类型不包含 `React.ComponentProps<'X'>`，
因为它们的根元素取决于 `component` 属性的值。

扩展多态组件 props 的示例：

```tsx
import { Button, ButtonProps, ElementProps } from '@xiaoye-react/ui';

interface MyButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  height: number;
}

function MyButton({ height, ...others }: MyButtonProps) {
  return <Button style={{ height }} {...others} />;
}
```

## 命名空间类型

所有 ReactUI 组件都会导出包含相关类型的命名空间。例如，可以通过 `Button.Props` 访问 [Button](/components/button) 组件的 props：

```tsx
import {  Button } from '@xiaoye-react/ui';

// 与 `import type { ButtonProps } from '@xiaoye-react/ui';` 相同
type MyButtonProps = Button.Props;
```

## ElementProps 类型

`ElementProps` 是一个与 `React.ComponentProps` 类似的工具类型，但具有额外的功能。
它会将原生元素的 `style` 属性替换为 ReactUI 的 [style prop](/docs/styles/style)，
并允许通过第二个类型参数省略某些属性。

```tsx
import { ButtonProps, ElementProps } from '@xiaoye-react/ui';

// 等价于 `React.ComponentProps<'button'>`
type ButtonElementProps = ElementProps<'button'>;

// 等价于 `Omit<React.ComponentProps<'button'>, 'color' | 'onClick'>`
type OmitColor = ElementProps<'button', 'color' | 'onClick'>;

// 从 React 组件 props 中移除所有 ReactUI 组件 props，以避免 props 类型冲突
// 等价于 `Omit<React.ComponentProps<'button'>, keyof ButtonProps>`
type OmitButtonProps = ElementProps<'button', keyof ButtonProps>;
```

## UITheme 类型

`UITheme` 是 [theme object](/docs/theming/theme-object) 的类型。你可以用它来为接受 theme 对象作为参数的函数添加类型：

```tsx
import { UITheme, useUITheme } from '@xiaoye-react/ui';

function getPrimaryColor(theme: UITheme) {
  return theme.colors.blue[5];
}

function Demo() {
  const theme = useUITheme();
  return <div style={{ color: getPrimaryColor(theme) }} />;
}
```

## UIThemeOverride 类型

`UIThemeOverride` 类型是 `UITheme` 的深层 Partial。它可以用于接受 theme override 作为参数的函数：

```tsx
import {
  createTheme,
  UIThemeOverride,
  mergeThemeOverrides,
} from '@xiaoye-react/ui';

const baseTheme = createTheme({
  fontFamily: 'Helvetica, sans-serif',
});

function mergeThemes(themes: UIThemeOverride[]) {
  return mergeThemeOverrides(baseTheme, ...themes);
}

const overrideTheme = createTheme({
  primaryColor: 'blue',
});

const overrideTheme2 = createTheme({
  cursorType: 'pointer',
});

const mergedTheme = mergeThemes([overrideTheme, overrideTheme2]);
```

## UIColorScheme 类型

`UIColorScheme` 是 `'light' | 'dark' | 'auto'` 的联合类型。你可以用它来为接受 color scheme 作为参数的函数添加类型：

```tsx
import {
  UIColorScheme,
  useUIColorScheme,
} from '@xiaoye-react/ui';

function getComputedColorScheme(colorScheme: UIColorScheme) {
  return colorScheme === 'auto' ? 'light' : colorScheme;
}

function Demo() {
  const { colorScheme } = useUIColorScheme();
  const computed = getComputedColorScheme(colorScheme);
}
```

## UISize 类型

`UISize` 类型是 `'xs' | 'sm' | 'md' | 'lg' | 'xl'` 的联合类型。你可以用它来为各种接受 size 参数的 props 添加类型，例如 `radius`、`shadow`、`p`。

```tsx
import { UISize, Paper } from '@xiaoye-react/ui';

interface DemoProps {
  size: UISize;
  radius: UISize | (string & {}) | number;
  shadow: UISize | string;
}

function Demo({ size, radius, shadow }: DemoProps) {
  return <Paper radius={radius} shadow={shadow} p={size} m={size} />;
}
```

## 主题对象声明

你可以通过在 `.d.ts` 文件中扩展 `UITheme` 接口来更改 `theme.other` 和 `theme.colors` 的类型。
在项目的任意位置创建 `ui.d.ts`（必须包含在 `tsconfig.json` 中）以扩展主题对象类型。

覆盖 `theme.other`：


覆盖 `theme.colors`：


你还可以以类似方式自定义与 size 相关的类型，包括 `theme.spacing`、`theme.radius`、
`theme.breakpoints`、`theme.fontSizes`、`theme.lineHeights` 和 `theme.shadows`。

覆盖 `theme.spacing` 和 `theme.radius`


注意，扩展主题类型并非必需；只有当你希望让主题对象类型更严格，并在编辑器中获得自动补全时，才需要这样做。

```tsx
// ui.d.ts
declare module '@xiaoye-react/ui' {
  export interface UIThemeOther {
    myCustomProperty: string;
    myCustomFunction: () => void;
  }
}
```

```tsx
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

```tsx
import {
  DefaultUISize,
  UIThemeSizesOverride,
} from '@xiaoye-react/ui';

type ExtendedCustomSpacing =
  | 'xxl'
  | 'xxxs'
  | DefaultUISize;

type ExtendedCustomRadius =
  | 'xxs'
  | DefaultUISize;

declare module '@xiaoye-react/ui' {
  export interface UIThemeSizesOverride {
    spacing: Record<ExtendedCustomSpacing, string>;
    radius: Record<ExtendedCustomRadius, string>;
  }
}
```

## 自定义变体类型

你可以通过在 `ui.d.ts` 文件中使用新的 variant 类型扩展 `{x}Props` 接口，
来为自定义 [variants](/docs/styles/variants-sizes) 定义类型。

为 [Button](/components/button) 组件添加自定义 variant 类型的示例：

```tsx
import { ButtonVariant, UISize } from '@xiaoye-react/ui';

type ExtendedButtonVariant = ButtonVariant | 'contrast' | 'radial-gradient';

declare module '@xiaoye-react/ui' {
  export interface ButtonProps {
    variant?: ExtendedButtonVariant;
  }
}
```
