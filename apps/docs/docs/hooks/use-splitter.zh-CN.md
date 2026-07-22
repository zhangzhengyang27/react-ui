---
category: Hooks
title: UseSplitter
subtitle: 分隔条
description: react-ui 分隔条 Hook 文档。
---


## 用法

`use-splitter` Hook 提供可调整大小的分屏功能。它处理调整手柄上的指针拖动、
遵循 WAI-ARIA Window Splitter 模式的键盘导航、可折叠面板以及最小/最大约束。
尺寸可以是百分比（弹性面板）或 `px`/`rem`（固定面板）。

<code src="./use-splitter/demo/usage.tsx"></code>

## CSS 单位

`defaultSize`、`min` 和 `max` 接受 CSS 单位。纯 `number` 或 `%` 字符串是弹性尺寸，
会共享剩余空间；而 `px` 或 `rem` 字符串是固定尺寸，在容器调整大小时保持不变。
尺寸以声明时的单位返回，因此 `'240px'` 面板在 `sizes` 和 `onSizeChange` 中仍为 `'240px'`。
当至少一个面板使用固定单位时，Hook 会使用测量的容器大小以像素解析布局：

<code src="./use-splitter/demo/cssUnits.tsx"></code>

## 垂直方向

设置 `orientation="vertical"` 以创建垂直分割布局。
键盘导航使用 ArrowUp/ArrowDown 而非 ArrowLeft/ArrowRight：

<code src="./use-splitter/demo/vertical.tsx"></code>

## 可折叠面板

在面板上设置 `collapsible: true` 以允许其折叠到零尺寸。
当拖动到 `collapseThreshold`（默认等于 `min`）以下时，面板会吸附到 0%。
使用 `collapse()`、`expand()` 和 `toggleCollapse()` 进行编程控制。
按下手柄上的 Enter 键可切换较小的相邻可折叠面板：

<code src="./use-splitter/demo/collapsible.tsx"></code>

## 多面板

该 Hook 支持任意数量的面板。每个手柄控制其两个相邻面板之间的边界：

<code src="./use-splitter/demo/multiple.tsx"></code>

## 重新分配

默认情况下，每个手柄只影响其两个相邻面板。当相邻面板达到最小时，手柄停止。
使用 `redistribute` 属性，允许在直接相邻面板无法再缩小时从更远的面板借用空间。

### 最近

`redistribute="nearest"` 首先沿拖动方向从最近的面板借用空间，
如果需要更多空间，则移动到下一个面板。尝试将第一个手柄向右拖动——
当第二个面板达到最小值（20%）时，空间将从第三和第四个面板借用：


### 均等

`redistribute="equal"` 将所需空间均等地分配给拖动方向上的所有面板，
同时尊重每个面板的最小值。达到最小值的面板被排除在外，剩余差额在其余面板中重新分配：


### 自定义函数

向 `redistribute` 传递函数以完全控制借用空间的方式。
函数接收 `{ sizes, panels, handleIndex, delta }` 并必须返回新的 sizes 数组。
此示例在增大时始终从最后一个面板借用空间，在缩小时从第一个面板借用：

<code src="./use-splitter/demo/redistributeNearest.tsx"></code>

<code src="./use-splitter/demo/redistributeEqual.tsx"></code>

<code src="./use-splitter/demo/redistributeCustom.tsx"></code>

## 仅握把手柄

你可以将拖动手柄设为小型浮动握把按钮，而不是全高条。
在此示例中，只有握把图标可拖动——面板之间的细线不可交互：

<code src="./use-splitter/demo/gripOnly.tsx"></code>

## 嵌套布局

组合多个 `useSplitter` 实例以创建具有水平和垂直分割的复杂布局。
这里水平分割的右侧包含一个垂直分割：

<code src="./use-splitter/demo/nested.tsx"></code>

## 代码编辑器布局

一个结合可折叠文件资源管理器侧边栏、代码编辑器面板和终端的实际示例——类似于 VS Code：

<code src="./use-splitter/demo/codeEditor.tsx"></code>

## 受控模式

传递 `sizes` 和 `onSizeChange` 以在外部控制尺寸。
使用 `setSizes()` 进行编程更新：

<code src="./use-splitter/demo/controlled.tsx"></code>

## 键盘支持

手柄遵循 WAI-ARIA Window Splitter 模式：

| 按键 | 操作 |
|-----|--------|
| ArrowLeft/ArrowRight | 按 `step` 调整大小（水平） |
| ArrowUp/ArrowDown | 按 `step` 调整大小（垂直） |
| Shift + 方向键 | 按 `shiftStep` 调整大小 |
| Home | 将手柄前方面板缩到最小 |
| End | 将手柄前方面板放到最大 |
| Enter | 切换较小相邻可折叠面板的折叠状态 |

## 触摸支持

该 Hook 使用 Pointer Events API，可自动处理鼠标和触摸。
在手柄元素上设置 `touch-action: none` 以防止浏览器将触摸拖动解释为滚动：

