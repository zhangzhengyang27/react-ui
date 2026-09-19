---
category: Components
title: TagsInput
subtitle: 标签输入
description: react-ui TagsInput 标签输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户自由输入多个标签并逐个展示、删除时使用。

## 代码演示 {#examples}

### 用法

`TagsInput` 提供了一种输入多个值的方式。它可以与建议一起使用，也可以不使用。`TagsInput` 与 [MultiSelect](/components/multi-select) 类似，但允许输入自定义值。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框的右侧。可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 受控模式

`TagsInput` 的值必须是字符串数组，不支持其他类型。`onChange` 函数以字符串数组作为唯一参数被调用。

```tsx
import { useState } from 'react';
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return <TagsInput data={[]} value={value} onChange={setValue} />;
}
```

### 受控搜索值

可使用 `searchValue` 和 `onSearchChange` 属性控制搜索值：

```tsx
import { useState } from 'react';
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <TagsInput
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      data={[]}
    />
  );
}
```

### 可清除

设置 `clearable` 属性可在右侧区域显示清除按钮。以下情况不显示按钮：

- 组件没有值
- 组件被禁用
- 组件为只读

<code src="./demo/clearable.tsx"></code>

### 最大选中数量

可使用 `maxTags` 属性限制可选值的数量。达到限制后将无法再添加更多值。

<code src="./demo/maxTags.tsx"></code>

### 允许重复

默认情况下，`TagsInput` 不允许添加重复值，但可通过设置 `allowDuplicates` 属性来更改此行为。如果值已经存在于 `value` 数组中，则无论大小写和尾部空格如何，都被视为重复。

<code src="./demo/allowDuplicates.tsx"></code>

### 分隔字符

默认情况下，`TagsInput` 按逗号（`,`）分隔值，可通过将 `splitChars` 属性设置为字符串数组来更改此行为。`splitChars` 中的所有值都不会包含在最终值中。粘贴时也会按分隔符拆分。

按 `,`、`|` 和空格分隔的示例：

<code src="./demo/splitChars.tsx"></code>

### 带建议

`TagsInput` 可以与建议一起使用，它会在输入框下方渲染建议列表，并允许使用键盘或鼠标选择建议。注意用户不限于建议，仍然可以输入自定义值。若希望只允许建议中的值，请改用 [MultiSelect](/components/multi-select) 组件。

<code src="./demo/data.tsx"></code>

### 排序选项
<code src="./demo/limit.tsx"></code>

### 分组选项

<code src="./demo/groups.tsx"></code>

### 禁用选项

当某个选项被禁用时，它无法被选中，并在键盘导航中被忽略。注意用户仍然可以将禁用选项作为值输入。若希望禁止某些值，请使用受控组件并在 `onChange` 函数中过滤掉它们。

<code src="./demo/disabledOptions.tsx"></code>

### 在 Popover 内使用

`TagsInput` 可以直接放进 Popover 内容里使用。注意其下拉层始终渲染在 portal 中（暂不支持关闭 portal）：

<code src="./demo/withinPopover.tsx"></code>

### 输入分区

<code src="./demo/sections.tsx"></code>

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 只读

设置 `readOnly` 使输入框只读。设置 `readOnly` 后，`TagsInput` 不会显示建议，也不会调用 `onChange` 函数。

<code src="./demo/readOnly.tsx"></code>

### 禁用

设置 `disabled` 禁用输入框。设置 `disabled` 后，用户无法与输入框交互，`TagsInput` 也不会显示建议。

<code src="./demo/disabled.tsx"></code>

### 错误状态

<code src="./demo/error.tsx"></code>

### 成功状态

要为清除按钮设置 `aria-label`，请使用 `clearButtonProps`。注意仅在设置 `clearable` 时才需要。

```tsx
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
      data={[]}
      clearable
      clearButtonProps={{
        'aria-label': '清除输入',
      }}
    />
  );
}
```

<code src="./demo/success.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

<ComboboxData component="TagsInput"></ComboboxData>

<ComboboxFiltering component="TagsInput"></ComboboxFiltering>

<ComboboxLargeData component="TagsInput"></ComboboxLargeData>

<ComboboxProps component="TagsInput"></ComboboxProps>

<InputSections component="TagsInput"></InputSections>

<InputFeatures component="TagsInput" element="input"></InputFeatures>

<StylesApiSelectors component="TagsInput"></StylesApiSelectors>

<GetElementRef component="TagsInput" refType="input"></GetElementRef>

<InputAccessibility component="TagsInput"></InputAccessibility>



## API {#api}

### TagsInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前标签数组（受控） | `string[]` | `[]` |
| defaultValue | 默认标签 | `string[]` | `[]` |
| onChange | 标签变化回调 | `(value: string[]) => void` | — |
| placeholder | 占位提示 | `string` | — |
| data | 自动补全候选项 | `string[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| maxTags | 最大标签数 | `number` | — |
| splitChars | 分隔字符 | `string[]` | `[',', 'Enter']` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
