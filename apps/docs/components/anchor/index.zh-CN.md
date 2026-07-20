---
category: Components
title: Anchor
subtitle: 锚点
description: react-ui Anchor 锚点组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在长文档中提供目录跳转链接，帮助用户快速定位到对应章节时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 下划线

使用 `underline` 属性配置 `text-decoration`。它接受以下值：

- `always` – 链接始终有下划线
- `hover` – 悬停时链接有下划线
- `never` – 链接永远没有下划线
- `not-hover` – 未悬停时链接有下划线

还可使用 [default props](/docs/theming/default-props) 为所有 `Anchor` 组件配置 `underline` 属性：

```tsx
import { Anchor, createTheme, UIProvider } from '@react-ui/ui';

const theme = createTheme({
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: 'always',
      },
    }),
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* 你的应用内容 */}
    </UIProvider>
  );
}
```

<code src="./demo/decoration.tsx"></code>

### Text 属性

`Anchor` 组件支持所有 [Text](/components/text) 组件属性。例如，可使用渐变变体：

<code src="./demo/textProps.tsx"></code>

<Polymorphic defaultElement="a" changeToElement="button" component="Anchor" withNext></Polymorphic>

<GetElementRef component="Anchor" refType="a"></GetElementRef>

## API {#api}

### AnchorProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| underline | 下划线样式 | `'always' \| 'hover' \| 'never'` | `'hover'` |
| color | 主题色 | `UIColor` | `'blue'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` |
| href | 链接地址 | `string` | — |
| target | 链接打开方式 | `string` | — |
| external | 是否外部链接（自动添加 rel="noopener noreferrer"） | `boolean` | `false` |

除上表所列属性外，Anchor 还支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
