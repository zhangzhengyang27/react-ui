---
category: Components
title: Modal
subtitle: 对话框
description: react-ui Modal 模态对话框，用于在页面层级之上展示重要信息或收集用户输入。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

- 需要用户处理某事务，但又不想跳转页面时（如确认、表单填写）。
- 需要打断当前流程，强制用户做决策时（如删除确认）。
- 显示一些不适合在主内容区展示的次要信息。

react-ui 的 Modal 采用**组合式 API**（`Modal.Root` / `Modal.Overlay` / `Modal.Content` ...），同时也提供了简化的 `Modal` 一体化 API，推荐用 `opened` 受控状态驱动。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 垂直居中

<code src="./demo/centered.tsx"></code>

### 移除头部

要移除头部，请设置 `withCloseButton={false}`：

<code src="./demo/header.tsx"></code>

### 更改尺寸

可通过将 `size` 属性设置为预定义尺寸或任意有效宽度来更改模态框宽度，例如 `55%` 或 `50rem`。
`Modal` 的宽度不能超过 `100vw`。

<code src="./demo/sizes.tsx"></code>

### 自动尺寸

`size="auto"` 的 `Modal` 将根据其内容自适应宽度：

<code src="./demo/sizeAuto.tsx"></code>

### 全屏

全屏模态框将占据整个屏幕。设置 `fullScreen` 属性时，通常最好将过渡效果更改为 `fade`：


要仅在屏幕较小的设备上将 Modal 切换为全屏，请使用 [use-media-query](/docs/hooks/use-media-query/) hook。
如果设置了 `fullScreen` 属性，`size` 属性将被忽略：

<code src="./demo/fullScreen.tsx"></code>

<code src="./demo/fullScreenMobile.tsx"></code>

### 自定义遮罩

`Modal` 使用 [Overlay](/components/overlay/) 组件。可通过 `overlayProps` 设置 [Overlay](/components/overlay/)
支持的任何属性：

<code src="./demo/overlay.tsx"></code>

### 带滚动的模态框

<code src="./demo/overflow.tsx"></code>

### 与 ScrollArea 一起使用

<code src="./demo/scrollarea.tsx"></code>

### 更改偏移

使用 `xOffset`/`yOffset` 来配置水平/垂直内容偏移：

<code src="./demo/offset.tsx"></code>

### 更改过渡

`Modal` 使用 [Transition](/components/transition/) 组件构建。使用 `transitionProps`
属性来自定义任何 [Transition](/components/transition/) 属性：

<code src="./demo/transitions.tsx"></code>

### onExitTransitionEnd 和 onEnterTransitionEnd

`onExitTransitionEnd` 和 `onEnterTransitionEnd` 属性可用于在退出/进入过渡完成后执行代码。
例如，这可在模态框关闭后清除数据：

<code src="./demo/transitionEnd.tsx"></code>

### 初始焦点

Modal 使用 [FocusTrap](/components/focus-trap/) 来捕获焦点。将 `data-autofocus`
属性添加到应接收初始焦点的元素上。


若不想在模态框打开时聚焦任何元素，请使用 `FocusTrap.InitialFocus`
组件创建一个视觉上隐藏的元素来接收初始焦点：


若未添加 `data-autofocus` 属性，也未使用 `FocusTrap.InitialFocus`，
模态框将聚焦其内部第一个可聚焦元素，通常是关闭按钮。

<code src="./demo/initialFocus.tsx"></code>

<code src="./demo/initialFocusTrap.tsx"></code>

### react-remove-scroll 设置

