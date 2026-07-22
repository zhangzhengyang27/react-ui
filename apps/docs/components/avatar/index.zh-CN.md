---
category: Components
title: Avatar
subtitle: 头像
description: 用于展示用户头像、品牌标识或图标回退的组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要展示用户头像或品牌标识时使用，支持图片、文字、图标三种回退形式。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 首字母

将 `name` 属性设置为人员姓名（如 `name="John Doe"`）可显示首字母而非默认占位符。同时，可使用 `color="initials"` 根据姓名生成颜色。

<code src="./demo/initials.tsx"></code>

### 允许的首字母颜色

默认情况下，主题中的所有颜色均可用于首字母。通过 `allowedInitialsColors` 属性传入颜色数组可限制可选颜色。需要注意的是，默认颜色数组不包含主题中定义的自定义颜色；如有需要，应手动提供。

<code src="./demo/allowedColors.tsx"></code>

### 占位符

当图片无法加载或未提供图片地址时，Avatar 将显示占位符。默认占位符为图标，也可替换为任意 React 节点。

<code src="./demo/placeholders.tsx"></code>

### 变体

<code src="./demo/configurator.tsx"></code>

### Avatar.Group

`Avatar.Group` 组件可将多个头像组合成堆叠效果。

Avatar.Group 内部的子 Avatar 之间不应再包裹额外元素，但可用不渲染任何 HTML 元素的组件包裹 Avatar，例如 [Tooltip](/components/tooltip)。

与 [Tooltip](/components/tooltip/) 配合使用的示例：

```tsx
import { Avatar } from '@xiaoye-react/ui';

// 以下写法无法正常工作
function Demo() {
  return (
    <Avatar.Group spacing="sm">
      <div>
        <Avatar src="image.png" radius="xl" />
      </div>
      <Avatar src="image.png" radius="xl" />
      <Avatar src="image.png" radius="xl" />
      <Avatar radius="xl">+5</Avatar>
    </Avatar.Group>
  );
}
```

<code src="./demo/group.tsx"></code>

<code src="./demo/groupTooltip.tsx"></code>

<code src="./demo/link.tsx"></code>

### 可访问性

Avatar 渲染 `<img />` HTML 元素。建议始终设置 `alt` 属性以描述图片内容；当图片无法加载时，`alt` 也会作为占位符的 `title` 属性。

```tsx
import { Avatar } from '@xiaoye-react/ui';

function Demo() {
  // ❌ 未设置 alt
  return <Avatar src="./image.png" />;

  // ✅ 已设置 alt
  return <Avatar src="./image.png" alt="Rob Johnson" />;

  // ✅ title 不是必需的，但建议设置
  return <Avatar>RJ</Avatar>;

  // ✅ alt 会作为占位符 title
  return <Avatar alt="Rob Johnson">RJ</Avatar>;
}
```

<Polymorphic defaultElement="div" changeToElement="button" component="Avatar" withNext></Polymorphic>

## API {#api}

### AvatarProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | — |
| alt | 替代文本 | `string` | — |
| name | 名称（用于生成首字母回退） | `string` | — |
| color | 主题色 | `UIColor` | `'gray'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` |
| radius | 圆角 | `UIRadius` | `'100%'` |
| variant | 视觉变体 | `'light' \| 'filled' \| 'outline'` | `'light'` |
| imageProps | img 元素属性 | `ImgHTMLAttributes` | — |

除上表所列属性外，Avatar 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
