---
category: Components
title: EmptyState
subtitle: 空状态
description: react-ui EmptyState 空状态组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在数据为空或无结果时向用户提供友好的占位提示与引导操作时使用。

## 代码演示 {#examples}

### 用法

`EmptyState` 显示用于"无数据"情况的占位符：空搜索结果、空表格和列表、首次运行状态或带有可选操作调用的错误插图。最简单的使用方式是使用 `icon`、`title` 和 `description` 属性：

<code src="./demo/usage.tsx"></code>

### 复合组件

要完全控制内容，请使用复合组件代替（或与）简写属性。可用组件：

- `EmptyState.Indicator` – 图标或插图
- `EmptyState.Title` – 标题文本
- `EmptyState.Description` – 描述文本
- `EmptyState.Actions` – 操作按钮的包装器

简写属性和复合组件可以混合使用。当同时提供时，`icon`、`title` 和 `description` 属性的内容先渲染，然后是 `children`：

```tsx
import { Button, EmptyState } from '@xiaoye-react/ui';

function Demo() {
  return (
    <EmptyState icon={<Icon />} title="未找到结果">
      {/* 在标题之后渲染 */}
      <EmptyState.Actions>
        <Button variant="default">重置筛选</Button>
      </EmptyState.Actions>
    </EmptyState>
  );
}
```

<code src="./demo/compound.tsx"></code>

### 变体

将 `variant` 属性设置为 `filled` 或 `light`，以将图标显示在彩色圆形 indicator 内。使用 `color` 属性更改 indicator 颜色。若未设置 `variant`，图标将以暗淡的颜色显示：

<code src="./demo/variant.tsx"></code>

### Indicator 背景

设置 `withIndicatorBackground` 属性以在不设置 `variant` 的情况下，在 indicator 后面显示中性圆形背景：

<code src="./demo/indicatorBackground.tsx"></code>

### Title 标题级别

默认情况下，`EmptyState.Title` 渲染一个没有语义标题级别的 `div` 元素。若空状态标题应为标题，请设置 `order` 属性以将其渲染为 `h1`–`h6` 元素：

```tsx
import { EmptyState } from '@xiaoye-react/ui';

function Demo() {
  return (
    <EmptyState>
      <EmptyState.Title order={2}>未找到结果</EmptyState.Title>
    </EmptyState>
  );
}
```

<code src="./demo/stylesApi.tsx"></code>

<StylesApiSelectors component="EmptyState"></StylesApiSelectors>

## API {#api}

### EmptyStateProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | — |
| title | 标题 | `ReactNode` | — |
| description | 描述 | `ReactNode` | — |

除上表所列属性外，EmptyState 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
