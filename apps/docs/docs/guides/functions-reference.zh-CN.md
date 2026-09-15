---
category: Guides
title: FunctionsReference
subtitle: 函数参考
description: react-ui FunctionsReference 文档。
---


## clamp

`clamp` 函数从 `@xiaoye-react/hooks` 导出。
它将一个数字限制在包含的下界和上界之间。

```tsx
import { clamp } from '@xiaoye-react/hooks';

// 同时有 min 和 max 边界
clamp(10, 0, 5); // 5
clamp(100, 0, 5); // 5
clamp(-100, 0, 5); // 0

// 只有 min 边界
clamp(10, 0, undefined); // 10
clamp(-100, 0, undefined); // 0

// 只有 max 边界
clamp(0, undefined, 5); // 0
clamp(10, undefined, 5); // 5
```

## lowerFirst

`lowerFirst` 函数从 `@xiaoye-react/hooks` 导出。
它将字符串的第一个字符转换为小写。

```tsx
import { lowerFirst } from '@xiaoye-react/hooks';

lowerFirst('ReactUI'); // reactui
lowerFirst('ui'); // ui
```

## upperFirst

`upperFirst` 函数从 `@xiaoye-react/hooks` 导出。
它将字符串的第一个字符转换为大写。

```tsx
import { upperFirst } from '@xiaoye-react/hooks';

upperFirst('ReactUI'); // ReactUI
upperFirst('ui'); // UI
```

## randomId

`randomId` 函数从 `@xiaoye-react/hooks` 导出。
它生成一个带 `ui-` 前缀的随机 id。

```tsx
import { randomId } from '@xiaoye-react/hooks';

randomId(); // ui-d7h137oav
randomId(); // ui-1q2j3j4j5
```

## range

`range` 函数从 `@xiaoye-react/hooks` 导出。
它生成一个从 `start` 到 `end`（含）的数字数组。

```tsx
import { range } from '@xiaoye-react/hooks';

range(0, 5); // [0, 1, 2, 3, 4, 5]
range(5, 0); // [5, 4, 3, 2, 1, 0]
```

## shallowEqual

`shallowEqual` 函数从 `@xiaoye-react/hooks` 导出。
它对两个对象执行浅层相等检查。

```tsx
import { shallowEqual } from '@xiaoye-react/hooks';

shallowEqual({ a: 1 }, { a: 1 }); // true
shallowEqual({ a: 1 }, { a: 2 }); // false
```

## keys

`keys` 函数从 `@xiaoye-react/ui` 导出。
它是 `Object.keys` 的类型安全包装——返回类型为 `(keyof T)[]` 的键数组，而不是 `string[]`。

```tsx
import { keys } from '@xiaoye-react/ui';

const data = { name: 'ReactUI', age: 4 };
const result = keys(data); // ('name' | 'age')[]
```

## deepMerge

`deepMerge` 函数从 `@xiaoye-react/ui` 导出。
它递归地将源对象的属性合并到目标对象中。数组不会被合并——会被源值完全替换。

```tsx
import { deepMerge } from '@xiaoye-react/ui';

deepMerge({ a: 1, b: { c: 2 } }, { b: { d: 3 } });
// { a: 1, b: { c: 2, d: 3 } }

deepMerge({ a: 1 }, { a: 2, b: 3 });
// { a: 2, b: 3 }
```

## filterProps

`filterProps` 函数从 `@xiaoye-react/ui` 导出。
它从给定对象中移除所有 `undefined` 属性。

```tsx
import { filterProps } from '@xiaoye-react/ui';

filterProps({ a: 1, b: undefined, c: 'hello' });
// { a: 1, c: 'hello' }
```

## isElement

`isElement` 函数从 `@xiaoye-react/ui` 导出。
它是一个类型守卫，检查一个值是否为 React 元素。对于数组、`null` 和 React Fragment 返回 `false`。

```tsx
import { isElement } from '@xiaoye-react/ui';

isElement(<div />); // true
isElement('string'); // false
isElement(null); // false
isElement(<></>); // false
```

## isNumberLike

`isNumberLike` 函数从 `@xiaoye-react/ui` 导出。
它检查一个值是否为数字，或表示 CSS 数值的字符串（包括 `calc()`、`var()` 和 CSS 单位）。

```tsx
import { isNumberLike } from '@xiaoye-react/ui';

isNumberLike(10); // true
isNumberLike('10px'); // true
isNumberLike('1.5rem'); // true
isNumberLike('calc(100% - 10px)'); // true
isNumberLike('var(--size)'); // true
isNumberLike('hello'); // false
```

## camelToKebabCase

`camelToKebabCase` 函数从 `@xiaoye-react/ui` 导出。
它将 camelCase 字符串转换为 kebab-case。

