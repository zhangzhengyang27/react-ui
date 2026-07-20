---
category: Components
title: Input
subtitle: 输入框
description: react-ui Input 输入框组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要标准的单行文本输入框，支持前缀/后缀、图标、不同尺寸时使用。

## 代码演示 {#examples}

### 免责声明

**!重要提示：** 在大多数情况下，不应在应用中直接使用 `Input`。
`Input` 是其他输入框的基础，并非为直接使用而设计。
请使用 `Input` 来创建自定义输入框。其他情况下，建议使用 [TextInput](/components/text-input/)
或其他组件。

```tsx
import { Input, TextInput } from '@react-ui/ui';

// 错误用法，input 不具备可访问性
function Incorrect() {
  return (
    <Input.Wrapper label="输入标签">
      <Input />
    </Input.Wrapper>
  );
}

// 任何想使用 Input 的地方都应改用 TextInput，
// 它默认具备可访问性，并包含 Input.Wrapper
function Correct() {
  return (
    <TextInput label="输入标签" description="输入描述" />
  );
}
```

### 用法

`Input` 组件用作某些其他输入框的基础（如 [NativeSelect](/components/native-select/)、[TextInput](/components/text-input/)、[Textarea](/components/textarea/) 等）。
`Input` 的目的是为其他输入框提供共享的样式和功能。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框右侧。
可使用 `loadingPosition` 属性将其位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

<code src="./demo/sections.tsx"></code>

### 更改输入元素

Input 是一个[多态组件](/docs/guides/polymorphic)，默认根元素是 `input`，
但可以更改为任何其他元素或组件。

使用 `Input` 作为 `button` 和 `select` 的示例：

<code src="./demo/component.tsx"></code>

### Input.Wrapper 组件

`Input.Wrapper` 组件在所有其他输入框（[TextInput](/components/text-input/)、[NativeSelect](/components/native-select/)、[Textarea](/components/textarea/) 等）
内部使用。*无需*用它包裹输入框，因为它已经包含在所有输入框中*。
仅在创建自定义输入框时使用 `Input.Wrapper`。

<code src="./demo/wrapper.tsx"></code>

### inputWrapperOrder

`inputWrapperOrder` 允许配置 `Input.Wrapper` 各部分的顺序。
它接受一个包含四个元素的数组：`label`、`input`、`error` 和 `description`。
注意，不需要包含所有元素——只使用需要的部分即可。
未包含的部分不会被渲染。

<code src="./demo/inputWrapperOrder.tsx"></code>

### inputContainer

使用 `inputContainer` 属性，可增强底层使用 `Input.Wrapper` 的输入框。
例如，当输入框获得焦点时，可以为 [TextInput](/components/text-input/) 添加 [Tooltip](/components/tooltip/)：

<code src="./demo/inputContainer.tsx"></code>

### required 和 withAsterisk 属性

所有基于 `Input.Wrapper` 的组件都支持 `required` 和 `withAsterisk` 属性。
当设置为 true 时，这两个属性都会在标签末尾添加红色星号。
唯一的区别是输入元素是否会带有 `required` 属性。以 [TextInput](/components/text-input/) 组件为例：

```tsx
import { TextInput } from '@react-ui/ui';

// 会显示必填星号，并向输入元素添加 `required` 属性
function RequiredDemo() {
  return <TextInput label="测试标签" required />;
}

// 只显示星号，不会向输入元素添加 `required` 属性
function AsteriskDemo() {
  return <TextInput label="测试标签" withAsterisk />;
}
```

### error 属性

所有底层使用 `Input.Wrapper` 的输入框都支持 `error` 属性。
当设置为 `true` 时，会为输入框添加红色边框。也可传入 React 节点以在输入框下方显示错误信息。若只想显示错误信息而不显示红色边框，请将 `error` 属性
设置为 React 节点并设置 `withErrorStyles={false}`：

<code src="./demo/error.tsx"></code>

### success 属性

所有底层使用 `Input.Wrapper` 的输入框都支持 `success` 属性。
当设置为 `true` 时，会为输入框添加绿色边框。也可传入 React 节点以在输入框下方显示成功信息。如果同时设置了 `error` 和 `success` 属性，`error` 优先：

<code src="./demo/success.tsx"></code>

### Input.Label、Input.Description 和 Input.Error 组件

`Input.Label`、`Input.Error` 和 `Input.Description` 组件可用于创建自定义
表单布局，当默认的 `Input.Wrapper` 布局无法满足需求时使用。

<code src="./demo/compound.tsx"></code>

### Input.Placeholder 组件

