---
category: Components
title: Splitter
subtitle: 分割面板
description: react-ui Splitter 分割面板组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要将区域拆分为可拖拽调整大小的多个面板（类似 IDE 布局）时使用。

## 代码演示 {#examples}

### 用法

`Splitter` 组件提供可调整大小的分屏布局：面板之间自动渲染拖动条，拖动后的尺寸由组件内部状态管理，
初始时各面板等分容器空间。组件支持 Styles API 与 `orientation` 属性。

<code src="./demo/usage.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以垂直分割面板：

<code src="./demo/vertical.tsx"></code>

### 多个面板

`Splitter` 支持任意数量的面板。拖动条会自动渲染在面板之间：

<code src="./demo/multiple.tsx"></code>

### 嵌套 splitter

可嵌套 `Splitter` 组件以创建复杂布局：

<code src="./demo/nested.tsx"></code>

### 重新分配

使用多个面板时，设置 `redistribute` 属性以控制当直接相邻面板达到其最小/最大值时，
如何从非相邻面板借用空间：

<code src="./demo/redistribute.tsx"></code>

### 线条尺寸

使用 `lineSize` 属性控制面板之间分隔线的粗细：

<code src="./demo/lineSize.tsx"></code>

### 包裹 Splitter.Pane

`Splitter` 组件依赖 `Splitter.Pane` 的顺序。不支持包裹 `Splitter.Pane`，
`Splitter.Pane` 必须是 `Splitter` 的直接子元素。

```tsx
import { Splitter } from '@xiaoye-react/ui';

// 这样不会生效——被包裹的面板不会被识别
function WillNotWork() {
  return (
    <Splitter.Pane min={20}>
      This part will not render correctly
    </Splitter.Pane>
  );
}

// 改为为面板内容创建单独的组件
function PaneContent() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Splitter h={200}>
      <Splitter.Pane min={20}>
        First pane
      </Splitter.Pane>
      {/* 不要将 Splitter.Pane 包裹在另一个组件中 */}
      {/* <WillNotWork /> */}
      <Splitter.Pane min={20}>
        <PaneContent />
      </Splitter.Pane>
    </Splitter>
  );
}
```



## API {#api}

### SplitterProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 面板内容，至少两个 `Splitter.Pane` | `ReactNode` | — |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
