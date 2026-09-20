---
category: Styles
title: UiStyles
subtitle: UI 样式
description: react-ui UiStyles 文档。
---


## ReactUI 组件样式

所有 ReactUI 组件都是使用 CSS modules 构建的，但所有样式在发布到 npm 之前都已打包。要包含这些样式，你需要在应用中导入 `@xiaoye-react/{package}/styles.css` 文件。以 `@xiaoye-react/ui` 包为例：


通过添加此导入，你的应用中将包含所有 `@xiaoye-react/ui` 组件的样式。

```tsx
import '@xiaoye-react/ui/style.css';
```

## 按组件导入样式

如果你想减小 CSS 包大小，可以按组件导入样式。注意，某些组件有依赖项。例如，[Button](/components/button) 组件内部使用 [UnstyledButton](/components/unstyled-button) 组件，因此你需要同时导入这两个组件的样式。你可以在[此页面](/docs/styles/css-files-list)找到 `@xiaoye-react/ui` 包导出的所有样式列表和附加说明。


注意，单个组件样式仅适用于 `@xiaoye-react/ui` 包。其他包具有最小样式，可以使用 `@xiaoye-react/{package}/styles.css` 导入。

```tsx
import '@xiaoye-react/ui/style.css';
```

## 样式导入顺序

保持正确的样式导入顺序很重要。`@xiaoye-react/ui` 包的样式必须始终在其他 ReactUI 包样式之前导入：


你的应用样式必须始终在所有 `@xiaoye-react/*` 包样式之后导入：

```tsx
// ✅ 正确顺序
import '@xiaoye-react/ui/style.css';
import './application.css';
// ❌ 错误顺序
import './application.css';
import '@xiaoye-react/ui/style.css';
```

```tsx
// ✅ 正确顺序 - 你的样式将覆盖 ReactUI 样式
import '@xiaoye-react/ui/style.css';
import './application.css';
import classes from './Demo.module.css';

// ❌ 错误顺序 – ReactUI 样式将覆盖你的样式
import classes from './Demo.module.css';
import '@xiaoye-react/ui/style.css';
```

## CSS 层

某些打包工具和框架不允许你控制应用中样式表的顺序。例如，Next.js 不保证[样式导入顺序](https://github.com/vercel/next.js/issues/16630)。在这种情况下，你可以使用 [CSS layers](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) 来确保你的样式始终覆盖 ReactUI 样式。

当前 `@xiaoye-react/ui` 仅提供 `style.css`（**不包含** `@layer ui` 包裹的 layer 变体）。
带 layer 变体（`styles.layer.css`）的版本在规划中，尚未随包发布——下文示例仅说明 layer 变体发布后的预期用法：

```tsx
// layer 变体发布后，可导入带 @layer ui 指令的单包样式
import '@xiaoye-react/ui/styles.layer.css';

// ... 其他样式
```

```tsx
// ❌ 届时不要同时导入同一包的 style.css 和 styles.layer.css
import '@xiaoye-react/ui/style.css';
import '@xiaoye-react/ui/styles.layer.css';
```

## CSS layers 的工作原理

层内的 CSS 规则会被组合在一起，并在没有层的规则之前应用。这意味着即使你无法控制样式导入顺序，仍然可以使用常规样式覆盖 ReactUI 样式。


如果你想将 ReactUI 组件与其他也提供样式的库结合使用，CSS layers 也很有用。你可以使用 `@layer` 指令来控制样式顺序：


在此示例中，ReactUI 样式将优先于其他库的 `base` 样式，但其他库的 `components` 样式将优先于 ReactUI 组件样式。

截至 2026 年 1 月，CSS layers 已在所有现代浏览器中得到支持，并拥有 [95% 的浏览器支持率](https://caniuse.com/css-cascade-layers)。

```tsx
// ✅ 如果你的样式没有包裹在 @layer 指令中，
// 它们将在 ReactUI 样式之后应用
import classes from './Demo.module.css';

import '@xiaoye-react/ui/styles.layer.css';
```

```scss
@layer base, ui, components;
```

## 从 CDN 加载样式

你也可以从 unpkg CDN 加载 ReactUI 样式。注意，在这种情况下，建议在你的 `package.json` 和 CDN 链接中都指定 `@xiaoye-react/*` 包的确切版本。


unpkg CDN 上的样式适用于所有导出样式的 ReactUI 包。

```html
<!-- 常规样式 -->
<link
  rel="stylesheet"
  href="https://unpkg.com/@xiaoye-react/ui@2.1.0/styles.css"
/>

<!-- layer 变体（styles.layer.css）暂未提供 -->
```
