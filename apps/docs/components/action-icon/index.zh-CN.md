---
category: Components
title: ActionIcon
subtitle: 动作图标
description: react-ui ActionIcon 动作图标组件。
group:
  title: 其他
  order: 7
---

## 何时使用 {#when-to-use}

需要在一个紧凑的方形按钮内放置图标，用于触发次要操作（如复制、收藏、删除）时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

<code src="./demo/gradient.tsx"></code>

### 尺寸

可在 `size` 属性中使用任意有效的 CSS 值，该属性用于设置 `width`、`min-width`、`min-height` 和 `height`。注意，`size` 属性不会控制子元素[图标](/docs/guides/icons)的大小——需在图标组件上手动设置。当 `size` 为数字时，该值被视为 `px` 单位，并转换为 [rem](/docs/styles/rem) 单位。

若希望 `ActionIcon` 与 ReactUI 输入框大小相同，请使用 `size="input-sm"` 属性：

<code src="./demo/size.tsx"></code>

<code src="./demo/inputSize.tsx"></code>

### 禁用状态

要使 `ActionIcon` 禁用，请设置 `disabled` 属性。这将阻止与按钮的任何交互并添加禁用样式。若希望按钮看起来被禁用但仍可交互，请改为设置 `data-disabled` 属性。注意，所有变体的禁用样式都相同。

<code src="./demo/disabled.tsx"></code>

### ActionIcon 作为链接时的禁用状态

`<a />` 元素不支持 `disabled` 属性。要在 `ActionIcon` 渲染为链接时禁用它，请改为设置 `data-disabled` 属性，并在 `onClick` 事件处理函数中阻止默认行为。

<code src="./demo/disabledLink.tsx"></code>

### 自定义禁用样式

要自定义禁用样式，建议同时使用 `&:disabled` 和 `&[data-disabled]` 选择器：

- `&:disabled` 用于在设置 `disabled` 属性时设置按钮样式，以及当父组件禁用按钮时（例如在包含 `ActionIcon` 的 `<fieldset />` 元素上设置 `disabled` 属性时）。
- `&[data-disabled]` 用于在按钮实际上未被禁用但应看起来被禁用时设置样式（例如需要将 [Tooltip](/components/tooltip) 与禁用的 `ActionIcon` 一起使用，或当 `ActionIcon` 用作链接时，应使用 `data-disabled`）

<code src="./demo/disabledStyles.tsx"></code>

### 带 Tooltip 的禁用按钮

`onMouseLeave` 事件在 `ActionIcon` 被禁用时[不会触发](https://github.com/facebook/react/issues/18753)，因此若需要将 [Tooltip](/components/tooltip) 与禁用的 `ActionIcon` 一起使用，需在 `ActionIcon` 上设置 `data-disabled` 属性而非 `disabled`。同时还需将 `onClick` 事件处理函数改为 `(event) => event.preventDefault()`，因为 `ActionIcon` 实际上并未禁用，仍会触发 `onClick` 事件。

<code src="./demo/disabledTooltip.tsx"></code>

### 加载状态

设置 `loading` 属性后，`ActionIcon` 将被禁用，并在按钮中心渲染一个带有遮罩的 [Loader](/components/loader)。Loader 的颜色取决于 `ActionIcon` 的变体。

<code src="./demo/loading.tsx"></code>

### Loader 属性

可使用 `loaderProps` 属性自定义 [Loader](/components/loader)，它接受 Loader 组件的所有属性：

<code src="./demo/loaderProps.tsx"></code>

### 添加自定义变体

要添加新的 `ActionIcon` 变体，请使用 [data-variant](/docs/styles/variants-sizes) 属性。通常新的变体会添加到[主题](/docs/theming/theme-object)中，以便在应用中的所有 `ActionIcon` 组件内使用。

<code src="./demo/customVariant.tsx"></code>

### 自定义变体颜色

可通过向主题添加 [variantColorResolver](/docs/theming/colors#colors-variant-resolver) 来自定义 `ActionIcon` 及其他组件变体的颜色。

<code src="./demo/variantColorsResolver.tsx"></code>

<code src="./demo/autoContrast.tsx"></code>

### 添加自定义尺寸

`ActionIcon` 的尺寸由 `--ai-size-{x}` CSS 变量定义。添加新尺寸最简单的方法是在 `root` 元素上定义额外的 `--ai-size-{x}` 变量：

<code src="./demo/customSize.tsx"></code>

### ActionIcon.Group

`ActionIcon.Group` 渲染时带有 `role="group"`。当该组合代表一组有意义的操作时，请使用 `aria-label`（或 `aria-labelledby`）为其提供可访问名称，以便屏幕阅读器播报其用途：

注意，不可用任何额外的元素包裹子 `ActionIcon` 组件：

```tsx
import { ActionIcon } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ActionIcon.Group aria-label="文本格式">
      {/* ...ActionIcon components */}
    </ActionIcon.Group>
  );
}
```

```tsx
import { ActionIcon } from '@xiaoye-react/ui';

// 将无法正常工作
function Demo() {
  return (
    <ActionIcon.Group>
      <div>
        <ActionIcon>这将不会生效</ActionIcon>
      </div>
      <ActionIcon>ActionIcon 会有不正确的边框</ActionIcon>
    </ActionIcon.Group>
  );
}
```

<code src="./demo/group.tsx"></code>

### ActionIcon.GroupSection

使用 `ActionIcon.GroupSection` 组件在 `ActionIcon.Group` 内渲染不是 `ActionIcon` 的区域：

<code src="./demo/groupSection.tsx"></code>

### 可访问性

要使 `ActionIcon` 对屏幕阅读器可访问，需要设置 `aria-label` 或使用 [VisuallyHidden](/components/visually-hidden) 组件：

```tsx
import { HeartIcon } from '@phosphor-icons/react';
import { ActionIcon, VisuallyHidden } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <ActionIcon aria-label="点赞帖子">
        <HeartIcon />
      </ActionIcon>

      <ActionIcon>
        <VisuallyHidden>点赞帖子</VisuallyHidden>
        <HeartIcon />
      </ActionIcon>
    </>
  );
}
```

<Gradient component="ActionIcon"></Gradient>

<AutoContrast component="ActionIcon"></AutoContrast>

<Polymorphic defaultElement="button" changeToElement="a" component="ActionIcon" withNext></Polymorphic>

<GetElementRef component="ActionIcon" refType="button"></GetElementRef>

## API {#api}

### ActionIconProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 视觉变体 | `'default' \| 'filled' \| 'light' \| 'outline' \| 'transparent' \| 'subtle'` | `'filled'` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| radius | 圆角 | `UIRadius` | `'sm'` |
| loading | 加载中状态 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loaderProps | 加载指示器属性 | `{ ... }` | — |
| onClick | 点击回调 | `(event) => void` | — |

除上表所列属性外，ActionIcon 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
