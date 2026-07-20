---
category: Hooks
title: UseDocumentVisibility
subtitle: 文档可见性
description: react-ui 文档可见性 Hook 文档。
---


## 用法

`use-document-visibility` Hook 返回当前的 [document.visibilityState](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
——它允许你检测当前标签页是否处于活动状态：

<code src="./use-document-visibility/demo/usage.tsx"></code>

## 类型定义

```tsx
// DocumentVisibilityState 是 'visible' | 'hidden'
function useDocumentVisibility(): DocumentVisibilityState;
```
