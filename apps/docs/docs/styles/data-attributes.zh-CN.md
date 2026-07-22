---
category: Styles
title: DataAttributes
subtitle: data 属性
description: react-ui DataAttributes 文档。
---


## 演示

以下示例展示了如何利用 `data-disabled` 和 `data-position` 属性为按钮及其 section 应用条件样式：

<code src="./data-attributes/demo/dataAttributes.tsx"></code>

## data attributes 值

大多数 `data-*` 属性没有相关联的值。它们表示布尔状态或特性。例如，当 [Button](/components/button) 上的 `disabled` prop 被设置时，`data-disabled` 属性会被添加到 `<button />` 元素：


将输出以下 HTML：


然后你可以使用此属性为禁用按钮应用样式：


当未设置 `disabled` prop 时，`data-disabled` 属性不会被添加到按钮：


在某些情况下，`data-*` 属性具有相关联的值。例如，[Button](/components/button) 组件的 `section` 元素具有相关联的 `data-position` 属性，其值可以是 `left` 或 `right`。以下示例将渲染两个 `section` 元素，一个带有 `data-position="left"`，另一个带有 `data-position="right"`：


将输出以下 HTML：


然后你可以使用此属性为左侧和右侧 section 应用样式：

```tsx
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button disabled className="my-button">
      Disabled button
    </Button>
  );
}
```

```html
<button class="my-button" data-disabled>禁用按钮</button>
```

```css
.my-button {
  color: var(--ui-color-black);

  &[data-disabled] {
    color: var(--ui-color-gray-5);
  }
}
```

```html
<button class="my-button">非禁用按钮</button>
```

```tsx
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button leftSection="L" rightSection="R">
      Label
    </Button>
  );
}
```

```html
<button>
  <span class="section" data-position="left">L</span>
  Label
  <span class="section" data-position="right">R</span>
</button>
```

```css
.section {
  /* 应用于两个 section 的样式 */
  width: 2rem;

  /* 仅应用于左侧 section 的样式 */
  &[data-position='left'] {
    background-color: red;
  }

  /* 仅应用于右侧 section 的样式 */
  &[data-position='right'] {
    background-color: blue;
  }
}
```

## 组件 data attributes 文档

每个使用 `data-*` 属性的组件都在 `Styles API` 标签下有一个专门的章节。

[Button](/components/button) 组件的 `data-*` 属性表：

> 完整的 `data-*` 属性列表请参考 [Button 组件的 Styles API](/components/button#api)。

如何阅读表格：

- `selector` 列 – 添加 data attribute 的 [Styles API](/docs/styles/styles-api) 选择器（或多个选择器）
- `attribute` 列 – data attribute 名称
- `condition` 列 – 将 data attribute 添加到元素的条件
- `value` 列 – data attribute 的值

## mod prop

所有组件都支持 `mod` prop，它允许向根元素添加 data attributes。CamelCase 键会转换为 kebab-case。如果键以 `data-` 开头，则不会重复添加前缀。

使用 `mod` prop 的示例：

```tsx
import { Box } from '@xiaoye-react/ui';

<Box mod="data-button" />;
// -> <div data-button />

<Box mod={{ opened: true }} />;
// -> <div data-opened />

<Box mod={{ someValue: 'hello' }} />;
// -> <div data-some-value="hello" />

<Box mod={{ opened: false }} />;
// -> <div />

<Box mod={['button', { opened: true }]} />;
// -> <div data-button data-opened />

<Box mod={{ orientation: 'horizontal' }} />;
// -> <div data-orientation="horizontal" />
```