`Input.Placeholder` 组件可用于为基于 `button` 元素的 `Input` 和 `InputBase` 组件
添加占位符，或用于原生不支持 placeholder 属性的组件：

<code src="./demo/placeholder.tsx"></code>

### Input.ClearButton 组件

使用 `Input.ClearButton` 组件为基于 `Input` 组件的自定义输入框
添加清除按钮。清除按钮的 `size` 会自动
继承自输入框：

<code src="./demo/clearButton.tsx"></code>

### 主题上的默认属性

可在 [theme](/docs/theming/theme-object/) 上为 `Input` 和 `Input.Wrapper` 组件添加[默认属性](/docs/theming/default-props/)。
这些默认属性会被所有底层使用 `Input` 和 `Input.Wrapper` 的输入框继承（[TextInput](/components/text-input/)、[NativeSelect](/components/native-select/)、[Textarea](/components/textarea/) 等）：

<code src="./demo/defaultProps.tsx"></code>

### 所有输入框共享默认属性

`Input` 和 `Input.Wrapper` 上的默认属性会级联到每个基于它们构建的组件
（[TextInput](/components/text-input/)、[Textarea](/components/textarea/)、[NumberInput](/components/number-input/)、
[Select](/components/select/)、[DateInput](/docs/dates/date-input/) 等）。这是同时将所有输入框的 `size`、`radius`、`variant`、`withAsterisk` 或其他共享属性设置为相同值的最简单方式。
每个组件的默认属性始终优先于共享的默认属性，因此仍可以在需要时覆盖单个组件：

<code src="./demo/sharedDefaultProps.tsx"></code>

### 主题上的样式

与默认属性一样，可在 [theme](/docs/theming/theme-object/) 上使用 `Input` 和 `Input.Wrapper` 的 [Styles API](/docs/styles/styles-api/)
为所有输入框添加样式：

<code src="./demo/sharedStyles.tsx"></code>

### 更改焦点样式

使用 `&:focus-within` 选择器来更改输入框的焦点样式。可通过 `classNames` 属性将其应用于单个组件，或通过 [Styles API](/docs/styles/styles-api/)
应用于 [theme](/docs/theming/theme-object/) 上的所有输入框。

<code src="./demo/focusStyles.tsx"></code>

### InputBase 组件

`InputBase` 组件组合了 `Input` 和 `Input.Wrapper` 组件，并支持 `component` 属性：

<code src="./demo/inputBase.tsx"></code>

### 样式 API

`Input` 和 `Input.Wrapper` 组件支持 [Styles API](/docs/styles/styles-api) ——
可使用 `classNames` 和 `styles` 属性自定义任何内部元素的样式。

`Input` 的 Styles API 选择器：


`Input.Wrapper` 的 Styles API 选择器：

<code src="./demo/stylesApi.tsx"></code>

<code src="./demo/wrapperStylesApi.tsx"></code>

### 可访问性

若在没有关联 label 元素的情况下使用 `Input` 组件，请设置 `aria-label`：


当将 `Input` 与 `Input.Wrapper` 一起使用时，需要在两个组件上都设置 `id`
以将标签和其他元素与输入框关联：


可使用 [use-id](/docs/hooks/use-id) 生成唯一 id：

```tsx
import { Input } from '@react-ui/ui';

// ok – 输入框由 aria-label 标记
function WithAriaLabel() {
  return <Input aria-label="你的邮箱" />;
}

// ok – 输入框由 label 元素标记
function WithLabel() {
  return (
    <>
      <label htmlFor="my-email">你的邮箱</label>
      <Input id="my-email" />
    </>
  );
}
```

```tsx
import { Input } from '@react-ui/ui';

function Demo() {
  return (
    <Input.Wrapper label="你的邮箱" id="your-email">
      <Input id="your-email" />
    </Input.Wrapper>
  );
}
```

```tsx
import { Input } from '@react-ui/ui';
import { useId } from '@react-ui/hooks';

function Demo() {
  const id = useId();
  return (
    <Input.Wrapper label="你的邮箱" id={id}>
      <Input id={id} />
    </Input.Wrapper>
  );
}
```

<InputSections component="Input"></InputSections>

<GetElementRef component="Input" refType="input"></GetElementRef>



## API {#api}

### InputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `string` | — |
| defaultValue | 默认值（非受控） | `string` | — |
| onChange | 值变化回调 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| leftSection | 左侧插槽（图标/按钮） | `ReactNode` | — |
| rightSection | 右侧插槽（图标/按钮） | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'filled' \| 'unstyled'` | `'default'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
