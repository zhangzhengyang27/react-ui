---
category: Components
title: Table
subtitle: 表格
description: react-ui Table 表格组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要以表格形式展示结构化数据，支持排序、选择、分页等能力时使用。

## 代码演示 {#examples}

### 用法

所有示例的表格数据：

```tsx
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];
```

<code src="./demo/usage.tsx"></code>

### data 属性

可使用 `data` 属性从 React node 数组自动生成表格行。`data` 属性接受一个具有以下属性的对象：

- `head` – 一个 React node 数组（`React.ReactNode[]`），用于在 `Table.Thead` 中渲染 `Table.Th`
- `foot` – 一个 React node 数组（`React.ReactNode[]`），用于在 `Table.Tfoot` 中渲染 `Table.Th`
- `body` - 一个 React node 二维数组（`React.ReactNode[][]`），用于在 `Table.Tbody` 中渲染 `Table.Td`
- `caption` – 一个 React node，用于渲染 `Table.Caption`

<code src="./demo/data.tsx"></code>

### 粘性表头

设置 `stickyHeader` 使表格表头粘性定位。使用 `stickyHeaderOffset` 属性自定义表头顶部位置：当应用中有固定表头时这很有用。例如，ReactUI 文档网站有一个高度为 60px 的固定表头：

<code src="./demo/stickyHeader.tsx"></code>

### 间距

使用 `horizontalSpacing` 和 `verticalSpacing` 属性控制间距。两个属性都支持 `theme.spacing` 中的间距值和任何有效的 CSS 值来设置单元格内边距：

<code src="./demo/spacingConfigurator.tsx"></code>

### Caption 和 tfoot

Table 支持 tfoot 和 caption 元素。设置 `captionSide` 属性（top 或 bottom）以更改 caption 位置。

<code src="./demo/captions.tsx"></code>

### 斑马纹与行悬停

<code src="./demo/configurator.tsx"></code>

### 滚动容器

为了防止视口溢出，请将 `Table` 包裹在 `Table.ScrollContainer` 中。该组件接受一个 `minWidth` 属性，用于设置表格可滚动的最小宽度阈值。


默认情况下，`Table.ScrollContainer` 使用 [ScrollArea](/components/scroll-area)，可通过设置 `type="native"` 将其更改为原生滚动条：


还可在 `Table.ScrollContainer` 上设置 `maxHeight` 属性以限制表格高度：

<code src="./demo/scrollContainer.tsx"></code>

<code src="./demo/scrollContainerNative.tsx"></code>

<code src="./demo/scrollContainerMaxHeight.tsx"></code>

### 垂直变体

设置 `variant="vertical"` 以垂直布局渲染表格：

<code src="./demo/vertical.tsx"></code>

### 等宽数字

设置 `tabularNums` 属性以等宽样式渲染数字。它会设置 `font-variant-numeric: tabular-nums`，使数字具有相同宽度。当存在数字列并希望其对齐时，这很有用：

<code src="./demo/tabularNums.tsx"></code>

### 示例：带行选择的表格

<code src="./demo/rowSelection.tsx"></code>



## API {#api}

### TableProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 表格数据 | `TableData[][]` | `[]` |
| withBorder | 是否显示边框 | `boolean` | `false` |
| withColumnBorders | 是否显示列边框 | `boolean` | `false` |
| withRowBorders | 是否显示行边框 | `boolean` | `true` |
| striped | 是否显示条纹 | `boolean` | `false` |
| highlightOnHover | 是否悬停高亮 | `boolean` | `false` |
| horizontalSpacing | 水平内边距 | `UISpacing` | `'xs'` |
| verticalSpacing | 垂直内边距 | `UISpacing` | `'xs'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
