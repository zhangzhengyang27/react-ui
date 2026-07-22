---
category: Components
title: NativeSelect
subtitle: 原生选择器
description: react-ui NativeSelect 原生选择器组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要使用浏览器原生的下拉选择控件，保持最轻量的交互体验时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');

  return (
    <NativeSelect
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      data={['React', 'Angular', 'Svelte', 'Vue']}
    />
  );
}
```

### 非受控模式

`NativeSelect` 可以像原生 `select` 元素一样用于非受控表单。设置 `name` 属性以在表单提交时将原生选择值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `NativeSelect` 与 `FormData` 的示例用法：

```tsx
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Select value:', formData.get('framework'));
      }}
    >
      <NativeSelect
        label="选择框架"
        name="framework"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        defaultValue="React"
      />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 添加选项

`NativeSelect` 允许通过两种方式传递选项：

- `data` 属性数组
- 使用 `option` 组件的 `children` 属性

注意，如果使用 `children`，`data` 将被忽略。

### data 属性

`data` 属性接受以下格式之一：

1. 字符串数组：


2. 带有 `label`、`value` 和 `disabled` 键的对象数组：


3. 分组选项数组（字符串格式）：


4. 分组选项数组（对象格式）：


使用分组选项数组的 `data` 属性示例：


### children 选项

要通过 `children` 属性添加选项，请使用 `option` 元素添加选项，使用 `optgroup` 元素进行分组：

```tsx
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NativeSelect data={['React', 'Angular', 'Svelte', 'Vue']} />
  );
}
```

```tsx
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NativeSelect
      data={[
        { label: 'React', value: 'react' },
        { label: 'Angular', value: 'angular' },
        { label: 'Svelte', value: 'svelte', disabled: true },
        { label: 'Vue', value: 'vue' },
      ]}
    />
  );
}
```

```tsx
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NativeSelect
      data={[
        {
          group: 'Frontend libraries',
          items: ['React', 'Angular', 'Svelte', 'Vue'],
        },
        {
          group: 'Backend libraries',
          items: ['Express', 'Koa', 'Django'],
        },
      ]}
    />
  );
}
```

```tsx
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NativeSelect
      data={[
        {
          group: 'Frontend libraries',
          items: [
            { label: 'React', value: 'react' },
            { label: 'Angular', value: 'angular' },
            { label: 'Vue', value: 'vue', disabled: true },
          ],
        },
        {
          group: 'Backend libraries',
          items: [
            { label: 'Express', value: 'express' },
            { label: 'Koa', value: 'koa' },
            { label: 'Django', value: 'django' },
          ],
        },
      ]}
    />
  );
}
```

<code src="./demo/data.tsx"></code>

<code src="./demo/options.tsx"></code>

### 使用分隔线

使用 `hr` 标签在选项之间添加分隔线：

<code src="./demo/dividers.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 禁用状态

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<InputFeatures component="NativeSelect" element="select"></InputFeatures>

<InputSections component="NativeSelect"></InputSections>

<StylesApiSelectors component="NativeSelect"></StylesApiSelectors>

<InputAccessibility component="NativeSelect"></InputAccessibility>



## API {#api}

### NativeSelectProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 选项数据 | `ComboboxItem[]` | — |
| value | 当前值 | `string \| string[] \| null` | — |
| defaultValue | 默认值 | `string \| string[] \| null` | — |
| onChange | 值变化回调 | `(value) => void` | — |
| placeholder | 占位提示 | `string` | — |
| searchable | 是否可搜索 | `boolean` | `false` |
| clearable | 是否可清空 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
