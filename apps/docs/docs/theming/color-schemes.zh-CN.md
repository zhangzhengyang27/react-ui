---
category: Theming
title: ColorSchemes
subtitle: 配色方案
description: react-ui ColorSchemes 文档。
---


## data-ui-color-scheme 属性

当 [UIProvider](/docs/theming/ui-provider/) 挂载时，它会在 `<html />` 元素上设置一个 `data-ui-color-scheme` 属性，值为用户之前选择的值或 `defaultColorScheme` 属性的值。`data-ui-color-scheme` 属性用于所有组件样式中，以确定每个组件应使用哪些颜色。

## use-ui-color-scheme hook

`useUIColorScheme` hook 可用于获取和设置当前配色方案值：

```tsx
function useUIColorScheme(): {
  /** Current color scheme value */
  colorScheme: 'dark' | 'light' | 'auto';

  /** Sets colors scheme to given value */
  setColorScheme: (colorScheme: 'dark' | 'light' | 'auto') => void;

  /** Toggles color scheme to the opposite value; if value is 'auto', color scheme is inferred from the OS settings */
  toggleColorScheme: () => void;

  /** Clears the color scheme value from storage and sets it to `defaultColorScheme` */
  clearColorScheme: () => void;
};
```

<code src="./color-schemes/demo/colorScheme.tsx"></code>

## use-computed-color-scheme hook

`useComputedUIColorScheme` 返回计算后的配色方案值——它返回 `light` 或 `dark`。它可用于实现配色方案切换逻辑：

```tsx
import {
  useComputedUIColorScheme,
  useUIColorScheme,
} from '@xiaoye-react/ui';

function Demo() {
  // -> colorScheme 是 'auto' | 'light' | 'dark'
  const { colorScheme, setColorScheme } = useUIColorScheme();

  // -> computedColorScheme 是 'light' | 'dark'，参数是默认值
  const computedColorScheme = useComputedUIColorScheme('light');

  // 错误的配色方案切换实现
  // 如果 colorScheme 是 'auto'，则无法在所有情况下正确更改配色方案：
  // 'auto' 可能表示 light 也可能表示 dark
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  // 正确的配色方案切换实现
  // computedColorScheme 始终为 'light' 或 'dark'
  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };
}
```

## 配色方案切换时的过渡动画

默认情况下，在配色方案更改时会禁用所有元素上的过渡动画，以避免不一致的动画效果。要在配色方案更改期间启用过渡动画，请在 `useUIColorScheme` hook 上设置 `keepTransitions: true` 选项：

```tsx
import { useUIColorScheme } from '@xiaoye-react/ui';

function Demo() {
  const { colorScheme, setColorScheme } = useUIColorScheme({
    keepTransitions: true,
  });
}
```

## 配色方案值的注意事项

默认情况下，配色方案值存储在 local storage 中，其值会在组件挂载之前保存到 state 中，以避免出现不准确的配色方案闪烁。这意味着配色方案值在客户端和服务器上可能不同，因为服务器无法访问 local storage，并且始终使用默认值。

如果你的应用中有服务端渲染（例如，如果你使用 [Next.js](/docs/guides/next) 或 [React Router](/docs/guides/react-router)），那么你不能在应用中使用 `colorScheme` 值以避免 hydration 问题。相反，你可以使用 [postcss-preset-ui](/docs/styles/postcss-preset) 中的 `dark` 和 `light` mixins 来生成根据配色方案值隐藏元素的样式：


> **纯客户端应用的 colorScheme**
>
> 你可以在纯客户端应用中安全地使用 `colorScheme` 值（例如 Vite 或 create-react-app 应用）。在这种情况下，没有 hydration，因此不会发生 hydration 错误。

<code src="./color-schemes/demo/colorSchemeControl.tsx"></code>

## ColorSchemeScript

`ColorSchemeScript` 组件会渲染一个 script 标签，在 hydration 之前将 `<html />` 元素上的 `data-ui-color-scheme` 属性设置为用户选择的值或 `defaultColorScheme` 属性的值。它用于避免服务端渲染应用中出现不准确的配色方案闪烁，例如 [Next.js](/docs/guides/next) 或 [React Router](/docs/guides/react-router)。请遵循特定框架的指南以了解在哪里渲染 `ColorSchemeScript` 组件。

