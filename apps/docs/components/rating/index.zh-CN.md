---
category: Components
title: Rating
subtitle: 评分
description: react-ui Rating 评分组件。
group:
  title: 数据录入
  order: 4
---

## 何时使用 {#when-to-use}

需要让用户以星级形式对内容进行评分时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 受控模式

```tsx
import { useState } from 'react';
import { Rating } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(0);
  return <Rating value={value} onChange={setValue} />;
}
```

### 非受控模式

`Rating` 可以像原生 input 元素一样用于非受控表单。设置 `name` 属性以在表单提交时将评分值包含在 `FormData` 对象中。要在非受控表单中控制初始值，请使用 `defaultValue` 属性。

非受控 `Rating` 与 `FormData` 的示例用法：

```tsx
import { Rating } from '@xiaoye-react/ui';

function Demo() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        console.log('Rating value:', formData.get('rating'));
      }}
    >
      <Rating name="rating" defaultValue={0} />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 只读

<code src="./demo/readOnly.tsx"></code>

### 允许清除

设置 `clearable` 属性允许用户通过再次点击相同的评分值将评分重置为 0。当希望让用户能够撤销评分选择时，这很有用：

<code src="./demo/clearable.tsx"></code>

### 分数

<code src="./demo/fractions.tsx"></code>



## API {#api}

### RatingProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前评分（受控） | `number` | `0` |
| defaultValue | 默认评分 | `number` | `0` |
| onChange | 评分变化回调 | `(value: number) => void` | — |
| count | 星星总数 | `number` | `5` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| color | 主题色 | `UIColor` | `'yellow'` |
| readOnly | 是否只读 | `boolean` | `false` |
| clearable | 再次点击当前值时清除评分 | `boolean` | `false` |
| fractions | 评分粒度 | `number` | `1` |
| highlightSelectedOnly | 是否仅高亮当前选中星 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
