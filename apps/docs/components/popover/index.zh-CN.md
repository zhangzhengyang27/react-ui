---
category: Components
title: Popover
subtitle: 气泡卡片
description: react-ui Popover 气泡卡片组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要点击或悬停元素时弹出一个轻量浮层，承载更多操作或信息时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 受控模式

可使用 `opened` 和 `onChange` 属性控制 Popover 的状态：


带鼠标事件的受控示例：

<code src="./demo/hover.tsx"></code>

```tsx
import { useState } from 'react';
import { Button, Popover } from '@xiaoye-react/ui';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>下拉</Popover.Dropdown>
    </Popover>
  );
}
```

### 焦点陷阱

若需在 `Popover.Dropdown` 内使用交互元素（如输入框、按钮等），请设置 `trapFocus` 属性：

<code src="./demo/form.tsx"></code>

### 与目标同宽

设置 `width="target"` 属性使 Popover 下拉菜单与目标元素等宽：

<code src="./demo/sameWidth.tsx"></code>

### offset

将 `offset` 属性设置为数字以更改下拉菜单相对于目标元素的位置。
这样可仅在主轴上控制下拉菜单偏移。


要在两个轴上控制偏移，请传入包含 `mainAxis` 和 `crossAxis` 属性的对象：

<code src="./demo/offset.tsx"></code>

<code src="./demo/offsetAxis.tsx"></code>

### 中间件

可使用 `middlewares` 属性启用或禁用 [Floating UI](https://floating-ui.com/) 中间件：

- [shift](https://floating-ui.com/docs/shift) 中间件会移动下拉菜单以保持其在视口内。默认启用。
- [flip](https://floating-ui.com/docs/flip) 中间件会更改下拉菜单的放置位置以保持其在视口内。默认启用。
- [inline](https://floating-ui.com/docs/inline) 中间件可改善跨多行显示的 inline 参考元素的定位。默认禁用。
- [size](https://floating-ui.com/docs/size) 中间件会调整下拉菜单尺寸。默认禁用。

关闭 `shift` 和 `flip` 中间件的示例：

```tsx
import { Popover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover
      middlewares={{ flip: false, shift: false }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

### 自定义中间件选项

要自定义 [Floating UI](https://floating-ui.com/) 中间件选项，请将它们作为对象
传递给 `middlewares` 属性。例如，要将 [shift](https://floating-ui.com/docs/shift)
中间件的 padding 更改为 `20px`，请使用以下配置：

```tsx
import { Popover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover
      middlewares={{ shift: { padding: 20 } }}
      position="bottom"
    >
      {/* Popover content */}
    </Popover>
  );
}
```

### 下拉箭头

设置 `withArrow` 属性为下拉菜单添加箭头。箭头是一个使用 `transform: rotate(45deg)` 旋转的 `div` 元素。

当 `Popover` 组件的 `position` 设置为 `*-start` 和 `*-end` 值时，`arrowPosition` 属性决定箭头相对于目标元素的定位方式。
默认值为 `center`——如果可能，箭头会位于目标元素的中心。

如果将 `arrowPosition` 更改为 `side`，则箭头会位于目标元素的一侧，
并且可使用 `arrowOffset` 属性控制箭头偏移。注意，当 `arrowPosition` 设置为 `center` 时，
`arrowOffset` 属性会被忽略。

<code src="./demo/arrow.tsx"></code>

### 禁用

设置 `disabled` 属性以阻止 `Popover.Dropdown` 渲染：

<code src="./demo/disabled.tsx"></code>

### 点击外部关闭

默认情况下，点击下拉菜单外部会关闭 `Popover`。要禁用此行为，请设置 `closeOnClickOutside={false}`。

可使用 `clickOutsideEvents` 属性配置用于检测点击外部的事件。
默认情况下，`Popover` 监听 `mousedown` 和 `touchstart` 事件。可将其更改为其他
事件，例如 `mouseup` 和 `touchend`：

<code src="./demo/clickOutsideEvents.tsx"></code>

### onDismiss

若需控制打开状态，但仍希望点击外部和按 Escape 键时关闭 popover，请使用 `onDismiss` 属性：

```tsx
import { useState } from 'react';
import { Button, Popover } from '@xiaoye-react/ui';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Popover
      opened={opened}
      onDismiss={() => setOpened(false)}
    >
      <Popover.Target>
        <Button onClick={() => setOpened((o) => !o)}>
          Toggle popover
        </Button>
      </Popover.Target>

      <Popover.Dropdown>下拉</Popover.Dropdown>
    </Popover>
  );
}
```

### 初始焦点

Popover 使用 [FocusTrap](/components/focus-trap/) 组件管理焦点。
将 `data-autofocus` 属性添加到应接收初始焦点的元素上：

```tsx
import { Popover } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover>
      <Popover.Target>
        <button type="button">目标</button>
      </Popover.Target>
      <Popover.Dropdown>
        <input />
        <input data-autofocus />
        <input />
      </Popover.Dropdown>
    </Popover>
  );
}
```

### 上下文菜单

使用 `Popover.ContextMenu` 在右键点击时于光标位置打开下拉菜单。
它替代 `Popover.Target` 并包裹应响应 `contextmenu` 事件的元素——
浏览器默认的上下文菜单会被抑制，`Popover.Dropdown` 会定位在光标处。再次右键点击会将下拉菜单重新定位到新坐标。
`Popover.Dropdown` 可以包含任何内容。设置 `disabled` 可恢复浏览器默认的上下文菜单：


### 触摸设备

在触摸设备上（最显著的是 iOS Safari，它不会触发 `contextmenu` 事件），
下拉菜单改为通过长按打开。使用 `longPressDelay` 属性控制元素需要被按压多久才会打开下拉菜单，默认为 `500`ms。为了
防止原生的文本选择弹窗在触摸设备上出现在下拉菜单下方，`Popover.ContextMenu` 会禁用被包裹元素上的文本选择（`user-select: none`）。

<code src="./demo/contextMenu.tsx"></code>

### 嵌套 popover

嵌套 popover 需要子元素在不使用 [Portal](/components/portal/) 的情况下渲染。注意本库的
[Select](/components/select/)、[MultiSelect](/components/multi-select/)、[TagsInput](/components/tags-input/)
等下拉组件的浮层始终渲染在 portal 中，暂不支持关闭；如果需要在同一层里表达选择结果，
可改用受控 `value` 配合普通 `Popover.Target` 自行组合。
如果两层浮层都开启 portal，点击外部会一次性关闭所有 popover。

在 [DatePickerInput](/docs/dates/date-picker-input/) 中通过 `popoverProps={{ withinPortal: false }}`
禁用 portal 的示例（日期系浮层支持该配置，Combobox 族不支持）：

<code src="./demo/portalChildren.tsx"></code>

<TargetComponent component="Popover"></TargetComponent>



## API {#api}

### PopoverProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开（受控） | `boolean` | — |
| defaultOpened | 默认是否打开 | `boolean` | `false` |
| onChange | 打开状态变化回调 | `(opened: boolean) => void` | — |
| position | 浮层位置 | `PopoverPosition` | `'bottom'` |
| width | 浮层宽度 | `number \| string \| 'target'` | `'target'` |
| withArrow | 是否显示箭头 | `boolean` | `false` |
| shadow | 阴影 | `UIShadow` | `'sm'` |
| closeOnClickOutside | 点击外部是否关闭 | `boolean` | `true` |
| trapFocus | 是否陷阱焦点 | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
