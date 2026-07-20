---
category: Components
title: Drawer
subtitle: 抽屉
description: react-ui Drawer 抽屉组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要从屏幕边缘滑出抽屉面板，承载稍长的表单或导航内容时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 位置

Drawer 可放置在 `left`（默认）、`top`、`right` 和 `bottom`。使用 `position` 属性控制 drawer 位置，例如 `<Drawer position="top" />`。

<code src="./demo/positions.tsx"></code>

### 偏移

设置 `offset` 属性以更改 drawer 与视口边缘的偏移：

<code src="./demo/offset.tsx"></code>

### 自定义遮罩层

`Drawer` 使用 [Overlay](/components/overlay/) 组件。可使用 `overlayProps` 设置 [Overlay](/components/overlay/) 支持的任何属性：

<code src="./demo/overlay.tsx"></code>

### 尺寸

可通过将 `size` 属性设置为预定义尺寸或任意有效宽度来更改 drawer 的宽度/高度（取决于 `position`），例如 `size="55%"` 或 `size={200}`：

```tsx
import { Drawer } from '@react-ui/ui';

function Demo() {
  return (
    <Drawer position="right" size="xl" opened onClose={() => {}}>
      {/* Drawer content */}
    </Drawer>
  );
}
```

<code src="./demo/sizes.tsx"></code>

### 移除 header

要移除 header，请设置 `withCloseButton={false}`：

<code src="./demo/header.tsx"></code>

### 带滚动的 Drawer

<code src="./demo/overflow.tsx"></code>

### 与 ScrollArea 一起使用

<code src="./demo/scrollarea.tsx"></code>

### 修改过渡

`Drawer` 基于 [Transition](/components/transition/) 组件构建。使用 `transitionProps` 属性自定义任何 [Transition](/components/transition/) 属性：

<code src="./demo/transitions.tsx"></code>

### onExitTransitionEnd 和 onEnterTransitionEnd

`onExitTransitionEnd` 和 `onEnterTransitionEnd` 属性可用于在退出/进入过渡完成后运行代码。例如，在 drawer 关闭后清除数据时非常有用：

<code src="./demo/transitionEnd.tsx"></code>

### 初始焦点

`Drawer` 使用 [FocusTrap](/components/focus-trap/) 来捕获焦点。将 `data-autofocus` 属性添加到应接收初始焦点的元素。

若不想在 drawer 打开时聚焦任何元素，请使用 `FocusTrap.InitialFocus` 组件创建一个视觉上隐藏的元素来接收初始焦点：

若未添加 `data-autofocus` 属性且未使用 `FocusTrap.InitialFocus`，drawer 将聚焦其内部的第一个可聚焦元素，通常是关闭按钮。

<code src="./demo/initialFocus.tsx"></code>

<code src="./demo/initialFocusTrap.tsx"></code>

### react-remove-scroll 设置

`Drawer` 使用 [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) 包来锁定滚动。可通过 `removeScrollProps` 将属性传递给 `RemoveScroll` 组件：

```tsx
import { Drawer } from '@react-ui/ui';

function Demo() {
  return (
    <Drawer
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    >
      {/* Drawer content */}
    </Drawer>
  );
}
```

### 修改关闭图标

使用 `closeButtonProps` 自定义关闭按钮：

<code src="./demo/closeIcon.tsx"></code>

### 复合组件

可使用以下复合组件来完全控制 `Drawer` 的渲染：

- `Drawer.Root` – 上下文提供者
- `Drawer.Overlay` – 渲染 [Overlay](/components/overlay/)
- `Drawer.Content` – 主要 drawer 元素，应包含所有 drawer 内容
- `Drawer.Header` – 粘性 header，通常包含 `Drawer.Title` 和 `Drawer.CloseButton`
- `Drawer.Title` – `h2` 元素，`Drawer.Content` 的 `aria-labelledby` 指向此元素，通常渲染在 `Drawer.Header` 内
- `Drawer.CloseButton` – 关闭按钮，通常渲染在 `Drawer.Header` 内
- `Drawer.Body` – 主要内容区域，`Drawer.Content` 的 `aria-describedby` 指向此元素

