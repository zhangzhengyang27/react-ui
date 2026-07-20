---
category: Components
title: Checkbox
subtitle: 复选框
description: react-ui Checkbox 复选框，用于在一组选项中选择多个。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

- 在一组可选项中允许多选。
- 表单中的"同意条款"、"订阅"、"全选"等场景。

react-ui Checkbox 采用 Mantine 风格的 `label` / `description` / `error` / `indeterminate` 设计，API 完整且内置表单集成。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控状态

使用 `checked` 和 `onChange` 属性控制 `Checkbox` 状态：

```tsx
import { useState } from 'react';
import { Checkbox } from '@react-ui/ui';

function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      checked={checked}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
```

### 只读

设置 `readOnly` 属性以防止用户交互更改复选框值。
复选框仍会显示其当前值并反映对 `checked` 属性的程序化更新，但点击它（或按 <kbd>间距</kbd>）不会
切换其状态，也不会调用 `onChange` 处理程序：

```tsx
import { useState } from 'react';
import { Checkbox } from '@react-ui/ui';

function Demo() {
  const [checked, setChecked] = useState(true);
  return (
    <>
      <Checkbox checked={checked} readOnly label="只读复选框" />
      <button type="button" onClick={() => setChecked((c) => !c)}>
        从外部切换
      </button>
    </>
  );
}
```

### 与 @react-ui/ui 一起使用的 Checkbox

将 `Checkbox` 与 [@react-ui/ui](/docs/form/use-form) 一起使用的示例：

<code src="./demo/withUseForm.tsx"></code>

### 与非受控表单一起使用的 Checkbox

`Checkbox` 可以像原生 `input[type="checkbox"]` 一样用于非受控表单。
设置 `name` 属性以在表单提交时将复选框值包含在 `FormData` 对象中。
要控制非受控表单中的初始选中状态，请使用 `defaultChecked` 属性。

非受控 `Checkbox` 与 `FormData` 的用法示例：

```tsx
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox value:', !!formData.get('terms'));
      }}
    >
      <Checkbox label="接受条款和条件" name="terms" defaultChecked />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 状态

<code src="./demo/states.tsx"></code>

### 错误状态

使用 `error` 属性在复选框标签下方显示错误信息。
如需对复选框应用错误样式但不显示错误信息，请使用布尔值 `error` 属性。
如需显示错误信息但不应用错误样式，请设置 `withErrorStyles={false}`。

<code src="./demo/error.tsx"></code>

### 更改图标

<code src="./demo/icon.tsx"></code>

### 更改图标颜色

使用 `iconColor` 属性更改图标颜色。可引用 `theme.colors` 中的颜色或使用任何有效的 CSS 颜色：

<code src="./demo/iconColor.tsx"></code>

### 带链接的标签

<code src="./demo/anchor.tsx"></code>

### 带 Tooltip 的 Checkbox

可使用 `refProp` 更改 tooltip 附加到的目标元素：

- 如果未设置 `refProp`，tooltip 附加到复选框输入
- 如果设置 `refProp="rootRef"`，tooltip 附加到根元素（包含标签、输入和其他元素）

<code src="./demo/tooltip.tsx"></code>

### 指针光标

默认情况下，复选框输入和标签具有 `cursor: default`（与原生 `input[type="checkbox"]` 相同）。
要将光标更改为 pointer，请在 [theme](/docs/theming/theme-object/) 上设置 `cursorType`：

<code src="./demo/autoContrast.tsx"></code>

### 添加自定义尺寸

可使用 [data-size](/docs/styles/data-attributes/) 属性添加任意数量的自定义尺寸：

<code src="./demo/customSize.tsx"></code>

### Checkbox.Group

`Checkbox.Group` 管理多个复选框的状态，它接受 `value` 和 `onChange`
属性，用于控制组内复选框的状态。`value` 属性应为字符串数组，其中每个字符串是一个复选框的值。
`onChange` 属性应为接收新值作为字符串数组的函数。


`Checkbox.Group` 组件支持所有 [Input.Wrapper](/components/input/#inputwrapper-component)
属性。

```tsx
import { useState } from 'react';
import { Checkbox } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Checkbox.Group value={value} onChange={setValue}>
      <Checkbox value="react" label="React" />
      <Checkbox value="svelte" label="Svelte" />
    </Checkbox.Group>
  );
}
```

<code src="./demo/groupConfigurator.tsx"></code>

### Checkbox.Group 禁用

<code src="./demo/groupDisabled.tsx"></code>

### maxSelectedValues

使用 `maxSelectedValues` 属性限制 `Checkbox.Group` 中可选值的数量。
达到限制时，剩余的复选框将被禁用且无法选择。

<code src="./demo/maxSelectedValues.tsx"></code>

### 与 @react-ui/ui 一起使用的 Checkbox.Group

将 `Checkbox.Group` 与 [@react-ui/ui](/docs/form/use-form) 一起使用的示例：

<code src="./demo/groupWithUseForm.tsx"></code>

### 与非受控表单一起使用的 Checkbox.Group

`Checkbox.Group` 可以用于非受控表单，它渲染一个隐藏输入，
使用 `hiddenInputValuesSeparator` 属性将所有选中值连接成单个字符串。

用于非受控表单的属性：
- `name` – 传递给隐藏输入的 name 属性
- `hiddenInputValuesSeparator` – 用于将选中值连接成单个字符串的字符串，默认为 `','`
- `hiddenInputProps` – 传递给隐藏输入的附加属性

```tsx
export function UncontrolledForm() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Checkbox group value:', formData.get('frameworks'));
      }}
    >
      <Checkbox.Group label="框架" name="frameworks" hiddenInputValuesSeparator="|">
        <Checkbox label="React" value="react" />
        <Checkbox label="Angular" value="ng" />
      </Checkbox.Group>
      <button type="submit">提交</button>
    </form>
  );
}
```

### Checkbox.Indicator

`Checkbox.Indicator` 外观与 `Checkbox` 组件完全相同，但它没有
任何语义含义，只是复选框状态的视觉表示。可在需要显示复选框状态但不需要任何与指示器交互的地方使用它。
例如，它适用于基于按钮的卡片、树等。

注意，`Checkbox.Indicator` 无法获得焦点或使用键盘选择。它不具备
可访问性，不应作为 `Checkbox` 组件的替代品。

<code src="./demo/indicator.tsx"></code>

### Checkbox.Card 组件

`Checkbox.Card` 组件可用作 `Checkbox` 的替代品，用于构建自定义
卡片/按钮/其他作为复选框工作的元素。组件的根元素具有 `role="checkbox"` 属性，默认具备可访问性并支持与 `input[type="checkbox"]` 相同的键盘交互。


可像使用 `Checkbox` 组件一样将 `Checkbox.Card` 与 `Checkbox.Group` 一起使用：



上面的示例展示了如何获取复选框输入元素的 ref。
要获取根元素的 ref，请使用 `rootRef` 属性：

```tsx
import { useRef } from 'react';
import { Checkbox } from '@react-ui/ui';

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  return <Checkbox rootRef={ref} />;
}
```

<code src="./demo/card.tsx"></code>

<code src="./demo/cardGroup.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 示例：使用 Styles API 自定义

<code src="./demo/customize.tsx"></code>

### wrapperProps

大多数 `Checkbox` 属性都会传递给 `input` 元素。
如需将属性传递给根元素，请使用 `wrapperProps` 属性。

```tsx
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return (
    <Checkbox
      label="我的复选框"
      wrapperProps={{ 'data-root-element': true }}
    />
  );
}
```

### id 属性

默认情况下，`Checkbox` 为输入元素生成随机 `id` 属性
以将其与标签关联。可使用 `id` 属性提供自己的 `id` 属性。
它将用于输入元素的 `id` 属性和标签元素的 `htmlFor` 属性。

```tsx
import { Checkbox } from '@react-ui/ui';

