---
category: Components
title: Alert
subtitle: 警告提示
description: react-ui Alert 警告提示组件。
group:
  title: 反馈
  order: 6
---

## 何时使用 {#when-to-use}

需要在页面或表单顶部突出显示重要提示信息、警告或成功反馈，且不阻塞用户操作时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

- 根元素 role 设置为 `alert`
- 若提供了 `title`，`aria-describedby` 设置为 body 元素 id，`aria-labelledby` 设置为 title 元素 id
- 设置 `closeButtonLabel` 属性以使关闭按钮可访问

```tsx
import { Alert } from '@react-ui/ui';

function Invalid() {
  // -> 不正确
  return <Alert withCloseButton />;
}

function Valid() {
  // -> 正确
  return <Alert withCloseButton closeButtonLabel="关闭" />;
}

function AlsoValid() {
  // -> 正确，没有关闭按钮时不需要 closeButtonLabel
  return <Alert />;
}
```

<StylesApiSelectors component="Alert"></StylesApiSelectors>

## API {#api}

### AlertProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 视觉变体 | `'filled' \| 'light' \| 'outline' \| 'default' \| 'transparent' \| 'white'` | `'light'` |
| color | 主题色 | `UIColor` | `'blue'` |
| radius | 圆角 | `UIRadius` | — |
| title | 标题 | `ReactNode` | — |
| icon | 标题前图标 | `ReactNode` | — |
| withCloseButton | 是否显示关闭按钮 | `boolean` | `false` |
| onClose | 关闭按钮回调 | `() => void` | — |
| closeButtonLabel | 关闭按钮 aria-label | `string` | — |
| autoContrast | 是否根据背景自动调整文字颜色 | `boolean` | `false` |

除上表所列属性外，Alert 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