<code src="./demo/composition.tsx"></code>

### Drawer.Stack

使用 `Drawer.Stack` 组件同时渲染多个 drawer。`Drawer.Stack` 跟踪打开的 drawer，管理 z-index 值、焦点捕获和 `closeOnEscape` 行为。`Drawer.Stack` 设计为与 `useDrawersStack` Hook 一起使用。

与使用多个 `Drawer` 组件的区别：

- `Drawer.Stack` 管理 z-index 值——后打开的 drawer 始终具有更高的 z-index 值，无论它们在 DOM 中的顺序如何
- `Drawer.Stack` 禁用焦点捕获和除当前打开的 drawer 之外所有 drawer 的 `Escape` 键处理
- 当前未打开的 drawer 存在于 DOM 中，但使用 `opacity: 0` 和 `pointer-events: none` 隐藏
- 一次只渲染一个遮罩层

注意，`Drawer.Stack` 只能与 `Drawer` 组件一起使用。使用 `Drawer.Root` 和其他复合组件构建的组件与 `Drawer.Stack` 不兼容。

<code src="./demo/stack.tsx"></code>

### useDrawersStack hook

`useDrawersStack` Hook 提供了一种同时控制多个 drawer 的简便方法。它接受一个唯一的 drawer id 数组，并返回一个具有以下属性的对象：

将 `useDrawersStack` 与 `Drawer` 组件一起使用的示例：

```tsx
interface UseDrawersStackReturnType<T extends string> {
  // 每个 drawer 的当前打开状态
  state: Record<T, boolean>;

  // 打开给定 id 的 drawer
  open: (id: T) => void;

  // 关闭给定 id 的 drawer
  close: (id: T) => void;

  // 切换给定 id 的 drawer
  toggle: (id: T) => void;

  // 关闭堆栈中的所有 drawer
  closeAll: () => void;

  // 返回给定 id drawer 的属性
  register: (id: T) => {
    opened: boolean;
    onClose: () => void;
    stackId: T;
  };
}
```

```tsx
import { Drawer, useDrawersStack } from '@react-ui/ui';

function Demo() {
  const stack = useDrawersStack(['first', 'second']);

  return (
    <>
      <Drawer {...stack.register('first')}>第一</Drawer>
      <Drawer {...stack.register('second')}>第二</Drawer>
      <Button onClick={() => stack.open('first')}>打开第一个</Button>
    </>
  );
}
```

### 固定元素偏移

`Drawer` 组件使用 [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) 包来锁定滚动。要正确调整这些 `elements` 的大小，请向它们添加 `className`（[文档](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)）：

```tsx
import { RemoveScroll } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <div className={RemoveScroll.classNames.fullWidth}>
        width: 100%
      </div>
      <div className={RemoveScroll.classNames.zeroRight}>
        right: 0
      </div>
    </>
  );
}
```

### 可访问性

`Drawer` 组件遵循 [WAI-ARIA 建议](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) 实现可访问性。

设置 `title` 属性以使组件可访问，它将为内容元素添加 `aria-labelledby`：

要使用关闭按钮 `aria-label`，请使用 `closeButtonProps`：

```tsx
import { Drawer } from '@react-ui/ui';

function Demo() {
  return <Drawer title="抽屉标签" opened onClose={() => {}} />;
}
```

```tsx
import { Drawer } from '@react-ui/ui';

function Demo() {
  return (
    <Drawer
      closeButtonProps={{ 'aria-label': '关闭抽屉' }}
      opened
      onClose={() => {}}
    />
  );
}
```

## API {#api}

### DrawerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | — |
| position | 抽屉位置 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'left'` |
| size | 抽屉尺寸 | `number \| string \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| title | 标题 | `ReactNode` | — |
| withCloseButton | 是否显示关闭按钮 | `boolean` | `true` |
| closeOnClickOutside | 点击遮罩是否关闭 | `boolean` | `true` |
| closeOnEscape | 按 Esc 是否关闭 | `boolean` | `true` |
| offset | 距边缘偏移 | `number \| string` | `0` |

除上表所列属性外，Drawer 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
