---
category: Components
title: SimpleGrid
subtitle: 简单栅格
description: react-ui SimpleGrid 简单栅格组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要根据屏幕宽度自动调整列数，展示一组等尺寸卡片/项时使用。

## 代码演示 {#examples}

### 用法

`SimpleGrid` 是一个响应式网格系统，具有等宽列。
它使用 CSS grid 布局。若需为列设置不同的宽度，请改用
[Grid](/components/grid) 组件。

<code src="./demo/usage.tsx"></code>

### spacing 和 verticalSpacing 属性

`spacing` 属性控制列之间的水平间距。默认情况下，它也用于
行之间的垂直间距。若需不同的垂直间距，请显式设置
`verticalSpacing` 属性：

```tsx
import { SimpleGrid } from '@xiaoye-react/ui';

// `spacing` 同时用于水平和垂直间距
const Spacing = () => <SimpleGrid spacing="xl" />;

// `spacing` 用于水平间距，`verticalSpacing` 用于垂直间距
const VerticalSpacing = () => (
  <SimpleGrid spacing="xl" verticalSpacing="lg" />
);
```

### 响应式属性

`cols`、`spacing` 和 `verticalSpacing` 属性支持对象表示法来设置响应式值，
其工作方式与 [样式属性](/docs/styles/style-props) 相同：对象可以具有 `base`、`xs`、
`sm`、`md`、`lg` 和 `xl` 键，这些键的值将根据当前视口宽度应用。

在以下示例中，`cols={{ base: 1, sm: 2, lg: 5 }}` 表示：

- 视口宽度小于 `sm` 断点时显示 1 列
- 视口宽度在 `sm` 和 `lg` 断点之间时显示 2 列
- 视口宽度大于 `lg` 断点时显示 5 列

`spacing` 和 `verticalSpacing` 属性适用相同的逻辑。

<code src="./demo/responsive.tsx"></code>

### 自动填充列

设置 `minColWidth` 属性以使用 CSS Grid 的 `auto-fill` 根据可用空间和最小列宽自动调整列数。
设置 `minColWidth` 后，`cols` 属性会被忽略。

<code src="./demo/minColWidth.tsx"></code>

### auto-fill 与 auto-fit

默认情况下，`minColWidth` 使用 `auto-fill` 行为。可使用 `autoFlow` 属性将其更改为 `auto-fit`。
两者的区别：

- `auto-fill` 创建尽可能多的轨道而不溢出容器，如果项目未填满行则留下空轨道
- `auto-fit` 工作方式相同，但会折叠空轨道，允许项目拉伸并填充剩余空间

<code src="./demo/autoFlow.tsx"></code>

### 自动行高

设置 `autoRows` 属性以控制隐式创建的网格行的大小。
当需要所有行具有相等高度或最小高度时，这很有用。

<code src="./demo/autoRows.tsx"></code>



## API {#api}

### SimpleGridProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cols | 列数（支持响应式） | `number \| BreakpointCols` | `1` |
| spacing | 间距 | `UISpacing \| [UISpacing, UISpacing]` | `'md'` |
| verticalSpacing | 垂直间距 | `UISpacing` | — |
| type | 布局类型 | `'grid' \| 'flex'` | `'grid'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
