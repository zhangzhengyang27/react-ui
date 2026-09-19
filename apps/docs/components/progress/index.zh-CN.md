---
category: Components
title: Progress
subtitle: 进度条
description: react-ui Progress 进度条组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要展示一个线性进度条，反映任务完成度时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 复合组件

<code src="./demo/compound.tsx"></code>

### 带工具提示

<code src="./demo/tooltips.tsx"></code>

### 段落宽度过渡

将 `transitionDuration` 设置为毫秒数以启用宽度过渡：

<code src="./demo/transition.tsx"></code>

### 示例：分段进度条

<code src="./demo/segments.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

- 进度段落具有 `role="progressbar"` 属性
- 进度段落具有 `aria-valuenow` 属性，表示当前值
- `aria-valuemin` 和 `aria-valuemax` 属性始终设置为 `0` 和 `100`，因为该组件不支持其他值

设置 `aria-label` 属性以标记进度条：

```tsx
import { Progress } from '@xiaoye-react/ui';

function Demo() {
  return <Progress aria-label="上传进度" value={10} />;
}

function DemoCompound() {
  return (
    <Progress.Root>
      <Progress.Section aria-label="上传进度" value={10} />
    </Progress.Root>
  );
}
```

<StylesApiSelectors component="Progress"></StylesApiSelectors>



## API {#api}

### ProgressProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前进度（0-100） | `number` | `0` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | `'sm'` |
| color | 主题色 | `UIColor` | `'blue'` |
| striped | 是否显示条纹 | `boolean` | `false` |
| animated | 是否动画 | `boolean` | `false` |
| variant | 视觉变体 | `'default' \| 'filled'` | `'default'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