```css
.handle {
  touch-action: none;
}
```

## 类型定义

```tsx
/** 纯数字/`%` 为弹性尺寸，`px`/`rem` 为固定尺寸 */
type SplitterPaneSize = number | `${number}%` | `${number}px` | `${number}rem`;

/** 纯数字/`%` 为容器百分比，`px`/`rem` 解析为像素 */
type SplitterStep = number | `${number}%` | `${number}px` | `${number}rem`;

interface UseSplitterPanel {
  /** 初始尺寸，`number`/`%` 为弹性，`px`/`rem` 为固定。纯数字表示百分比。 */
  defaultSize: SplitterPaneSize;
  /** 与 `defaultSize` 相同单位的最小尺寸，默认 `0` */
  min?: SplitterPaneSize;
  /** 与 `defaultSize` 相同单位的最大尺寸，默认无限制 */
  max?: SplitterPaneSize;
  /** 该面板是否可折叠，默认 `false` */
  collapsible?: boolean;
  /** 面板折叠的阈值，默认等于 `min` */
  collapseThreshold?: SplitterPaneSize;
}

/** 解析为数字单位（百分比或像素）的面板配置 */
interface UseSplitterResolvedPanel {
  defaultSize: number;
  min?: number;
  max?: number;
  collapsible?: boolean;
  collapseThreshold?: number;
}

type UseSplitterRedistributeFn = (input: {
  sizes: number[];
  panels: UseSplitterResolvedPanel[];
  handleIndex: number;
  delta: number;
}) => number[];

interface UseSplitterOptions {
  /** 面板配置数组（至少 2 个面板） */
  panels: UseSplitterPanel[];
  /** 布局方向，默认 `'horizontal'` */
  orientation?: 'horizontal' | 'vertical';
  /** 受控尺寸，每个值保持声明时的单位 */
  sizes?: SplitterPaneSize[];
  /** 调整大小期间调用，传入更新后的尺寸，每个值保持声明时的单位 */
  onSizeChange?: (sizes: SplitterPaneSize[]) => void;
  /** 拖动开始时调用 */
  onResizeStart?: (handleIndex: number) => void;
  /** 拖动结束时调用 */
  onResizeEnd?: (handleIndex: number, sizes: SplitterPaneSize[]) => void;
  /** 面板折叠或展开时调用 */
  onCollapseChange?: (panelIndex: number, collapsed: boolean) => void;
  /** 如何从非相邻面板借用空间 */
  redistribute?: 'nearest' | 'equal' | UseSplitterRedistributeFn;
  /** 键盘步长，`number`/`%` 为百分比，`px`/`rem` 为像素，默认 `1` */
  step?: SplitterStep;
  /** Shift+方向键步长，`number`/`%` 为百分比，`px`/`rem` 为像素，默认 `10` */
  shiftStep?: SplitterStep;
  /** 键盘导航的文本方向，默认 `'ltr'` */
  dir?: 'ltr' | 'rtl';
  /** 启用/禁用该 Hook，默认 `true` */
  enabled?: boolean;
}

interface UseSplitterReturnValue<T extends HTMLElement = any> {
  /** 容器元素的 ref 回调 */
  ref: React.RefCallback<T | null>;
  /** 当前面板尺寸，每个值保持声明时的单位 */
  sizes: SplitterPaneSize[];
  /** 是否以像素跟踪尺寸，因为任意面板尺寸、`min`、`max`、`step`、`shiftStep`
   * 或 `collapseThreshold` 使用了固定的 `px`/`rem` 单位 */
  pixelMode: boolean;
  /** 当前折叠的面板 */
  collapsed: boolean[];
  /** 正在拖动的手柄索引，如果没有则为 -1 */
  activeHandle: number;
  /** 获取要展开到每个调整手柄上的 props */
  getHandleProps: (input: { index: number }) => HandleProps;
  /** 以编程方式设置尺寸 */
  setSizes: (sizes: SplitterPaneSize[]) => void;
  /** 折叠面板 */
  collapse: (panelIndex: number) => void;
  /** 展开折叠的面板 */
  expand: (panelIndex: number) => void;
  /** 切换面板折叠状态 */
  toggleCollapse: (panelIndex: number) => void;
}

function useSplitter<T extends HTMLElement = any>(
  options: UseSplitterOptions
): UseSplitterReturnValue<T>
```

## 导出类型

`UseSplitterPanel`、`UseSplitterOptions`、`UseSplitterReturnValue`、`UseSplitterRedistributeInput`、
`UseSplitterRedistributeFn`、`UseSplitterResolvedPanel`、`SplitterPaneSize` 和 `SplitterStep` 类型
从 `@xiaoye-react/hooks` 包导出：

```tsx
import type {
  SplitterPaneSize,
  SplitterStep,
  UseSplitterPanel,
  UseSplitterOptions,
  UseSplitterReturnValue,
  UseSplitterRedistributeInput,
  UseSplitterRedistributeFn,
  UseSplitterResolvedPanel,
} from '@xiaoye-react/hooks';
```
