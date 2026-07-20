---
category: Components
title: Transition
subtitle: 过渡
description: react-ui Transition 过渡组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要为子元素添加进入/离开的过渡动画（如淡入淡出、缩放）时使用。

## 代码演示 {#examples}

### 用法

Transition 组件用于为固定或绝对定位的元素添加出现/消失动画，例如下拉菜单、模态框或工具提示。其他 ReactUI 组件（如 [Modal](/components/modal) 和 [Tooltip](/components/tooltip)）内部使用 Transition 来实现动画。

注意，Transition 组件并不打算作为所有动画的全面解决方案。它是一个简单的工具，用于为固定或绝对定位的元素添加出现/消失动画。若需实现更复杂的动画，请考虑使用 [Motion](https://motion.dev/)、[React Spring](https://www.react-spring.dev/) 或其他专用动画库。

Transition 组件的示例用法：

```tsx
import { Transition } from '@react-ui/ui';

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition mounted={opened} transition="fade">
      {(styles) => <div style={styles}>你的模态框</div>}
    </Transition>
  );
}
```

### 预设过渡

ReactUI 包含几个预设过渡：


要使用其中一个，请将 `transition` 属性设置为以下值之一：

```tsx
import { Transition } from '@react-ui/ui';

function Demo({ opened }: { opened: boolean }) {
  return (
    <Transition
      mounted={opened}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => <div style={styles}>你的模态框</div>}
    </Transition>
  );
}
```

### 自定义过渡

可创建自定义过渡。`transition` 是一个包含 4 个属性的对象：

- `in` – 挂载状态的样式
- `out` – 卸载状态的样式
- `common`（可选）– 挂载和卸载状态的共同样式
- `transitionProperty` – 参与过渡的属性

<code src="./demo/custom.tsx"></code>

### 进入和退出延迟

使用 `enterDelay` 和 `exitDelay` 属性延迟过渡开始。值为毫秒：

<code src="./demo/delay.tsx"></code>

### 减少动画

Transition 尊重 `prefers-reduced-motion` 媒体查询和主题中的 `respectReducedMotion` 设置。当偏好减少动画时，所有过渡会立即完成：


这提高了对前庭障碍用户的可访问性，他们可能会因动画而感到晕动症。

```tsx
import { createTheme, UIProvider, Transition } from '@react-ui/ui';

const theme = createTheme({
  respectReducedMotion: true, // default
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      <Transition mounted transition="fade" duration={400}>
        {(styles) => <div style={styles}>内容</div>}
      </Transition>
    </UIProvider>
  );
}
```

### 生命周期回调

使用生命周期回调在过渡的不同阶段执行操作：

- `onEnter` - 进入过渡开始时调用
- `onEntered` - 进入过渡完成时调用
- `onExit` - 退出过渡开始时调用
- `onExited` - 退出过渡完成时调用

```tsx
import { Transition } from '@react-ui/ui';

function Demo() {
  return (
    <Transition
      mounted
      transition="fade"
      duration={200}
      onEnter={() => console.log('Enter started')}
      onEntered={() => console.log('Enter completed')}
      onExit={() => console.log('Exit started')}
      onExited={() => console.log('Exit completed')}
    >
      {(styles) => <div style={styles}>内容</div>}
    </Transition>
  );
}
```

### 保持挂载

默认情况下，过渡完成后元素会从 DOM 中卸载。使用 `keepMounted` 可使元素保持挂载状态并带有 `display: none`：


这在以下情况下很有用：
- 在隐藏/显示期间保留元素状态
- 避免重新挂载开销
- 保持焦点/滚动位置

```tsx
import { Transition } from '@react-ui/ui';

function Demo() {
  return (
    <Transition mounted={false} keepMounted transition="fade">
      {(styles) => <div style={styles}>内容</div>}
    </Transition>
  );
}
```



## API {#api}

### TransitionProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mounted | 是否挂载 | `boolean` | `false` |
| transition | 过渡名称 | `'fade' \| 'scale' \| 'skew-up' \| 'rotate-right' \| 'rotate-left'` | `'fade'` |
| duration | 过渡时长（ms） | `number` | `250` |
| timingFunction | 缓动函数 | `string` | `'ease'` |
| onTransitionStart | 过渡开始回调 | `() => void` | — |
| onTransitionEnd | 过渡结束回调 | `() => void` | — |
| enterDelay | 进入延迟（ms） | `number` | `0` |
| exitDelay | 离开延迟（ms） | `number` | `0` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