`Modal` 使用 [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
包来锁定滚动。可通过 `removeScrollProps` 将属性传递给 `RemoveScroll` 组件：

```tsx
import { Modal } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Modal
      removeScrollProps={{ allowPinchZoom: true }}
      opened
      onClose={() => {}}
    />
  );
}
```

### 更改关闭图标

使用 `closeButtonProps` 自定义关闭按钮：

<code src="./demo/closeIcon.tsx"></code>

### 复合组件

可使用以下复合组件完全控制 `Modal` 的渲染：

- `Modal.Root` – 上下文提供者
- `Modal.Overlay` – 渲染 [Overlay](/components/overlay/)
- `Modal.Content` – 模态框主元素，应包含所有模态框内容
- `Modal.Header` – 粘性头部，通常包含 `Modal.Title` 和 `Modal.CloseButton`
- `Modal.Title` – `h2` 元素，`Modal.Content` 的 `aria-labelledby` 指向此元素，通常渲染在 `Modal.Header` 内部
- `Modal.CloseButton` – 关闭按钮，通常渲染在 `Modal.Header` 内部
- `Modal.Body` – 主内容区域，`Modal.Content` 的 `aria-describedby` 指向此元素

<code src="./demo/composition.tsx"></code>

### Modal.Stack

使用 `Modal.Stack` 组件可同时渲染多个模态框。
`Modal.Stack` 会跟踪打开的模态框，管理 z-index 值、焦点捕获
以及 `closeOnEscape` 行为。`Modal.Stack` 设计为与 `useModalsStack` hook 一起使用。

与使用多个 `Modal` 组件的区别：

- `Modal.Stack` 管理 z-index 值 – 后打开的模态框始终具有较高的 z-index 值，无论其在 DOM 中的顺序如何
- `Modal.Stack` 会禁用当前未打开模态框的焦点捕获和 `Escape` 键处理
- 未打开的模态框仍存在于 DOM 中，但使用 `opacity: 0` 和 `pointer-events: none` 隐藏
- 一次只渲染一个遮罩


注意，`Modal.Stack` 只能与 `Modal` 组件一起使用。使用 `Modal.Root`
和其他复合组件构建的组件与 `Modal.Stack` 不兼容。

<code src="./demo/stack.tsx"></code>

### useModalsStack hook

`useModalsStack` hook 提供了一种同时控制多个模态框的简单方法。
它接受一个唯一的模态框 ID 数组，并返回一个包含以下属性的对象：


使用 `useModalsStack` 与 `Modal` 组件的示例：

```tsx
interface UseModalsStackReturnType<T extends string> {
  // 每个模态框的当前打开状态
  state: Record<T, boolean>;

  // 打开指定 id 的模态框
  open: (id: T) => void;

  // 关闭指定 id 的模态框
  close: (id: T) => void;

  // 切换指定 id 的模态框
  toggle: (id: T) => void;

  // 关闭堆栈中的所有模态框
  closeAll: () => void;

  // 返回指定 id 模态框的属性
  register: (id: T) => {
    opened: boolean;
    onClose: () => void;
    stackId: T;
  };
}
```

```tsx
import { Modal, useModalsStack } from '@xiaoye-react/ui';

function Demo() {
  const stack = useModalsStack(['first', 'second']);

  return (
    <>
      <Modal {...stack.register('first')}>第一</Modal>
      <Modal {...stack.register('second')}>第二</Modal>
      <Button onClick={() => stack.open('first')}>打开第一个</Button>
    </>
  );
}
```

### 固定元素偏移

`Modal` 组件使用 [react-remove-scroll](https://github.com/theKashey/react-remove-scroll)
包来锁定滚动。要正确调整这些元素的大小，请为它们添加 `className`（[文档](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)）：

```tsx
import { RemoveScroll } from '@xiaoye-react/ui';

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

`Modal` 组件遵循 [WAI-ARIA 建议](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/dialog) 实现可访问性。

设置 `title` 属性以使组件可访问，这将为内容元素添加 `aria-labelledby`：


要设置关闭按钮的 `aria-label`，请使用 `closeButtonProps`：

```tsx
import { Modal } from '@xiaoye-react/ui';

function Demo() {
  return <Modal title="模态框标签" opened onClose={() => {}} />;
}
```

```tsx
import { Modal } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Modal
      closeButtonProps={{ 'aria-label': '关闭模态框' }}
      opened
      onClose={() => {}}
    />
  );
}
```



## API {#api}

### ModalProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| opened | 是否打开（受控） | `boolean` | `false` |
| onClose | 关闭回调（点击遮罩 / ESC / 关闭按钮触发） | `() => void` | — |
| title | 标题 | `ReactNode` | — |
| withCloseButton | 是否显示右上角关闭按钮 | `boolean` | `true` |
| withOverlay | 是否显示遮罩 | `boolean` | `true` |
| overlayProps | 传递给遮罩的属性 | `Partial<ModalOverlayProps>` | — |
| closeButtonProps | 传递给关闭按钮的属性 | `Partial<ModalCloseButtonProps>` | — |
| size | 宽度档位或任意 CSS 值 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'` |
| radius | 圆角 | `UIRadius` | `theme.defaultRadius` |
| centered | 垂直居中 | `boolean` | `false` |
| fullScreen | 全屏 | `boolean` | `false` |
| yOffset | 顶部偏移 | `CSSProperties['marginTop']` | `'5dvh'` |
| xOffset | 侧边偏移 | `CSSProperties['marginLeft']` | `'5vw'` |
| zIndex | z-index | `number` | `getDefaultZIndex('modal')` |
| closeOnClickOutside | 点击遮罩关闭 | `boolean` | `true` |
| closeOnEscape | 按 ESC 关闭 | `boolean` | `true` |
| trapFocus | 焦点陷阱 | `boolean` | `true` |
| lockScroll | 锁定滚动 | `boolean` | `true` |
| keepMounted | 关闭后保留 DOM | `boolean` | `false` |
| withinPortal | 在 Portal 中渲染 | `boolean` | `true` |
| scrollAreaComponent | 自定义滚动容器 | `React.FC` | — |
| transitionProps | 过渡属性 | `TransitionProps` | `{ duration: 200, transition: 'fade-down' }` |

### Modal 子组件（组合式 API）

react-ui Modal 还提供了完整的组合式 API：

```tsx
<Modal.Root opened={opened} onClose={close}>
  <Modal.Overlay />
  <Modal.Content>
    <Modal.Header>
      <Modal.Title>标题</Modal.Title>
      <Modal.CloseButton />
    </Modal.Header>
    <Modal.Body>内容</Modal.Body>
  </Modal.Content>
</Modal.Root>
```

- `Modal.Root`：根容器，管理状态。
- `Modal.Overlay`：遮罩层。
- `Modal.Content`：内容容器。
- `Modal.Header`：头部容器。
- `Modal.Title`：标题。
- `Modal.CloseButton`：关闭按钮。
- `Modal.Body`：主体内容。
- `Modal.Stack`：模态框栈（同时打开多个时使用）。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
