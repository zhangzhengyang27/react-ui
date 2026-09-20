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

`span` 属性还支持对象语法，根据视口宽度更改列宽。它接受 `xs`、`sm`、`md`、`lg` 和 `xl` 键（与 `theme.breakpoints` 一致），值为 1 到 `cols` 之间的数字，语法与 [style props](/docs/styles/style-props) 相同。

在示例 `span={{ base: 12, md: 6, lg: 3 }}` 中：

- `base` – 视口宽度小于 `md` 断点时，12 / 12 = 行宽的 100%
- `md` – 视口宽度在 `md` 和 `lg` 断点之间时，6 / 12 = 行宽的 50%
- `lg` – 视口宽度大于 `lg` 断点时，3 / 12 = 行宽的 25%

每个断点上的跨度都是按**该断点生效的列数**独立钳位的：`cols={{ base: 4, lg: 12 }}` 配 `span={{ base: 4, lg: 12 }}` 时，`lg` 下的 12 不会被 `base` 的 4 列误压小。

<code src="./demo/responsive.tsx"></code>

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

在 `Grid.Col` 组件上设置 `offset` 属性以向网格添加间隙。`offset` 属性支持与 `span` 属性相同的语法：1 到 `cols` 之间的数字，或带有 `xs`、`sm`、`md`、`lg` 和 `xl` 键的对象（同样按各断点生效的列数独立钳位）。

<code src="./demo/offset.tsx"></code>

### 排序

在 `Grid.Col` 组件上设置 `order` 属性以更改列的顺序。`order` 属性同样支持与 `span` 相同的语法：数字，或带有 `xs`、`sm`、`md`、`lg` 和 `xl` 键的对象。

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

`Grid` 的 `cols`、`gutter`、`rowGap`、`columnGap` 与 `Grid.Col` 的 `span`、`offset`、`order` 都支持对象语法，响应式值通过标准媒体查询（基于 `theme.breakpoints`）生效，例如：

```tsx
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid gutter="md">
      <Grid.Col span={{ base: 12, md: 6 }} offset={{ lg: 1 }}>
        1
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
        2
      </Grid.Col>
    </Grid>
  );
}
```

`Grid.Col` 的响应式声明与 [style props](/docs/styles/style-props) 走同一套机制：只在该断点的计算结果与上一个断点不同时才输出规则，纯数字写法仍然直接落在 `style` 属性上，不额外生成样式。

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

### GridColProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 列跨度 | `number` \| 响应式对象 | `1` |
| offset | 列偏移 | `number` \| 响应式对象 | `0` |
| order | 列顺序 | `number` \| 响应式对象 | — |

响应式对象的类型为 `StyleProp<number>`，形如 `{ base: 12, md: 6, lg: 3 }`，键取自 `theme.breakpoints`，语法与 [style props](/docs/styles/style-props) 相同。`span` 与 `offset` 在每个断点上按**该断点生效的 `cols`** 各自钳位：`span` 收敛到 `[1, cols]`，`offset + span` 越过总列数时裁掉 `span`。

除上表所列属性外，Grid.Col 还支持 Box 的 style props 与所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