你可以向 `ColorSchemeScript` 组件生成的 `<script />` 标签添加任何额外的属性，例如，你可以添加一个 [nonce](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce) 属性：

```tsx
import { ColorSchemeScript } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ColorSchemeScript
      nonce="8IBTHwOdqNKAWeKl7plt8g=="
      defaultColorScheme="dark"
    />
  );
}
```

## 自动配色方案

在 `ColorSchemeScript` 上设置 `defaultColorScheme="auto"`，并在 `UIProvider` 上设置 `colorScheme="auto"`，以使用系统配色方案。在这种情况下，配色方案值将由用户的操作系统控制：

```tsx
import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <UIProvider colorScheme="auto">
        {/* Your app here */}
      </UIProvider>
    </>
  );
}
```

## 配色方案持久化

`UIProvider` 的 `colorScheme` 是受控属性，组件内部**不会**自动把配色方案写入 local storage。
如需持久化，请自行管理状态并在切换时写入存储：

```tsx
import { useState } from 'react';
import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

function App() {
  const [colorScheme, setColorScheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }
    return window.localStorage.getItem('my-app-color-scheme') ?? 'light';
  });

  const handleColorSchemeChange = (value: string) => {
    setColorScheme(value);
    window.localStorage.setItem('my-app-color-scheme', value);
  };

  return (
    <UIProvider colorScheme={colorScheme as any}>
      <button onClick={() => handleColorSchemeChange(colorScheme === 'light' ? 'dark' : 'light')}>
        切换配色方案
      </button>
      {/* Your app here */}
    </UIProvider>
  );
}
```

切换配色方案也可以使用 `use-ui-color-scheme` hook（见上文），它会调用 `UIProvider`
上下文的 `setColorScheme` / `toggleColorScheme`，持久化逻辑同样需要你自己接入。

## 默认配色方案

`ColorSchemeScript` 支持 `defaultColorScheme` 属性（`light` / `dark` / `auto`），
用于在服务端渲染时把 `data-ui-color-scheme` 属性直接写到 `<html />` 上，避免首屏闪烁：

```tsx
import { ColorSchemeScript } from '@xiaoye-react/ui';

function Demo() {
  return <ColorSchemeScript defaultColorScheme="dark" />;
}
```

注意，`UIProvider` 本身**没有** `defaultColorScheme` 属性：未受控时其内部状态初始为 `light`，
挂载后会覆写 `data-ui-color-scheme` 属性。如果你希望应用默认使用深色方案，
请使用受控的 `colorScheme` prop 并自行管理初始值（见上文「配色方案持久化」）。

## 强制配色方案

`ColorSchemeScript` 支持 `forceColorScheme` 属性，将服务端渲染的配色方案强制为 `light` 或 `dark`：

```tsx
import { ColorSchemeScript } from '@xiaoye-react/ui';

function Demo() {
  return <ColorSchemeScript forceColorScheme="light" />;
}
```

如果需要在应用运行期间强制固定配色方案（不允许用户切换），
使用受控的 `colorScheme` prop 并传入固定值即可：

```tsx
import { UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider colorScheme="light">
      {/* Your app here */}
    </UIProvider>
  );
}
```

## lightHidden 和 darkHidden 属性

所有 ReactUI 组件都支持 `lightHidden` 和 `darkHidden` 属性，可用于在特定配色方案下隐藏组件：

<code src="./color-schemes/demo/lightDarkHidden.tsx"></code>

## 禁用 JavaScript 的情况

如果你需要支持禁用 JavaScript 的用户，你需要手动在 `<html />` 元素上设置 `data-ui-color-scheme` 属性。

支持禁用 JavaScript 的 Next.js app router 示例：

```tsx
import '@xiaoye-react/ui/style.css';

import { ColorSchemeScript, UIProvider } from '@xiaoye-react/ui';

export const metadata = {
  title: 'My ReactUI app',
  description: 'I have followed setup instructions carefully',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-ui-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
```
