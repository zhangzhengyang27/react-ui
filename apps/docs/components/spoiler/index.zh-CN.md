---
category: Components
title: Spoiler
subtitle: 展开折叠
description: react-ui Spoiler 展开折叠组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要隐藏一段内容，用户点击后才显示（如剧透、剧透答案）时使用。

## 代码演示 {#examples}

### 用法

使用 `Spoiler` 隐藏长内容区域。设置 `maxHeight` 属性以控制内容在何处被隐藏在 spoiler 下，并显示显示/隐藏控件。如果内容高度小于 `maxHeight`，spoiler 将只渲染子元素。

`hideLabel` 和 `showLabel` 属性是必需的——它们分别用作 spoiler 切换按钮在隐藏和显示状态下的标签。

<code src="./demo/usage.tsx"></code>

### 控制展开状态

要控制展开状态，请使用 `expanded` 和 `onExpandedChange` 属性。注意，如果内容高度小于给定的 `maxHeight`，`expanded` 属性不会影响 spoiler 的视觉效果。

```tsx
import { useState } from 'react';
import { Spoiler } from '@xiaoye-react/ui';

function Demo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Spoiler
      showLabel="显示更多"
      hideLabel="Hide details"
      expanded={expanded}
      onExpandedChange={setExpanded}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

### 订阅展开状态变化

使用 `onExpandedChange` 订阅展开状态变化：

```tsx
import { Spoiler } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Spoiler
      showLabel="显示更多"
      hideLabel="Hide details"
      onExpandedChange={(expanded) => console.log(expanded)}
    >
      {/* Spoiler content */}
    </Spoiler>
  );
}
```

### 过渡持续时间

通过设置 `transitionDuration` 属性（CSS transition-duration，单位为 ms）控制过渡持续时间。要禁用动画，请设置 `transitionDuration={0}`：

<code src="./demo/transitions.tsx"></code>

### 获取控件 ref

```tsx
import { useRef } from 'react';
import { Spoiler } from '@xiaoye-react/ui';

function Demo() {
  const spoilerControlRef = useRef<HTMLButtonElement>(null);
  return (
    <Spoiler
      controlRef={spoilerControlRef}
      hideLabel="隐藏"
      showLabel="Show"
    />
  );
}
```

### 可访问性

Spoiler 组件实现了适当的 ARIA 属性以支持屏幕阅读器：

- 切换按钮具有 `aria-expanded`，指示展开/收起状态
- 内容区域具有 `role="region"`，并通过 `aria-controls` 与按钮关联
- 键盘支持：当按钮聚焦时，按 Space 或 Enter 键可切换 spoiler

### 标签文本最佳实践

为 `showLabel` 和 `hideLabel` 属性提供能清楚说明操作的描述性标签：


### 自定义可访问性标签

若按钮标签不能清楚地向屏幕阅读器用户描述操作，请使用 `showAriaLabel` 和 `hideAriaLabel` 属性提供自定义 ARIA 标签：

```tsx
// 良好 - 清晰、描述性的标签
<Spoiler showLabel="Show full article" hideLabel="Hide article" />
<Spoiler showLabel="Expand details" hideLabel="Collapse details" />

// 避免模糊的标签
<Spoiler showLabel="More" hideLabel="Less" />
<Spoiler showLabel="..." hideLabel="..." />
```

```tsx
import { Spoiler } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Spoiler
      showLabel="👁️"
      hideLabel="👁️"
      showAriaLabel="Show discussion comments"
      hideAriaLabel="Hide discussion comments"
    >
      {/* Comments content */}
    </Spoiler>
  );
}
```



## API {#api}

### SpoilerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxHeight | 折叠时最大高度 | `number` | `100` |
| showLabel | 展开按钮文字 | `ReactNode` | — |
| hideLabel | 收起按钮文字 | `ReactNode` | — |
| expanded | 是否展开（受控） | `boolean` | — |
| onExpandedChange | 展开状态变化回调 | `(expanded: boolean) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
