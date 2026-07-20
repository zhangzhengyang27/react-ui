---
category: Components
title: PillsInput
subtitle: 胶囊输入
description: react-ui PillsInput 胶囊输入组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户以胶囊形式输入多个值（如邮箱、标签），支持删除和自动补全时使用。

## 代码演示 {#examples}

### 用法

`PillsInput` 是一个工具组件，可用于创建自定义标签输入框、多选框及其他类似组件。
它本身不包含任何逻辑，仅渲染传入的子元素。通常，`PillsInput` 与 [Pill](/components/pill) 组件一起使用。

<code src="./demo/usage.tsx"></code>

### 加载状态

设置 `loading` 属性以显示加载指示器。默认情况下，加载器显示在输入框右侧。
可使用 `loadingPosition` 属性将位置更改为 `'left'` 或 `'right'`。这对于 API 调用、搜索或验证等异步操作非常有用：

<code src="./demo/loading.tsx"></code>

### 输入属性

<code src="./demo/configurator.tsx"></code>

### 可访问性

如果 `PillsInput` 没有使用 label 属性，屏幕阅读器将无法正确朗读它：


在 `PillsInput.Field` 组件上设置 `aria-label` 以使输入框可访问。
这种情况下标签不会可见，但屏幕阅读器会朗读它：


如果设置了 `label` 属性，输入框将是可访问的，不需要再设置 `aria-label`：

```tsx
import { PillsInput } from '@react-ui/ui';

// 不可访问的输入框——屏幕阅读器无法正确朗读
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field />
    </PillsInput>
  );
}
```

```tsx
import { PillsInput } from '@react-ui/ui';

// 可访问的输入框——它具有 aria-label
function Demo() {
  return (
    <PillsInput>
      <PillsInput.Field aria-label="输入标签" />
    </PillsInput>
  );
}
```

```tsx
import { PillsInput } from '@react-ui/ui';

// 可访问的输入框——它具有关联的 label 元素
function Demo() {
  return (
    <PillsInput label="输入标签">
      <PillsInput.Field />
    </PillsInput>
  );
}
```

<InputFeatures component="PillsInput" element="div"></InputFeatures>



## API {#api}

### PillsInputProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前 Pills 数组（受控） | `Pill[]` | `[]` |
| onChange | Pills 变化回调 | `(value: Pill[]) => void` | — |
| placeholder | 占位提示 | `string` | — |
| disabled | 是否禁用 | `boolean` | `false` |
| error | 错误信息 | `ReactNode` | — |
| variant | 视觉变体 | `'default' \| 'filled' \| 'unstyled'` | `'default'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
