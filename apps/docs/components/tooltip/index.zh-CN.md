---
category: Components
title: Tooltip
subtitle: 文字提示
description: react-ui Tooltip 文字提示组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要当用户悬停或聚焦在元素上时，弹出一段简短文字提示时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### Tooltip 子元素

Tooltip 要求单个元素或组件作为子元素——
字符串、片段、数字和多个元素/组件不受支持，**会抛出错误**。
自定义组件必须提供获取根元素 ref 的属性；
所有 ReactUI 组件都默认支持 ref。

```tsx
import { Badge, Tooltip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Tooltip label="确定">
        <button>Native button – ok</button>
      </Tooltip>

      <Tooltip label="确定">
        <Badge>ReactUI component – ok</Badge>
      </Tooltip>

      <Tooltip label="抛出">
        Raw string, NOT OK – will throw an error
      </Tooltip>

      {/* Number, NOT OK – will throw an error */}
      <Tooltip label="抛出">{2}</Tooltip>

      <Tooltip label="抛出">
        <>Fragment, NOT OK, will throw an error</>
      </Tooltip>

      <Tooltip label="抛出">
        <div>多个节点</div>
        <div>NOT OK, will throw an error</div>
      </Tooltip>
    </>
  );
}
```

### Tooltip 目标

`target` 属性是 `children` 的替代方案。它接受字符串（选择器）、
HTML 元素或包含 HTML 元素的 ref 对象。当不将 tooltip 目标渲染为 JSX 元素时，
请使用 `target` 属性。

使用字符串选择器的 `target` 属性示例：

<code src="./demo/target.tsx"></code>

### 必需的 ref 属性

渲染在 `Tooltip` 内的自定义组件必须支持 `ref` 属性：


组件必须支持 `ref` 属性：

```tsx
// 不会生效的代码示例
import { Tooltip } from '@xiaoye-react/ui';

function MyComponent() {
  return <div>我的组件</div>;
}

// 这不会生效——MyComponent 不支持 ref
function Demo() {
  return (
    <Tooltip label="无效">
      <MyComponent />
    </Tooltip>
  );
}
```

```tsx
// 会生效的代码示例
import { Tooltip } from '@xiaoye-react/ui';

const MyComponent = ({ ref, ...props }) => (
  <div ref={ref} {...props}>
    My component
  </div>
);

// 正确工作——ref 被转发
function Demo() {
  return (
    <Tooltip label="有效">
      <MyComponent />
    </Tooltip>
  );
}
```

### 颜色

<code src="./demo/configurator.tsx"></code>

### 偏移

将 `offset` 属性设置为数字以更改 tooltip 相对于目标元素的位置（只作用于主轴方向）。

<code src="./demo/offset.tsx"></code>

### 箭头

设置 `withArrow` 属性为 tooltip 添加箭头。箭头是一个使用 `transform: rotate(45deg)` 旋转的 `div` 元素。

当 `Popover` 组件的 `position` 设置为 `*-start` 和 `*-end` 值时，`arrowPosition` 属性决定箭头相对于目标元素的定位方式。
默认值为 `center`——如果可能，箭头会位于目标元素的中心。

如果将 `arrowPosition` 更改为 `side`，则箭头会位于目标元素的一侧，
并且可使用 `arrowOffset` 属性控制箭头偏移。注意，当 `arrowPosition` 设置为 `center` 时，
`arrowOffset` 属性会被忽略。

如果将 `arrowPosition` 设置为 `merge`，箭头会形成一个与 tooltip 相应角合并的直角三角形，
并且该角的 border radius 会被移除。此模式仅适用于
`*-start` 和 `*-end` 位置。注意，当 `arrowPosition` 设置为 `merge` 时，
`arrowOffset` 和 `arrowRadius` 属性会被忽略。

<code src="./demo/arrow.tsx"></code>

### 受控模式

<code src="./demo/controlled.tsx"></code>

### 更改触发事件

触发 tooltip 的事件可以使用 `events` 属性更改；它接受一个对象，
其中的以下属性决定哪些事件会触发 tooltip：

- `hover` – 鼠标悬停事件，默认为 `true`
- `focus` – 聚焦/失焦事件，不包括点击目标元素，默认为 `false`
- `touch` – 触摸屏设备事件，默认为 `false`

```tsx
import { Tooltip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip
      label="提示"
      events={{ hover: true, focus: true, touch: false }}
    >
      <button>目标</button>
    </Tooltip>
  );
}
```

### 多行

要启用多行模式，请设置 `multiline` 属性以启用换行，并使用 `w` [样式属性](/docs/styles/style-props) 设置 tooltip 宽度：

<code src="./demo/multiline.tsx"></code>

### 行内

设置 `inline` 属性以将 `Tooltip` 用于行内元素：

<code src="./demo/inline.tsx"></code>

### 更改过渡

Tooltip 基于 [Transition](/components/transition/) 组件构建；它支持 `transitionProps` 属性：


所有可用的预置过渡：

```tsx
import { Button, Tooltip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip
      label="带自定义过渡的提示"
      transitionProps={{ transition: 'skew-up', duration: 300 }}
    >
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
```


### 关闭和打开延迟

可通过设置 `openDelay` 和 `closeDelay` 属性（单位为毫秒）来延迟 tooltip 的打开/关闭事件：

<code src="./demo/delay.tsx"></code>

### Tooltip 延迟组

`Tooltip.Group` 组件可用于同步多个 tooltip 的打开和关闭延迟：

<code src="./demo/group.tsx"></code>

### 浮动 tooltip

`Tooltip.Floating` 组件与 Tooltip 组件具有相同的 API，但 tooltip 会跟随鼠标：

<code src="./demo/floating.tsx"></code>

### 可访问性

Tooltip 遵循 [WAI-ARIA 建议](https://www.w3.org/TR/wai-aria-practices/#tooltip)：

- tooltip 主体具有 `role="tooltip"` 属性
- 目标元素具有 `aria-describedby` 属性
- `Tooltip.Floating` 会被屏幕阅读器忽略

默认情况下，Tooltip 不会由聚焦事件触发，因此使用屏幕阅读器
或键盘导航的用户将无法获取 tooltip 内容。设置 `events` 属性以启用
聚焦/失焦 tooltip 事件：

```tsx
import { Button, Tooltip } from '@xiaoye-react/ui';

// Tooltip 将对屏幕阅读器可见
function Demo() {
  return (
    <Tooltip
      label="提示"
      events={{ hover: true, focus: true, touch: false }}
    >
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
```



## API {#api}

### TooltipProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 触发元素 | `ReactNode` | — |
| label | 提示文字 | `ReactNode` | — |
| position | 浮层位置 | `TooltipPosition` | `'top'` |
| withArrow | 是否显示箭头 | `boolean` | `false` |
| color | 背景色 | `UIColor` | `'gray'` |
| multiline | 是否允许多行 | `boolean` | `false` |
| width | 宽度 | `number \| string` | — |
| offset | 偏移 | `number` | `8` |
| transitionProps | 过渡属性 | `TransitionProps` | — |
| openDelay | 打开延迟（ms） | `number` | `0` |
| closeDelay | 关闭延迟（ms） | `number` | `100` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
