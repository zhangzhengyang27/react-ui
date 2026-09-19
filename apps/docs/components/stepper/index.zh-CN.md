---
category: Components
title: Stepper
subtitle: 步骤条
description: react-ui Stepper 步骤条组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要引导用户按步骤完成多步表单或流程，并显示当前进度时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 允许选择步骤

要禁用步骤选择，请在 `Stepper.Step` 组件上设置 `allowStepSelect` 属性。它可以用来防止用户进入后续步骤，同时允许他们在已经到达过的步骤之间来回切换：

<code src="./demo/allowStepSelect.tsx"></code>

### 颜色、圆角和尺寸

组件尺寸由两个属性控制：`size` 和 `iconSize`。`size` 属性控制图标尺寸、标签和描述字体大小。`iconSize` 允许单独覆盖图标尺寸，而不影响其他尺寸值：

<code src="./demo/configurator.tsx"></code>

<code src="./demo/iconSizeConfigurator.tsx"></code>

### 自定义图标

可通过在 `Stepper.Step` 组件上设置 `icon` 属性来替换步骤图标。要更改已完成的勾选图标，请在 `Stepper` 组件上设置 `completedIcon`。可使用任意 React node 作为图标：组件、字符串、数字：


可仅使用图标与 `Stepper`。注意，在这种情况下，需在 `Stepper.Step` 组件上设置 `aria-label` 或 `title` 以使其可访问：


还可为每个步骤更改已完成图标，例如指示错误状态：

<code src="./demo/icons.tsx"></code>

<code src="./demo/iconsOnly.tsx"></code>

<code src="./demo/stepColor.tsx"></code>

### 垂直方向

<code src="./demo/orientation.tsx"></code>

### 自定义样式

Styles API 自定义样式示例：

<code src="./demo/stylesApi.tsx"></code>

<code src="./demo/stylesApi2.tsx"></code>

<code src="./demo/stylesApi3.tsx"></code>

### 获取步骤 ref

可获取步骤按钮和 stepper 根元素（div）的 ref：

```tsx
import { useRef } from 'react';
import { Stepper } from '@xiaoye-react/ui';

function MyStepper() {
  const firstStep = useRef<HTMLButtonElement>(null);
  const stepper = useRef<HTMLDivElement>(null);

  return (
    <Stepper ref={stepper} active={0}>
      <Stepper.Step label="第一步" ref={firstStep} />
      <Stepper.Step label="第二步" />
    </Stepper>
  );
}
```

### 包裹 Stepper.Step

`Stepper` 组件依赖 `Stepper.Step` 的顺序。不支持包裹 `Stepper.Step`。相反，需使用不同的方法：

```tsx
import { Stepper } from '@xiaoye-react/ui';

// 这不会生效，step 子项不会渲染
function WillNotWork() {
  return (
    <Stepper.Step label="否" description="它不会生效">
      This part will not render
    </Stepper.Step>
  );
}

// 为子项创建一个单独的组件
function WillWork() {
  return <div>This will work as expected!</div>;
}

function Demo() {
  return (
    <Stepper active={1}>
      <Stepper.Step label="常规步骤">第一步</Stepper.Step>
      {/* 包裹的 Stepper.Step 不会渲染子项，不要这样做 */}
      <WillNotWork />
      <Stepper.Step label="带自定义内容的步骤">
        <WillWork />
      </Stepper.Step>
      <Stepper.Step label="常规步骤">第三步</Stepper.Step>
    </Stepper>
  );
}
```

### 可访问性

`<Stepper.Step />` 组件渲染一个 button 元素；若未指定 `label` 或 `description`，请设置 `aria-label` 或 `title` 属性以使屏幕阅读器可以识别该组件：

```tsx
import { Stepper } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stepper active={0}>
      {/* 不好，屏幕阅读器没有标签 */}
      <Stepper.Step />

      {/* 好，有 label 和 description */}
      <Stepper.Step label="步骤 1" description="创建账户" />

      {/* 好，有 aria-label */}
      <Stepper.Step aria-label="创建账户" />
    </Stepper>
  );
}
```

<StylesApiSelectors component="Stepper"></StylesApiSelectors>



## API {#api}

### StepperProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 当前步骤索引 | `number` | `0` |
| onStepClick | 点击步骤回调 | `(stepIndex: number) => void` | — |
| completed | 是否完成 | `boolean` | `false` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| breakpoint | 响应式断点 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| color | 主题色 | `UIColor` | `'blue'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
