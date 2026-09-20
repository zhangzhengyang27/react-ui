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

面板级 `min`/`max` 会限制拖拽能到达的边界。设置 `redistribute` 属性以控制当直接相邻面板
达到其最小/最大值时，如何从非相邻面板借用空间：

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
    <Splitter.Pane>
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
      <Splitter.Pane>
        First pane
      </Splitter.Pane>
      {/* 不要将 Splitter.Pane 包裹在另一个组件中 */}
      {/* <WillNotWork /> */}
      <Splitter.Pane>
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
| lineSize | 分隔条粗细，数字按 `1rem = 16px` 换算（受主题 `--ui-scale` 缩放），字符串原样作为 CSS 长度；写入根节点的 `--splitter-line-size` | `number \| string` | `4px` |
| sizes | 受控的面板尺寸数组，每项单位与对应面板的 `size` 一致 | `PaneSize[]` | — |
| onSizesChange | 拖拽或键盘调整尺寸时调用，回传当前全部面板尺寸 | `(sizes: PaneSize[]) => void` | — |
| redistribute | 相邻面板达到其 `min`/`max` 时，如何从非相邻面板借用空间；`'nearest'` 优先向拖拽方向最近的面板借，`'equal'` 在该方向均摊，也可传 `(input) => number[]` | `'nearest' \| 'equal' \| RedistributeFn` | — |
| step | 方向键调整步长，数字/`%` 为百分比，`px`/`rem` 为像素 | `PaneSize` | `1` |
| shiftStep | Shift + 方向键调整步长，单位同 `step` | `PaneSize` | `10` |

`PaneSize` 即 `useSplitter` 的尺寸类型：`number | '${number}%' | '${number}px' | '${number}rem'`
（裸数字按百分比处理）。任一尺寸/边界用了 `px`/`rem`，整个 Splitter 切换为像素模式。

支持所有原生 HTML 属性。

### Splitter.Panel / Splitter.Pane

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 面板内容 | `ReactNode` | — |
| size | 初始尺寸 | `PaneSize` | `100 / 面板数`（百分比等分） |
| min | 面板可拖拽到的最小尺寸 | `PaneSize` | `0` |
| max | 面板可拖拽到的最大尺寸 | `PaneSize` | 弹性尺寸下 `100`，像素模式下为容器宽度 |
| collapsible | 是否可以被折叠（拖拽越过 `collapseThreshold`，或聚焦分隔条后按 `Enter`） | `boolean` | `false` |
| collapseThreshold | 小于该尺寸时面板吸附到折叠状态 | `PaneSize` | 取 `min` |

其余 `BoxProps`（`bg`、`c`、`fw` 等样式属性）与 Styles API 属性均可透传。

### Splitter.Resizer

分隔条由 `Splitter` 自动渲染在相邻面板之间，也可显式使用；拖拽、键盘（方向键 / `Shift` +
方向键 / `Home` / `End` / `Enter`）与双击复位尺寸均由内部的 `useSplitter` 驱动。

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| index | 分隔条的序号，位于面板 `index` 与 `index + 1` 之间 | `number` | — |

### 样式

| 名称 | 选择器 | 说明 |
| --- | --- | --- |
| root | `.root` | flex 容器，承载 `--splitter-line-size` |
| panel | `.panel` | 单个面板，组件按当前尺寸写 `flex-basis`（像素模式下写 `flex`） |
| resizer | `.resizer` | 分隔条，宽/高取 `var(--splitter-line-size)` |

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
