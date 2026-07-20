---
category: Components
title: Portal
subtitle: 传送门
description: react-ui Portal 传送门组件。
group:
  title: 工具
  order: 7
---

## 何时使用 {#when-to-use}

`Portal` 是 [ReactDOM.createPortal](https://reactjs.org/docs/portals.html) API 的包装组件，将任意组件或元素渲染到 `document.body` 末尾或指定元素中。[Modal](/components/modal) 和 [Drawer](/components/drawer) 组件默认包裹在 Portal 中。

当希望防止父级样式影响子元素时（通常与 `position` 和 `z-index` 相关），Portal 非常有用，常用于固定定位的组件，例如模态框。

## 代码演示 {#examples}

### 用法

Portal 是 [ReactDOM.createPortal](https://reactjs.org/docs/portals.html) API 的包装组件。将任意组件或元素渲染到 `document.body` 末尾或指定元素中。[Modal](/components/modal/) 和 [Drawer](/components/drawer/) 组件默认包裹在 Portal 中。

使用 Portal 将组件或元素渲染到不同位置（默认在 `document.body` 末尾）。当希望防止父级样式影响子元素时，Portal 非常有用。通常这些样式都与 `position` 和 `z-index` 属性相关，Portal 用于固定定位的组件，例如模态框。


在上面的示例中，div 元素在父级 main 外部渲染（在 body 结束标签之前），但仍会接收 `opened` 和 `onClose` 属性。该元素不会受父级 z-index 影响。

```tsx
import { useState } from 'react';
import { Portal } from '@react-ui/ui';

function Demo() {
  const [opened, setOpened] = useState(false);

  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {opened && (
        <Portal>
          <div>你的模态框内容</div>
        </Portal>
      )}

      <button onClick={() => setOpened(true)} type="button">
        打开模态框
      </button>
    </main>
  );
}
```

### 复用目标节点

默认情况下，Portal 对所有实例复用同一个目标节点（`reuseTargetNode={true}`）。要为每个实例创建新的目标节点，请设置 `reuseTargetNode={false}`。在以下示例中，三个段落将分别渲染在独立的目标节点中：

```tsx
import { Portal } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Portal reuseTargetNode={false}>
        <p>第一</p>
      </Portal>

      <Portal reuseTargetNode={false}>
        <p>第二</p>
      </Portal>

      <Portal reuseTargetNode={false}>
        <p>第三</p>
      </Portal>
    </>
  );
}
```

### 指定目标 DOM 节点

可通过传入 `target` 属性指定 Portal 渲染的 DOM 节点：


或者，可指定一个选择器，将 Portal 渲染到已有元素中：


若未指定目标元素，则会为每个 Portal 组件创建并附加一个新的目标元素到 `document.body`。

```tsx
import { Portal } from '@react-ui/ui';

const container = document.createElement('div');
document.body.appendChild(container);

function Demo() {
  return <Portal target={container}>我的 Portal</Portal>;
}
```

```tsx
import { Portal } from '@react-ui/ui';

function Demo() {
  return <Portal target="#portal-container">我的 Portal</Portal>;
}
```

### OptionalPortal 组件

`OptionalPortal` 组件允许配置子元素是否应在 `Portal` 中渲染。它接受与 `Portal` 组件相同的属性：

```tsx
import { OptionalPortal } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <OptionalPortal withinPortal>
        This text is rendered in Portal
      </OptionalPortal>
      <OptionalPortal withinPortal={false}>
        This text is rendered as regular child
      </OptionalPortal>
    </>
  );
}
```



## API {#api}

### PortalProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 要传送的子元素 | `React.ReactNode` | — |
| target | 目标容器（元素或选择器） | `HTMLElement \| string` | `document.body` |
| reuseTargetNode | 是否复用目标节点 | `boolean` | `true` |

### OptionalPortalProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| withinPortal | 是否在 Portal 中渲染 | `boolean` | `true` |
| children | 子元素 | `React.ReactNode` | — |

## FAQ {#faq}

### 服务端渲染支持

`createPortal` 在服务端渲染期间不受支持。Portal 内的所有组件只在应用挂载到 DOM 后才会渲染。

### OptionalPortal 组件

`OptionalPortal` 组件允许配置子元素是否应在 `Portal` 中渲染。它接受与 `Portal` 组件相同的属性：

```tsx
import { OptionalPortal } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <OptionalPortal withinPortal>
        This text is rendered in Portal
      </OptionalPortal>
      <OptionalPortal withinPortal={false}>
        This text is rendered as regular child
      </OptionalPortal>
    </>
  );
}
```