```tsx
import { camelToKebabCase } from '@xiaoye-react/ui';

camelToKebabCase('backgroundColor'); // 'background-color'
camelToKebabCase('fontSize'); // 'font-size'
camelToKebabCase('color'); // 'color'
```

## getDefaultZIndex

`getDefaultZIndex` 函数从 `@xiaoye-react/ui` 导出。
它返回给定层级（elevation level）的默认 z-index 值。

```tsx
import { getDefaultZIndex } from '@xiaoye-react/ui';

getDefaultZIndex('app'); // 100
getDefaultZIndex('modal'); // 200
getDefaultZIndex('popover'); // 300
getDefaultZIndex('overlay'); // 400
getDefaultZIndex('max'); // 9999
```

## closeOnEscape

`closeOnEscape` 函数从 `@xiaoye-react/ui` 导出。
它创建一个键盘事件处理程序，当按下 Escape 键时调用给定回调。

```tsx
import { closeOnEscape } from '@xiaoye-react/ui';

// 基本用法
<div onKeyDown={closeOnEscape(() => setOpened(false))} />;

// 带选项
<div
  onKeyDown={closeOnEscape(() => setOpened(false), {
    active: isOpened,
    onTrigger: () => console.log('closed'),
  })}
/>;
```

## noop

`noop` 函数从 `@xiaoye-react/ui` 导出。
它是一个无操作函数，什么都不做。可用作默认回调。

```tsx
import { noop } from '@xiaoye-react/ui';

const onClick = handler || noop;
```

## findClosestNumber

`findClosestNumber` 函数从 `@xiaoye-react/ui` 导出。
它找到给定数组中最接近所提供值的数字。如果数组为空，则返回该值本身。

```tsx
import { findClosestNumber } from '@xiaoye-react/ui';

findClosestNumber(3, [1, 5, 10]); // 1
findClosestNumber(7, [1, 5, 10]); // 5
findClosestNumber(9, [1, 5, 10]); // 10
findClosestNumber(5, []); // 5
```

## toDateString

`toDateString` 函数从 `@xiaoye-react/ui` 导出。
它将日期值转换为 `YYYY-MM-DD` 字符串。接受 `Date`、`string`、`number` 和 dayjs 对象。
如果输入为 `null` 或 `undefined`，则返回 `null` 或 `undefined`。

```tsx
import { toDateString } from '@xiaoye-react/ui';

toDateString(new Date(2025, 0, 15)); // '2025-01-15'
toDateString('2025-01-15 14:30:00'); // '2025-01-15'
toDateString(null); // null
toDateString(undefined); // undefined
```

## toDateTimeString

`toDateTimeString` 函数从 `@xiaoye-react/ui` 导出。
它将日期值转换为 `YYYY-MM-DD HH:mm:ss` 字符串。接受 `Date`、`string`、`number` 和 dayjs 对象。
如果输入为 `null` 或 `undefined`，则返回 `null` 或 `undefined`。

```tsx
import { toDateTimeString } from '@xiaoye-react/ui';

toDateTimeString(new Date(2025, 0, 15, 14, 30, 0)); // '2025-01-15 14:30:00'
toDateTimeString('2025-01-15'); // '2025-01-15 00:00:00'
toDateTimeString(null); // null
```

## assignTime

`assignTime` 函数从 `@xiaoye-react/ui` 导出。
它将 `HH:mm:ss` 格式的时间字符串分配给日期值，返回 `YYYY-MM-DD HH:mm:ss` 字符串。
如果日期值为 `null`，则使用当前日期。

```tsx
import { assignTime } from '@xiaoye-react/ui';

assignTime('2025-01-15', '14:30:00'); // '2025-01-15 14:30:00'
assignTime('2025-01-15 08:00:00', '20:15:30'); // '2025-01-15 20:15:30'
assignTime(null, '10:00:00'); // '[current date] 10:00:00'
```

## clampDate

`clampDate` 函数从 `@xiaoye-react/ui` 导出。
它将日期限制在可选的 min 和 max 边界之间，返回 `YYYY-MM-DD HH:mm:ss` 字符串。

```tsx
import { clampDate } from '@xiaoye-react/ui';

clampDate('2025-01-01', '2025-12-31', '2025-06-15');
// '2025-06-15 00:00:00' – 在范围内

clampDate('2025-01-01', '2025-12-31', '2024-06-15');
// '2025-01-01 00:00:00' – 限制到 min

clampDate('2025-01-01', '2025-12-31', '2026-06-15');
// '2025-12-31 00:00:00' – 限制到 max

clampDate(undefined, undefined, '2025-06-15');
// '2025-06-15 00:00:00' – 无边界
```
