---
category: Components
title: Timeline
subtitle: 时间轴
description: react-ui Timeline 时间轴组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要按时间顺序展示一系列事件或流程节点时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 线条与圆点属性

使用以下属性控制时间轴外观：

- `active` – 当前活动元素的索引；此索引之前的所有元素将使用 `color` 高亮显示
- `color` – 用于高亮活动项的主题颜色，默认为 `theme.primaryColor`
- `lineWidth` – 控制线条宽度和圆点边框
- `bulletSize` – 圆点的宽度、高度和边框半径
- `align` – 定义线条和圆点相对于内容的位置，同时设置文本对齐方式

<code src="./demo/configurator.tsx"></code>

### 圆点作为 React node

<code src="./demo/bullet.tsx"></code>

### 包裹 Timeline.Item

`Timeline` 组件依赖 `Timeline.Item` 的顺序。不支持包裹 `Timeline.Item`。相反，需使用不同的方法：

```tsx
import { Timeline } from '@react-ui/ui';

// 这不会生效，step 子项不会渲染
function WillNotWork() {
  return <Timeline.Item title="否">它不会生效</Timeline.Item>;
}

// 为子项创建一个单独的组件
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Timeline active={1}>
      <Timeline.Item title="常规项目">第一个项目</Timeline.Item>
      <WillNotWork />
      <Timeline.Item title="按预期工作">
        <WillWork />
      </Timeline.Item>
      <Timeline.Item title="常规项目">第三个项目</Timeline.Item>
    </Timeline>
  );
}
```



## API {#api}

### TimelineProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | Timeline.Item 列表 | `ReactNode` | — |
| active | 当前激活项索引 | `number` | `-1` |
| color | 默认主题色 | `UIColor` | `'blue'` |
| radius | 圆角 | `UIRadius` | `'xl'` |
| bulletSize | 节点尺寸 | `number` | `20` |
| lineWidth | 连线宽度 | `number` | `4` |
| align | 对齐方式 | `'left' \| 'right'` | `'left'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
