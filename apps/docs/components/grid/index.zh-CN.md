---
category: Components
title: Grid
subtitle: 栅格
description: react-ui Grid 栅格组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要使用 12 列栅格系统进行响应式布局时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 列跨度

`Grid.Col` 的 `span` 属性控制列宽与行总宽的比例。默认情况下，网格使用 12 列布局，因此 `span` 属性可以是 1 到 12 之间的任意数字。

示例：

- `<Grid.Col span={3} />` – 3 / 12 = 行宽的 25%
- `<Grid.Col span={4} />` – 4 / 12 = 行宽的 33%
- `<Grid.Col span={6} />` – 6 / 12 = 行宽的 50%
- `<Grid.Col span={12} />` – 12 / 12 = 行宽的 100%

`span` 属性只接受数字，不做响应式解析；需要随视口宽度调整列宽时，改用 `Grid` 的响应式 `cols` 属性配合固定的 `span`，或为 `Grid.Col` 传入 `style` 自行覆盖。

### 间距

设置 `gutter` 属性以控制列与行之间的间距。该属性的工作方式与 [style props](/docs/styles/style-props) 相同——可使用 `xs`、`sm`、`md`、`lg` 和 `xl` 字符串引用 `theme.spacing` 值，也可使用对象语法根据视口宽度更改间距：

<code src="./demo/gap.tsx"></code>

### 行间距和列间距

使用 `rowGap` 和 `columnGap` 属性分别为行和列设置不同间距。若同时设置，`rowGap` 和 `columnGap` 会覆盖 `gutter` 属性：

<code src="./demo/rowColumnGap.tsx"></code>

### 增长

若设置 `grow` 属性，列将增长以填充行中的剩余空间：

<code src="./demo/growConfigurator.tsx"></code>

### 列偏移

在 `Grid.Col` 组件上设置 `offset` 属性以向网格添加间隙。`offset` 属性只接受 1 到 12 之间的数字（相对 `cols` 总列数），不支持对象语法。

<code src="./demo/offset.tsx"></code>

### 排序

在 `Grid.Col` 组件上设置 `order` 属性以更改列的顺序。`order` 属性只接受 CSS `order` 可取的值（通常为数字），不支持对象语法：

<code src="./demo/order.tsx"></code>

### 多行

一旦列的 `span` 和 `offset` 之和超过 `cols` 属性（默认为 12），列就会移动到下一行：

<code src="./demo/rows.tsx"></code>

### 更改列数

默认情况下，网格使用 12 列布局。可通过在 `Grid` 组件上设置 `cols` 属性来更改。注意，在这种情况下，列跨度和偏移将相对于此值计算。

在以下示例中，第一列使用 12 跨度占据 50%（12/24），第二列和第三列各占据 25%（6/24）：

<code src="./demo/columns.tsx"></code>

### 浏览器支持

Grid 组件使用 CSS Grid（`display: grid` + `grid-template-columns`）配合原生 `gap` 进行布局，设置 `grow` 时切换为 flexbox，所有现代浏览器均支持。

`Grid` 的 `cols`、`gutter`、`rowGap`、`columnGap` 属性支持对象语法，响应式值通过标准媒体查询（基于 `theme.breakpoints`）生效，例如：

```tsx
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid cols={{ base: 12, md: 6 }} gutter="md">
      <Grid.Col span={3}>1</Grid.Col>
      <Grid.Col span={3}>2</Grid.Col>
    </Grid>
  );
}
```

## API {#api}

### GridProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 总列数 | `number` \| 响应式对象 | `12` |
| gutter | 列间距 | `UISpacing \| [UISpacing, UISpacing]` | `'md'` |
| rowGap | 行间距，覆盖 `gutter` 的行方向 | `UISpacing` \| 响应式对象 | — |
| columnGap | 列间距，覆盖 `gutter` 的列方向 | `UISpacing` \| 响应式对象 | — |
| grow | 是否让列自动等分 | `boolean` | `false` |

除上表所列属性外，Grid 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
