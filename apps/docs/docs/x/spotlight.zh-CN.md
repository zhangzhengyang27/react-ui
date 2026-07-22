---
category: X
title: Spotlight
subtitle: 聚光灯
description: react-ui Spotlight 文档。
---


## 安装

<InstallScript packages="@xiaoye-react/ui"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/styles.css';
// ‼️ spotlight 样式必须在核心包样式之后导入
import '@xiaoye-react/ui/styles.css';
```

## 用法

`Spotlight` 组件可用作应用内的搜索或命令中心。react-ui.dev 网站就将其用作搜索；你可以通过 `Ctrl + K` 快捷键触发它。`Spotlight` 基于 [Modal](/components/modal) 组件，支持其大部分属性。

<code src="./spotlight/demo/usage.tsx"></code>

## 操作

`@xiaoye-react/ui` 包导出一个包含控制 spotlight 操作的对象：


这些操作可以传递给事件监听器，或在应用中的任何地方使用（不限于 React 组件）：


如果你更喜欢这种语法，也可以直接从 `@xiaoye-react/ui` 包导入这些操作：

```tsx
import { spotlight } from '@xiaoye-react/ui';

spotlight.open(); // -> 打开 spotlight
spotlight.close(); // -> 关闭 spotlight
spotlight.toggle(); // -> 切换 spotlight 打开状态
```

```tsx
import { Button } from '@xiaoye-react/ui';
import { spotlight } from '@xiaoye-react/ui';

function Demo() {
  return <Button onClick={spotlight.open}>打开 spotlight</Button>;
}
```

```tsx
import {
  closeSpotlight,
  openSpotlight,
  toggleSpotlight,
} from '@xiaoye-react/ui';

openSpotlight(); // 与 spotlight.open() 相同
closeSpotlight(); // 与 spotlight.close() 相同
toggleSpotlight(); // 与 spotlight.toggle() 相同
```

## Spotlight 状态仓库

上文介绍的 `spotlight` 对象使用默认状态仓库；如果你的应用中只有一个 spotlight，这样工作得很好。如果你需要多个 spotlight，需要为每个 spotlight 创建自己的状态仓库：

```tsx
import { Button } from '@xiaoye-react/ui';
import { createSpotlight, Spotlight } from '@xiaoye-react/ui';

// 你可以在应用中的任何地方导入 `firstSpotlight` 和 `secondSpotlight`
// 并使用 `open`、`close` 和 `toggle` 操作
// 像默认的 `spotlight` 对象一样控制 spotlight
export const [firstStore, firstSpotlight] = createSpotlight();
export const [secondStore, secondSpotlight] = createSpotlight();

function Demo() {
  return (
    <>
      <Button onClick={firstSpotlight.open}>
        打开第一个 spotlight
      </Button>
      <Button onClick={secondSpotlight.open}>
        打开第二个 spotlight
      </Button>

      <Spotlight store={firstStore} actions={[]} />
      <Spotlight store={secondStore} actions={[]} />
    </>
  );
}
```

## 键盘快捷键

`Spotlight` 使用 [use-hotkeys](/docs/hooks/use-hotkeys) hook 处理键盘快捷键。默认情况下，使用 `Ctrl + K` 和 `Cmd + K` 快捷键打开 spotlight；你可以通过 `shortcut` 属性更改：

```tsx
import { Spotlight } from '@xiaoye-react/ui';

function SingleShortcut() {
  return <Spotlight shortcut="mod + J" actions={[]} />;
}

// 与 react-ui.dev 相同
function MultipleShortcuts() {
  return (
    <Spotlight shortcut={['mod + K', 'mod + P', '/']} actions={[]} />
  );
}

// 禁用快捷键
function NoShortcut() {
  return <Spotlight shortcut={null} actions={[]} />;
}
```

## limit 属性

使用 `limit` 属性限制同时显示的最大操作数量。通常 5–7 个操作比较合适。当操作数量很多时，`limit` 属性对性能至关重要；它可以防止 spotlight 一次性渲染所有操作。

下面的示例渲染了 3000 个操作，但一次只显示 7 个：

<code src="./spotlight/demo/limit.tsx"></code>

## 自定义过滤函数

默认情况下，`Spotlight` 使用一个简单的过滤器，根据 `label`、`description` 和 `keywords` 匹配操作。你可以通过提供自定义的 `filter` 函数来自定义过滤逻辑。`filter` 函数接收搜索查询和操作数组，并返回过滤后的操作。

自定义 `filter` 函数签名：

```tsx
type SpotlightFilterFunction = (
  query: string,
  actions: SpotlightActions[]
) => SpotlightActions[];
```

## 使用 fuse.js 进行模糊搜索

你可以使用 [fuse.js](https://fusejs.io/) 库实现模糊搜索。如果你想在输入有拼写错误或部分匹配时也能找到操作，这会非常有用：

<code src="./spotlight/demo/fuzzySearch.tsx"></code>

## 可滚动的操作列表

默认情况下，`Spotlight` 操作列表不可滚动。如果你需要同时显示大量操作，请设置 `scrollable` 和 `maxHeight` 属性。注意，这两种方式都有一些注意事项：

- 未设置 `scrollable` 属性时，操作列表高度不受限制，spotlight 主体会增长以容纳所有操作。这可能导致 spotlight 主体过长而超出视口。为防止这种情况，请使用 `limit` 属性定义同时显示的最大操作数量。通常 5–7 个操作比较合适。
- 设置 `scrollable` 属性后，操作列表高度始终等于 `maxHeight` 属性的值（即使操作数量不足以填满空间也不会收缩）。当操作数量超过列表可容纳数量时，列表会变得可滚动。滚动逻辑由 [ScrollArea](/components/scroll-area) 组件处理。

换句话说，如果你希望操作列表随内容收缩，请不要设置 `scrollable` 属性，而是使用 `limit` 属性。如果你希望操作列表始终具有固定高度，请设置 `scrollable` 和 `maxHeight` 属性。

<code src="./spotlight/demo/scrollable.tsx"></code>

## 操作分组

`Spotlight` 支持操作分组；你可以用它们按类别对操作进行分组：

<code src="./spotlight/demo/groups.tsx"></code>

## 复合组件

如果你需要更精细地控制 spotlight 的渲染和逻辑，请使用复合组件。可用组件：

- `Spotlight.Root` – 根组件，应作为所有其他组件的包装器，接受所有用于自定义逻辑的 props
- `Spotlight.Search` – 搜索输入框
- `Spotlight.ActionsList` – 操作列表，必须包裹所有操作和操作组
- `Spotlight.Action` – 操作按钮
- `Spotlight.ActionsGroup` - 操作组
- `Spotlight.Empty` – 空状态（未找到任何内容）


例如，使用复合组件模式可以自定义操作内容：

<code src="./spotlight/demo/compound.tsx"></code>

<code src="./spotlight/demo/customAction.tsx"></code>

## 固定元素偏移

`Spotlight` 组件使用 [react-remove-scroll](https://github.com/theKashey/react-remove-scroll) 包锁定滚动。要正确调整这些 `elements` 的大小，请为它们添加 `className`（[文档](https://github.com/theKashey/react-remove-scroll#positionfixed-elements)）：

```tsx
import { RemoveScroll } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <div className={RemoveScroll.classNames.fullWidth}>
        width: 100%
      </div>
      <div className={RemoveScroll.classNames.zeroRight}>
        right: 0
      </div>
    </>
  );
}
```
