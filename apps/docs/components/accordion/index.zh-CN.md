---
category: Components
title: Accordion
subtitle: 手风琴
description: react-ui Accordion 手风琴组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在垂直方向上堆叠多个可折叠面板，让用户逐步浏览或对比大量分区内容时使用。

## 代码演示 {#examples}

### 用法

Accordion 允许用户展开和折叠内容区域。
它通过最初只显示区域标题并在交互时显示内容，
帮助在有限空间内管理大量信息。

Accordion 常用于：
- FAQ 区域：将问题显示为标题，点击后显示答案
- 表单：将长表单组织成多个区域，例如个人信息、配送和支付
- 菜单：侧边栏或移动视图中的嵌套导航

<code src="./demo/configurator.tsx"></code>

### 修改 chevron

使用 `chevron` 属性更改 chevron 图标。设置 `chevron` 后，
`chevronIconSize` 属性将被忽略。要移除 chevron 图标，请使用 `chevron={null}`。

要自定义 chevron 样式，请使用 [Styles API](/docs/styles/styles-api/) 和
[data-rotate](/docs/styles/data-attributes/) 属性。当项打开且未设置 `disableChevronRotation` 属性时，
会设置此属性。

自定义 chevron 图标及旋转样式示例：

<code src="./demo/chevron.tsx"></code>

### 自定义控制标签

可将任何 React 节点用作 `Accordion.Control` 组件的标签。
在 `Accordion.Control` 中使用嵌套元素时，建议设置
`aria-label` 属性，以便屏幕阅读器可以访问该控件。

<code src="./demo/label.tsx"></code>

### 使用图标

使用 `icon` 属性在 `Accordion.Control` 的左侧区域显示任意元素：

<code src="./demo/icons.tsx"></code>

### 修改过渡

要更改过渡持续时间，请设置 `transitionDuration` 属性：


要禁用过渡，请将 `transitionDuration` 设置为 0：

<code src="./demo/customTransitions.tsx"></code>

<code src="./demo/disableTransitions.tsx"></code>

### 默认打开项

对于 `multiple={false}`，将 `defaultValue` 设置为字符串：


对于 `multiple={true}`，将 `defaultValue` 设置为字符串数组：

```tsx
import { Accordion } from '@react-ui/ui';

function Demo() {
  // 默认打开第二项
  return (
    <Accordion defaultValue="item-2">
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

```tsx
import { Accordion } from '@react-ui/ui';

function Demo() {
  // 默认同时打开两项
  return (
    <Accordion multiple defaultValue={['item-1', 'item-2']}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

### 控制打开状态

对于 `multiple={false}`，将 `value` 设置为字符串：


对于 `multiple={true}`，将 `value` 设置为字符串数组：

```tsx
import { useState } from 'react';
import { Accordion } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Accordion value={value} onChange={setValue}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

```tsx
import { useState } from 'react';
import { Accordion } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Accordion multiple value={value} onChange={setValue}>
      <Accordion.Item value="item-1">{/* item-1 */}</Accordion.Item>
      <Accordion.Item value="item-2">{/* item-2 */}</Accordion.Item>
    </Accordion>
  );
}
```

### 组合控件

在 `Accordion.Control` 内放置按钮或链接是使用 Accordion 时的常见错误。
`Accordion.Control` 的根元素是 `button`。禁止在交互元素内放置其他交互元素——
若尝试实现以下组件，React 会抛出 DOM 验证错误：


不要在 `Accordion.Control` 内放置交互元素，而是将其渲染在控件旁边。
例如，可在原始控件的右侧添加 [ActionIcon](/components/action-icon/) 或 [Menu](/components/menu/)。
若需要在 `Accordion.Control` 上方显示交互元素，请改用 `position: absolute`。

```tsx
import { Accordion } from '@react-ui/ui';

// ❌ 错误用法：不要这样做
function Demo() {
  return (
    <Accordion.Item value="item-1">
      <Accordion.Control>
        <Group>
          <span>Control 1</span>
          <button>我的操作</button>
        </Group>
      </Accordion.Control>
      <Accordion.Panel>面板 1</Accordion.Panel>
    </Accordion.Item>
  );
}
```

<code src="./demo/sideControls.tsx"></code>

### 禁用项

在 `Accordion.Control` 组件上设置 `disabled` 属性以禁用它。
禁用项后，用户无法使用鼠标或键盘激活它们，
并且方向键导航会跳过它们：

<code src="./demo/disabled.tsx"></code>

### 无样式 Accordion

在 Accordion 组件上设置 `unstyled` 属性以移除所有非必要的
库样式。使用 `unstyled` 属性可以通过
[Styles API](/docs/styles/styles-api/) 为组件设置样式，而无需覆盖任何样式。




使用 [Styles API](/docs/styles/styles-api/) 自定义 Accordion 样式的示例：

<code src="./demo/unstyled.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<code src="./demo/customize.tsx"></code>

### TypeScript 类型

从 `@react-ui/ui` 导出的 `AccordionProps` 类型是一个泛型，接受一个布尔类型
来描述 `multiple` 状态：

```tsx
import type { AccordionProps } from '@react-ui/ui';

type MultipleAccordionProps = AccordionProps<true>;
type DefaultAccordionProps = AccordionProps<false>;
```

<StylesApiSelectors component="Accordion"></StylesApiSelectors>



## API {#api}

### AccordionProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认展开项（非受控） | `string \| string[]` | — |
| value | 当前展开项（受控） | `string \| string[]` | — |
| onChange | 展开项变化回调 | `(value: string \| string[]) => void` | — |
| multiple | 是否允许同时展开多个 | `boolean` | `false` |
| chevron | 自定义展开图标 | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'contained' \| 'filled' \| 'separated'` | `'default'` |
| chevronPosition | 图标位置 | `'left' \| 'right'` | `'right'` |
| disableChevronRotation | 禁用图标旋转 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
