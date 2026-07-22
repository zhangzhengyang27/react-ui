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

`Splitter` 组件提供可调整大小的分屏布局。它基于
[use-splitter](/docs/hooks/use-splitter/) Hook 构建，并提供声明式 API 与
Styles API 集成。

<code src="./demo/usage.tsx"></code>

### CSS 单位

`Splitter.Pane` 的 `defaultSize`、`min` 和 `max` 属性除了普通数字外，还接受 CSS 单位：

- 普通 `number` 或 `%` 字符串（`'30%'`）是**弹性**尺寸——面板与其他弹性面板共享剩余空间。
- `px` 或 `rem` 字符串（`'240px'`、`'15rem'`）是**固定**尺寸——当容器大小改变时，面板保持其像素尺寸，仅在其自身拖动条被拖动时才会改变。

这使得可以将固定宽度的侧边栏与吸收剩余空间的流体内容面板混合使用：


尺寸会以声明时的单位回传：`'240px'` 面板在 `sizes` / `onSizeChange` 中保持为 `'240px'`，
而弹性面板会报告其解析后的百分比。当容器小于固定面板之和时，固定面板会按比例缩小。

<code src="./demo/cssUnits.tsx"></code>

### 垂直方向

设置 `orientation="vertical"` 以垂直分割面板：

<code src="./demo/vertical.tsx"></code>

### 可折叠面板

在 `Splitter.Pane` 上设置 `collapsible` 属性，允许通过拖动超过最小尺寸来折叠面板。
使用 `splitterRef` 访问命令式 API 以编程方式折叠/展开：

<code src="./demo/collapsible.tsx"></code>

### 受控模式

要控制面板尺寸，请使用 `sizes` 和 `onSizeChange` 属性：

<code src="./demo/controlled.tsx"></code>

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

### 无拖动柄

设置 `withHandle={false}` 以隐藏带 grip 图标的拖动柄。面板之间的分隔线
仍然可见且可拖动：

<code src="./demo/withHandle.tsx"></code>

### 命令式 API

使用 `splitterRef` 属性访问 splitter 的命令式 API：

```tsx
import { useRef } from 'react';
import { Splitter } from '@xiaoye-react/ui';
import { UseSplitterReturnValue } from '@xiaoye-react/hooks';

function Demo() {
  const splitterRef = useRef<UseSplitterReturnValue>(null);

  return (
    <>
      <button onClick={() => splitterRef.current?.collapse(0)}>
        Collapse first pane
      </button>
      <Splitter splitterRef={splitterRef}>
        <Splitter.Pane defaultSize={50} min={20} collapsible>
          First pane
        </Splitter.Pane>
        <Splitter.Pane defaultSize={50} min={20}>
          Second pane
        </Splitter.Pane>
      </Splitter>
    </>
  );
}
```

### 包裹 Splitter.Pane

`Splitter` 组件依赖 `Splitter.Pane` 的顺序。不支持包裹 `Splitter.Pane`，
`Splitter.Pane` 必须是 `Splitter` 的直接子元素。

```tsx
import { Splitter } from '@xiaoye-react/ui';

// 这样不会生效——被包裹的面板不会被识别
function WillNotWork() {
  return (
    <Splitter.Pane defaultSize={50} min={20}>
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
      <Splitter.Pane defaultSize={50} min={20}>
        First pane
      </Splitter.Pane>
      {/* 不要将 Splitter.Pane 包裹在另一个组件中 */}
      {/* <WillNotWork /> */}
      <Splitter.Pane defaultSize={50} min={20}>
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
| children | 至少两个 Splitter.Panel | `ReactNode` | — |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 整体尺寸 | `number \| string` | — |
| onResize | 调整大小回调 | `(sizes: number[]) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
