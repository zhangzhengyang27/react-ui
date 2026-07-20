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
} from '@react-ui/ui';

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
import { useUIColorScheme } from '@react-ui/ui';

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
import { ColorSchemeScript } from '@react-ui/ui';

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

在 `UIProvider` 和 `ColorSchemeScript` 上设置 `defaultColorScheme="auto"` 以使用系统配色方案。在这种情况下，配色方案值将由用户的操作系统控制：

```tsx
import { ColorSchemeScript, UIProvider } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <UIProvider defaultColorScheme="auto">
        {/* Your app here */}
      </UIProvider>
    </>
  );
}
```

## 配色方案管理器

默认情况下，配色方案值存储在 local storage 中，但你可以实现自己的配色方案管理器，将值存储在任何其他外部存储中。

配色方案管理器必须具有以下方法：


通常，最好将配色方案管理器包装在一个创建函数中，以提供配置方式。默认的基于 local storage 的配色方案管理器示例：


然后可以将自定义配色方案管理器传递给 [UIProvider](/docs/theming/ui-provider)：

```tsx
interface UIColorSchemeManager {
  /** Function to retrieve color scheme value from external storage, for example window.localStorage */
  get: (defaultValue: UIColorScheme) => UIColorScheme;

  /** Function to set color scheme value in external storage, for example window.localStorage */
  set: (value: UIColorScheme) => void;

  /** Function to subscribe to color scheme changes triggered by external events */
  subscribe: (
    onUpdate: (colorScheme: UIColorScheme) => void
  ) => void;

  /** Function to unsubscribe from color scheme changes triggered by external events */
  unsubscribe: () => void;

  /** Function to clear value from external storage */
  clear: () => void;
}
```

```tsx
import {
  isUIColorScheme,
  UIColorScheme,
  UIColorSchemeManager,
} from '@react-ui/ui';

export interface LocalStorageColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `ui-color-scheme-value` by default */
  key?: string;
}

export function localStorageColorSchemeManager({
  key = 'ui-color-scheme-value',
}: LocalStorageColorSchemeManagerOptions = {}): UIColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (defaultValue) => {
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      try {
        return (
          (window.localStorage.getItem(key) as UIColorScheme) ||
          defaultValue
        );
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          '[@react-ui/ui] Local storage color scheme manager was unable to save color scheme.',
          error
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (
          event.storageArea === window.localStorage &&
          event.key === key
        ) {
          isUIColorScheme(event.newValue) &&
            onUpdate(event.newValue);
        }
      };

      window.addEventListener('storage', handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener('storage', handleStorageEvent);
    },

    clear: () => {
      window.localStorage.removeItem(key);
    },
  };
}
```

```tsx
import { UIProvider } from '@react-ui/ui';
import { localStorageColorSchemeManager } from './localStorageColorSchemeManager';

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-color-scheme',
});

function Demo() {
  return (
    <UIProvider colorSchemeManager={colorSchemeManager}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## 默认配色方案

当用户尚未选择任何配色方案时，将使用默认配色方案值。它必须同时设置在 [UIProvider](/docs/theming/ui-provider/) 和 `ColorSchemeScript` 上。如果未设置 `defaultColorScheme`，则使用 `light`。

```tsx
import { ColorSchemeScript, UIProvider } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="dark" />
      <UIProvider defaultColorScheme="dark">
        {/* Your app here */}
      </UIProvider>
    </>
  );
}
```

## 强制配色方案

你可以使用 `forceColorScheme` 属性将配色方案值强制为 `light` 或 `dark`。它必须同时设置在 [UIProvider](/docs/theming/ui-provider/) 和 `ColorSchemeScript` 上。如果设置了 `forceColorScheme`，则 `defaultColorScheme` 和 `colorSchemeManager` 将被忽略。当设置了 `forceColorScheme` 时，无法使用 `setColorScheme` 函数更改配色方案值。

```tsx
import { ColorSchemeScript, UIProvider } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <ColorSchemeScript forceColorScheme="light" />
      <UIProvider forceColorScheme="light">
        {/* Your app here */}
      </UIProvider>
    </>
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
import '@react-ui/ui/styles.css';

import { ColorSchemeScript, UIProvider } from '@react-ui/ui';

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
