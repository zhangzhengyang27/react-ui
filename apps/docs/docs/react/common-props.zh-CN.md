---
group:
  title: 进阶使用
order: 6
title: 通用属性
---

> Tips: 以下通用属性适用于 react-ui 大部分组件，组件 props 继承自 `ElementProps`，完整支持原生 HTML 属性。不支持的组件会在其 API 文档中单独说明。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| style | 自定义样式 | CSSProperties | - |
| className | 自定义类名 | string | - |
| id | 元素 id | string | - |
| title | 元素原生 tooltip | string | - |
| lang | 元素语言 | string | - |
| dir | 文本方向 | `'ltr' \| 'rtl' \| 'auto'` | - |
| hidden | 是否隐藏 | boolean | false |
| tabIndex | tab 焦点顺序 | number | - |
| role | ARIA 角色 | string | - |
| aria-* | 无障碍属性 | various | - |
| data-* | 自定义 data 属性 | various | - |
| onClick | 点击事件 | `(event: MouseEvent) => void` | - |
| onChange | 变化事件 | `(event: ChangeEvent) => void` | - |
| onFocus | 聚焦事件 | `(event: FocusEvent) => void` | - |
| onBlur | 失焦事件 | `(event: FocusEvent) => void` | - |
| ref | 引用 | `Ref<HTMLDivElement>` | - |

## 关于 ElementProps

`react-ui` 的所有组件 props 都继承自 `ElementProps`，确保完整支持对应 HTML 元素的所有原生属性。例如 `Button` 继承自 `ElementProps<'button'>`，`TextInput` 继承自 `ElementProps<'input'>`。

```tsx
import type { ElementProps } from '@react-ui/ui';

type MyProps = ElementProps<'button'> & {
  variant?: 'filled' | 'outline';
};
```

## TypeScript 类型推导

`react-ui` 使用 TypeScript 编写，组件 props 类型导出齐全，IDE 会自动补全所有原生 HTML 属性与组件自定义属性。

```tsx
import { Button } from '@react-ui/ui';

// 这里 variant 是组件自定义属性，type 是原生 button 属性
<Button variant="filled" type="submit" disabled>提交</Button>
```
