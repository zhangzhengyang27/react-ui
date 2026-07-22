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

`span` 属性还支持对象语法，根据视口宽度更改列宽。它接受 `xs`、`sm`、`md`、`lg` 和 `xl` 键，值为 1 到 12，语法与 [style props](/docs/styles/style-props) 相同。

在示例 `span={{ base: 12, md: 6, lg: 3 }}` 中：

- `base` – 视口宽度小于 `md` 断点时，12 / 12 = 行宽的 100%
- `md` – 视口宽度在 `md` 和 `lg` 断点之间时，6 / 12 = 行宽的 50%
- `lg` – 视口宽度大于 `lg` 断点时，3 / 12 = 行宽的 25%

<code src="./demo/responsive.tsx"></code>

### 间距

设置 `gap` 属性以控制列与行之间的间距。该属性的工作方式与 [style props](/docs/styles/style-props) 相同——可使用 `xs`、`sm`、`md`、`lg` 和 `xl` 字符串引用 `theme.spacing` 值，也可使用对象语法根据视口宽度更改间距：

<code src="./demo/gap.tsx"></code>

### 行间距和列间距

使用 `rowGap` 和 `columnGap` 属性分别为行和列设置不同间距。若同时设置，`rowGap` 和 `columnGap` 会覆盖 `gap` 属性：

<code src="./demo/rowColumnGap.tsx"></code>

### 增长

若设置 `grow` 属性，列将增长以填充行中的剩余空间：

<code src="./demo/growConfigurator.tsx"></code>

### 列偏移

在 `Grid.Col` 组件上设置 `offset` 属性以向网格添加间隙。`offset` 属性支持与 `span` 属性相同的语法：1 到 12 之间的数字，或带有 `xs`、`sm`、`md`、`lg` 和 `xl` 键且值为 1 到 12 的对象。

<code src="./demo/offset.tsx"></code>

### 排序

在 `Grid.Col` 组件上设置 `order` 属性以更改列的顺序。`order` 属性支持与 `span` 属性相同的语法：1 到 12 之间的数字，或带有 `xs`、`sm`、`md`、`lg` 和 `xl` 键且值为 1 到 12 的对象。

<code src="./demo/order.tsx"></code>

### 多行

一旦列的 `span` 和 `offset` 之和超过 `columns` 属性（默认为 12），列就会移动到下一行：

<code src="./demo/rows.tsx"></code>

### 对齐方式

可使用 `Grid` 组件上的 `justify` 和 `align` 属性分别控制 `justify-content` 和 `align-items` CSS 属性：

<code src="./demo/flexConfigurator.tsx"></code>

### 列对齐

在单个 `Grid.Col` 组件上使用 `align` 属性来控制每列的 `align-self` CSS 属性，以为特定列覆盖网格的 `align` 属性：

<code src="./demo/columnAlign.tsx"></code>

### 自动尺寸列

一行中所有 `span="auto"` 的列会尽可能增长以填充该行。在以下示例中，第二列占据行的 50%，而另外两列自动调整大小以填充剩余空间：

<code src="./demo/auto.tsx"></code>

### 适配列内容

若设置 `span="content"`，列的大小将自动调整以匹配其内容的宽度：

<code src="./demo/content.tsx"></code>

### 更改列数

默认情况下，网格使用 12 列布局。可通过在 `Grid` 组件上设置 `columns` 属性来更改。注意，在这种情况下，列跨度和偏移将相对于此值计算。

在以下示例中，第一列使用 12 跨度占据 50%（12/24），第二列和第三列各占据 25%（6/24）：

<code src="./demo/columns.tsx"></code>

### 容器查询

要使用[容器查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)替代媒体查询，请设置 `type="container"`。使用容器查询时，所有响应式值都基于容器宽度而不是视口宽度进行调整。

注意，使用容器查询时，还需要将 `breakpoints` 属性设置为精确的容器宽度值。

要查看网格的变化，请使用演示右下角的大小调整手柄调整演示根元素的大小：

<code src="./demo/container.tsx"></code>

### 浏览器支持

Grid 组件使用 flexbox 配合原生 `gap` 进行布局，所有现代浏览器均支持。

### 容器查询

使用 `type="container"` 时，Grid 组件使用 [CSS 容器查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)。以下浏览器支持容器查询：

- Chrome 105+
- Safari 16+
- Firefox 110+
- Edge 105+

若需要支持旧版浏览器，请使用默认的 `type="media"`，它使用标准媒体查询而非容器查询。

媒体查询示例（默认）：

```tsx
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid gap="md">
      <Grid.Col span={{ base: 12, md: 6 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>2</Grid.Col>
    </Grid>
  );
}
```

容器查询示例：

```tsx
import { Grid } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Grid
      type="container"
      breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      gap="md"
    >
      <Grid.Col span={{ base: 12, md: 6 }}>1</Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>2</Grid.Col>
    </Grid>
  );
}
```

## API {#api}

### GridProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 列间距 | `UISpacing \| [UISpacing, UISpacing]` | `'md'` |
| grow | 是否让列自动等分 | `boolean` | `false` |
| columns | 总列数 | `number` | `12` |
| align | 垂直对齐 | `'start' \| 'center' \| 'end'` | — |
| justify | 水平对齐 | `'start' \| 'center' \| 'end' \| 'space-between'` | — |

除上表所列属性外，Grid 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