function Demo() {
  return <Checkbox id="my-checkbox" label="我的复选框" />;
}
```

### 可访问性

Checkbox 组件基于原生 `input[type="checkbox"]` 元素，因此默认具备可访问性。

设置 `aria-label` 或 `label` 属性以使复选框对屏幕阅读器可访问：

```tsx
import { Checkbox } from '@react-ui/ui';

// 不好，输入框没有标签
function Bad() {
  return <Checkbox />;
}

// 好，输入框由 aria-label 标记
function GoodAriaLabel() {
  return <Checkbox aria-label="我的复选框" />;
}

// 好，输入框由 label 元素标记
function GoodLabel() {
  return <Checkbox label="我的复选框" />;
}
```

<AutoContrast component="Checkbox"></AutoContrast>

<WrapperProps component="Checkbox"></WrapperProps>

<GetElementRef component="Checkbox" refType="input"></GetElementRef>

<StylesApiSelectors component="Checkbox"></StylesApiSelectors>



## API {#api}

### CheckboxProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签内容 | `ReactNode` | — |
| description | 描述（在标签下方） | `ReactNode` | — |
| error | 错误信息（在标签下方） | `ReactNode` | — |
| checked | 是否选中（受控） | `boolean` | — |
| defaultChecked | 默认是否选中（非受控） | `boolean` | `false` |
| indeterminate | 不确定状态（部分选中） | `boolean` | `false` |
| disabled | 禁用 | `boolean` | `false` |
| required | 必填（在标签后加 `*`） | `boolean` | `false` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| radius | 圆角 | `UIRadius` | `theme.defaultRadius` |
| color | 选中时的背景色 | `UIColor` | `theme.primaryColor` |
| iconColor | 勾选图标颜色 | `string` | `'white'` |
| icon | 自定义勾选图标 | `ReactNode \| ((props: { indeterminate: boolean; checked: boolean }) => ReactNode)` | 内置 |
| value | 在 Checkbox.Group 内使用时的值 | `string` | — |
| onChange | 选中状态变化时调用 | `(event: ChangeEvent<HTMLInputElement>) => void` | — |
| wrapperProps | 根标签元素的属性 | `Record<string, any>` | — |

支持所有原生 `<input type="checkbox">` 属性。

### Checkbox.Group

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值数组（受控） | `string[]` | — |
| defaultValue | 默认选中的值数组（非受控） | `string[]` | `[]` |
| onChange | 值变化回调 | `(value: string[]) => void` | — |
| label | 组标签 | `ReactNode` | — |
| description | 组描述 | `ReactNode` | — |
| error | 组错误信息 | `ReactNode` | — |
| name | 提交表单时的 name | `string` | — |
| withSpacing | 子项之间是否自带间距 | `boolean` | `false` |

### Checkbox.Card

卡片样式的 Checkbox，常用于选项卡片场景。

```tsx
<Checkbox.Card value="a" label="选项 A" description="描述 A" />
```

### Checkbox.Indicator

不带标签的纯指示器，可用于自定义布局。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
