---
category: Components
title: Modals
subtitle: 模态框
description: react-ui Modals 文档。
group:
  title: 反馈
  order: 6
---


## 安装

> **⚠️ 尚未发布到 npm**：该组件位于仓库内的 `@xiaoye-react/modals` 包中，此包还没有发布到 npm。组件源码随本仓库提供，发布后此处会更新安装方式。


## 设置 ModalsProvider

使用 `ModalsProvider` 组件包裹你的应用：

```tsx
import { UIProvider } from '@xiaoye-react/ui';
import { ModalsProvider } from '@xiaoye-react/modals';

function Demo() {
  return (
    <UIProvider>
      <ModalsProvider>{/* 你的应用内容 */}</ModalsProvider>
    </UIProvider>
  );
}
```

## 确认弹窗

`@xiaoye-react/ui` 包包含一个专门用于确认的弹窗。该组件带有确认和取消按钮，并支持通过子元素展示有关操作的额外信息。使用 `openConfirmModal` 函数打开确认弹窗：


`openConfirmModal` 函数接受一个参数，包含以下属性：

- `modalId` – 弹窗 id，默认为随机 id，可用于编程方式关闭弹窗
- `children` – 显示在操作按钮之前的额外弹窗内容
- `onCancel` – 点击取消按钮时调用
- `onConfirm` – 点击确认按钮时调用
- `closeOnConfirm` – 点击确认按钮时是否关闭弹窗，默认为 `true`
- `closeOnCancel` – 点击取消按钮时是否关闭弹窗，默认为 `true`
- `cancelProps` – 取消按钮属性
- `confirmProps` – 确认按钮属性
- `groupProps` – 按钮 [Group](/components/group/) 属性
- `labels` – 取消和确认按钮标签，可在 ModalsProvider 上定义

利用这些属性，你可以根据当前上下文自定义确认弹窗：


要为确认弹窗设置共享标签，请在 `ModalsProvider` 上设置 `labels`：

```tsx
import { ModalsProvider } from '@xiaoye-react/modals';

function Demo() {
  return (
    <ModalsProvider labels={{ confirm: '提交', cancel: '取消' }}>
      {/* 你的应用内容 */}
    </ModalsProvider>
  );
}
```

<code src="./demo/confirm.tsx"></code>

<code src="./demo/confirmCustomize.tsx"></code>

## 上下文弹窗

你可以在 ModalsProvider 上下文中定义任意数量的弹窗：


然后使用 `modals.openContextModal` 函数打开其中一个弹窗。`modals.openContextModal` 函数接受两个参数：弹窗键（应与 ModalsProvider 中定义的键一致）和弹窗属性：

```tsx
import { Button, Text } from '@xiaoye-react/ui';
import { ModalsProvider } from '@xiaoye-react/modals';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      关闭弹窗
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...其他弹窗 */ }}
    >
      {/* 你的应用内容 */}
    </ModalsProvider>
  );
}
```

<code src="./demo/context.tsx"></code>

## 类型安全的上下文弹窗

默认情况下，`innerProps` 和 `modal` 不是类型安全的。你可以通过 TypeScript 模块声明添加类型安全。


类型安全的上下文弹窗会强制你为 `openContextModal` 使用正确的类型：

```tsx
const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string }>) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
      关闭弹窗
    </Button>
  </>
);
const modals = {
  demonstration: TestModal,
  /* ...其他弹窗 */
};
declare module '@xiaoye-react/ui' {
  export interface UIModalsOverride {
    modals: typeof modals;
  }
}
function Demo() {
  return (
    <ModalsProvider modals={modals}>
      {/* 你的应用内容 */}
    </ModalsProvider>
  );
}
```

```tsx
import { closeModal, openContextModal } from '@xiaoye-react/modals';

openContextModal({
  modal: 'demonstration',
  title: '来自上下文的测试弹窗',
  innerProps: {
    modalBody:
      '此弹窗在 ModalsProvider 中定义，你可以在应用中的任何地方通过 useModals hook 打开它',
  },
});
closeModal('demonstration');
```

## 内容弹窗

使用 `modals.open` 函数，你可以打开包含任意内容的弹窗：

<code src="./demo/content.tsx"></code>

## 多个打开的弹窗

你可以打开多层弹窗。每个打开的弹窗都会作为弹窗队列中的第一个元素添加。要关闭所有打开的弹窗，请调用 `modals.closeAll()` 函数：

<code src="./demo/multipleSteps.tsx"></code>

## 弹窗属性

你可以通过将属性添加到每个 `modals.x` 函数的参数中，向下传递属性给 [Modal](/components/modal) 组件。以下示例设置 `radius`、`size` 和 `withCloseButton` 属性：

<code src="./demo/modalProps.tsx"></code>

## 动态内容与弹窗管理器

弹窗管理器允许你在打开标准弹窗和上下文弹窗后，动态更新其内容和属性。

要更新普通弹窗，请使用 `modals.updateModal` 函数：


上下文弹窗也可以使用 `modals.updateContextModal` 动态更新：

<code src="./demo/updateModal.tsx"></code>

<code src="./demo/updateContextModal.tsx"></code>
