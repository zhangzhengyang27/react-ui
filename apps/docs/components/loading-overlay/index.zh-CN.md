---
category: Components
title: LoadingOverlay
subtitle: 加载遮罩
description: react-ui LoadingOverlay 加载遮罩组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在某个区域（如卡片、表格）加载时覆盖一层半透明加载指示器时使用。

## 代码演示 {#examples}

### 用法

`LoadingOverlay` 会在具有相对定位的父元素上渲染一个带加载器的遮罩层。它通常用于指示表单的加载状态。注意，遮罩层下方的元素仍可通过键盘聚焦，因此请记得添加额外逻辑来处理这种情况。

`LoadingOverlay` 的渲染由 `visible` 属性控制：

<code src="./demo/usage.tsx"></code>

### Loader 属性

可使用 `loaderProps` 将属性传递给 [Loader](/components/loader) 组件，使用 `overlayProps` 将属性传递给
[Overlay](/components/overlay) 组件（遮罩层层级通过 `overlayProps.zIndex` 设置）：

<code src="./demo/loaderProps.tsx"></code>

### 自定义行内加载器

要将默认加载器替换为任何自定义内容，请设置 `loaderProps={{ children: <div>你的内容</div> }}`。可在 `loaderProps.children` 中放置任何 React 节点：

<code src="./demo/customLoader.tsx"></code>

## API {#api}

### LoadingOverlayProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否可见 | `boolean` | `true` |
| loaderProps | 加载指示器属性 | `LoaderProps` | — |
| overlayProps | 遮罩层属性，`zIndex` 等层级设置也在此传入 | `OverlayProps` | — |

除上表所列属性外，LoadingOverlay 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
