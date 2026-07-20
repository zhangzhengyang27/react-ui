---
category: Components
title: Card
subtitle: 卡片
description: react-ui Card 卡片组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要将一组相关内容（如商品、文章摘要）组织在带边框或阴影的卡片容器中时使用。

## 代码演示 {#examples}

### 用法

`Card` 是 [Paper](/components/paper/) 组件的包装器，带有一些额外的样式和 `Card.Section` 组件，可将卡片分成多个区域。若不需要区域，可直接使用 [Paper](/components/paper/) 组件。

<code src="./demo/usage.tsx"></code>

### 多态组件

Card 是一个[多态组件](/docs/guides/polymorphic/)，可更改其根元素：

<code src="./demo/link.tsx"></code>

### Card.Section

`Card.Section` 是一个特殊组件，用于移除 Card 对其子元素的内边距，而其他元素仍保留水平间距。`Card.Section` 的工作方式如下：

- 若该组件是 Card 的第一个子元素，则具有负的上、左、右外边距
- 若它是 Card 的最后一个子元素，则具有负的下、左、右外边距
- 若它在中间，则只有左、右外边距为负

注意，`Card` 依赖直接子元素的映射，不可为 `Card.Section` 使用片段或其他包装器：

```tsx
import { Card, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Card padding="xl">
      {/* 上、右、左外边距为负 – -1 * theme.spacing.xl */}
      <Card.Section>第一部分</Card.Section>

      {/* 不在 Card.Section 内的内容相对于 Card 具有 theme.spacing.xl 的四面间距 */}
      <Text>一些其他内容</Text>

      {/* 右、左外边距为负 – -1 * theme.spacing.xl */}
      <Card.Section>中间部分</Card.Section>

      {/* 下、右、左外边距为负 – -1 * theme.spacing.xl */}
      <Card.Section>最后部分</Card.Section>
    </Card>
  );
}
```

```tsx
import { Card } from '@react-ui/ui';

function Demo() {
  return (
    <Card padding="xl">
      <div>
        <Card.Section>Won't work</Card.Section>
      </div>

      <>
        <Card.Section>Won't work either</Card.Section>
      </>

      <Card.Section>正常运行</Card.Section>
    </Card>
  );
}
```

### 多态 Card.Section

`Card.Section` 是一个[多态组件](/docs/guides/polymorphic/)，可更改其根元素：

<code src="./demo/linkSection.tsx"></code>

### withBorder 和 inheritPadding 属性

- `withBorder` 属性根据 `Card.Section` 相对于其他内容和区域的位置为其添加顶部和底部边框
- `inheritPadding` 属性为 `Card.Section` 添加与 `Card` 组件相同的左右内边距

<code src="./demo/section.tsx"></code>

## API {#api}

### CardProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| padding | 内边距 | `number \| string` | `'md'` |
| shadow | 阴影 | `UIShadow` | — |
| radius | 圆角 | `UIRadius` | — |
| withBorder | 是否显示边框 | `boolean` | `false` |
| variant | 视觉变体 | `'default' \| 'filled'` | `'default'` |

除上表所列属性外，Card 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
