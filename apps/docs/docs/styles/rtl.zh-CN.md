---
category: Styles
title: Rtl
subtitle: RTL
description: react-ui Rtl 文档。
---


## DirectionProvider

`DirectionProvider` 组件用于为内部所有组件设置方向。
如果你计划使用 RTL 方向或需要动态切换方向，必须用 `DirectionProvider` 包裹你的应用。

`DirectionProvider` 支持以下 props：


在应用中配置 `DirectionProvider`：

```tsx
export interface DirectionProviderProps {
  /** Your application */
  children: React.ReactNode;

  /** Direction set as a default value, `ltr` by default */
  initialDirection?: 'rtl' | 'ltr';

  /** Determines whether direction should be updated on mount based on the `dir` attribute set on the root element (usually the html element), `true` by default  */
  detectDirection?: boolean;
}
```

```tsx
import { DirectionProvider, UIProvider } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DirectionProvider>
      <UIProvider>{/* Your app here */}</UIProvider>
    </DirectionProvider>
  );
}
```

## dir 属性

你需要在应用的根元素（通常是 `html` 元素）上设置 `dir` 属性。
如果 `detectDirection` prop 设置为 `true`，`DirectionProvider` 会在挂载时读取该属性来设置方向。
注意，本指南不介绍如何在不同框架中设置 `dir` 属性——请参考所使用框架的官方文档。

```html
<!doctype html>
<!-- Set direction attribute on html element -->
<html dir="rtl">
  <head></head>
  <body></body>
</html>
```

## useDirection hook

`useDirection` 返回一个包含以下属性的对象：

- `dir` – 当前方向
- `setDirection` – 设置方向的函数
- `toggleDirection` – 切换到相反方向的函数

你可以用它来实现应用中的方向切换控件：

<code src="./rtl/demo/directionControl.tsx"></code>

## rtl mixin

如果你已安装 [postcss-preset-ui](/docs/styles/postcss-preset)，可以在 `.css` 文件中使用 `rtl` mixin：

<code src="./rtl/demo/rtlMixin.tsx"></code>
