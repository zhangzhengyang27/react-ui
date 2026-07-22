---
category: Hooks
title: UseFullscreen
subtitle: 全屏控制
description: react-ui 全屏控制 Hook 文档。
---


## 用法

`use-fullscreen` Hook 允许你使用 [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API) 为给定元素进入/退出全屏。
默认情况下，如果你未提供 `ref`，Hook 将目标设为 `document.documentElement`：

<code src="./use-fullscreen/demo/usage.tsx"></code>

## 自定义目标元素

该 Hook 返回一个可选的 `ref` 函数，可将其传递给元素作为根。
请务必遵循最佳实践，避免[迷惑或困住最终用户](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API/Guide#things_your_users_want_to_know)：

<code src="./use-fullscreen/demo/ref.tsx"></code>

## 移动 Safari 限制

移动 Safari（尤其是 iPhone）对 Fullscreen API 的支持有限。在很多情况下，全屏仅支持 `<video>` 元素，
可能无法用于任意元素（包括 `document.documentElement`）。

`use-fullscreen` 在可能的情况下包含 Safari 特定的降级方案，但它无法绕过浏览器/平台限制。

另请注意，进入全屏通常需要直接的用户交互（例如，按钮点击）。

## 类型定义

```tsx
interface UseFullscreenElementReturnValue<T extends HTMLElement = any> {
  ref: React.RefCallback<T | null>;
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

interface UseFullscreenDocumentReturnValue {
  toggle: () => Promise<void>;
  fullscreen: boolean;
}

function useFullscreenElement<T extends HTMLElement = any>(): UseFullscreenElementReturnValue<T>
function useFullscreenDocument(): UseFullscreenDocumentReturnValue
```

## 导出类型

`UseFullscreenElementReturnValue` 和 `UseFullscreenDocumentReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseFullscreenElementReturnValue, UseFullscreenDocumentReturnValue } from '@xiaoye-react/hooks';
```
