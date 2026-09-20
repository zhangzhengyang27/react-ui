---
category: Components
title: Text
subtitle: 文本
description: react-ui Text 文本组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要统一展示正文文字，控制字号、字重、颜色、行高等排版样式时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

<code src="./demo/gradient.tsx"></code>

### 截断

设置 `truncate` 属性以添加 `text-overflow: ellipsis` 样式：

<code src="./demo/truncate.tsx"></code>

### 行数限制

使用 `lineClamp` 属性指定最大行数。此选项使用 [-webkit-line-clamp](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp)
CSS 属性（[caniuse](https://caniuse.com/css-line-clamp)）。注意，不能在文本元素上设置 `padding-bottom`：


行数限制也可以与任何子元素一起使用（不仅是字符串），例如与 [Typography](/components/typography/) 一起：

<code src="./demo/linesConfigurator.tsx"></code>

<code src="./demo/lineClamp.tsx"></code>

### 继承样式

Text 始终应用 font-size、font-family 和 line-height 样式，
但在某些情况下这不是期望的行为。要强制 Text 继承父元素
样式，请设置 `inherit` 属性。例如，高亮 [Title](/components/title/) 的一部分：

<code src="./demo/inherit.tsx"></code>

### 文本换行

使用 `textWrap` 属性控制 `text-wrap` CSS 属性。例如，`balance` 可使
行长度均匀，`pretty` 可防止最后一行出现孤字：

<code src="./demo/textWrap.tsx"></code>

### span 属性

使用 `span` 属性作为 `component="span"` 的简写：

```tsx
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Text span>与下方相同</Text>
      <Text component="span">与上方相同</Text>
    </>
  );
}
```

<Gradient component="Text"></Gradient>

<Polymorphic defaultElement="p" changeToElement="a" component="Text"></Polymorphic>



## API {#api}

### TextProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 字号 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| string` | `'md'` |
| fw | 字重（Box 样式属性，支持响应式） | `StyleProp<React.CSSProperties['fontWeight']>` | `400` |
| c | 文字色 | `UIColor` | — |
| td | text-decoration | `'underline' \| 'line-through'` | — |
| tt | text-transform | `'capitalize' \| 'uppercase' \| 'lowercase'` | — |
| variant | 视觉变体 | `'default' \| 'gradient'` | `'default'` |
| gradient | 渐变配置（variant='gradient' 时生效） | `{ from: UIColor; to: UIColor; deg?: number }` | — |
| truncate | 是否单行截断 | `boolean \| 'end'` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
