---
category: Components
title: SegmentedControl
subtitle: 分段控制
description: react-ui SegmentedControl 分段控制组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要在一组互斥选项中以紧凑的胶囊分段形式切换时使用，类似 iOS 分段控件。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('react');

  return (
    <SegmentedControl
      value={value}
      onChange={setValue}
      data={[
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'ng' },
        { label: 'Vue', value: 'vue' },
        { label: 'Svelte', value: 'svelte' },
      ]}
    />
  );
}
```

### 非受控模式

`SegmentedControl` 可以像原生 input 元素一样用于非受控表单。设置 `name` 属性以在表单提交时将分段控制值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `SegmentedControl` 与 `FormData` 的示例用法：

```tsx
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Segmented control value:', formData.get('framework'));
      }}
    >
      <SegmentedControl
        name="framework"
        defaultValue="react"
        data={[
          { label: 'React', value: 'react' },
          { label: 'Angular', value: 'ng' },
          { label: 'Vue', value: 'vue' },
          { label: 'Svelte', value: 'svelte' },
        ]}
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### Data 属性

`SegmentedControl` 支持两种不同的数据格式：

1. 基本值数组 – 当 `value` 和 `label` 相同时使用
2. 对象数组 – 当 `value` 和 `label` 不同时使用

```tsx
import { SegmentedControl } from '@xiaoye-react/ui';

function ArrayOfStrings() {
  return (
    <SegmentedControl data={['React', 'Angular', 'Svelte', 'Vue']} />
  );
}

function ArrayOfObjects() {
  return (
    <SegmentedControl
      data={[
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Svelte', label: 'Svelte' },
        { value: 'Vue', label: 'Vue' },
      }}
    />
  );
}
```

### 泛型值类型

`SegmentedControl` 支持泛型值类型。可传入基本值（数字、字符串、布尔值、null）作为类型参数。泛型类型用于 `value`、`defaultValue`、`onChange` 和 `data` 属性。


字符串联合的示例：

```tsx
import { SegmentedControl } from '@xiaoye-react/ui';

function Demo() {
  return (
    <SegmentedControl<'orange' | 'grape' | 'apple'>
      data={[
        { value: 'orange', label: 'Orange' },
        { value: 'grape', label: 'Grape' },
        { value: 'apple', label: 'Apple' },
      ]}
    />
  );
}
```

<code src="./demo/generic.tsx"></code>

### 禁用

要禁用 `SegmentedControl` 中的某一项，请使用对象数组的 `data` 格式，并在要禁用的项上设置 `disabled: true`。要禁用整个组件，请使用 `disabled` 属性。

<code src="./demo/disabled.tsx"></code>

### React node 作为标签

可使用任意 React node 作为标签：

<code src="./demo/labels.tsx"></code>

### 颜色

默认情况下，`SegmentedControl` 在浅色主题中使用 `theme.white` 带阴影，指示器的背景色为 `var(--ui-color-dark-6)`。设置 `color` 属性以更改指示器的 `background-color`：

<code src="./demo/configurator.tsx"></code>

### 自动对比度

`SegmentedControl` 支持 `autoContrast` 属性。如果设置为 `true`，标签文本颜色会自动调整以确保与指示器背景色具有最佳对比度：

<code src="./demo/autoContrast.tsx"></code>

### 过渡动画

使用以下属性更改过渡效果：

- `transitionDuration` – 所有过渡持续时间（毫秒），默认 `200`

<code src="./demo/transitions.tsx"></code>

### 只读

设置 `readOnly` 属性以防止值被更改：

<code src="./demo/readOnly.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性与可用性

`SegmentedControl` 底层使用单选输入框，因此如果标签中有文本，默认就具备可访问性。该组件支持与普通单选按钮组相同的键盘事件。

若标签中没有文本（例如，只想将 `SegmentedControl` 与图标一起使用），请使用 [VisuallyHidden](/components/visually-hidden) 使组件可访问：

<code src="./demo/iconsOnly.tsx"></code>

<StylesApiSelectors component="SegmentedControl"></StylesApiSelectors>



## API {#api}

### SegmentedControlProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值 | `string` | — |
| onChange | 值变化回调 | `(value: string) => void` | — |
| data | 选项数组 | `string[] \| { value: string; label: ReactNode }[]` | `[]` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` |
| color | 主题色 | `UIColor` | `'blue'` |
| fullWidth | 是否占满宽度 | `boolean` | `false` |
| radius | 圆角 | `UIRadius` | `'sm'` |
| orientation | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
