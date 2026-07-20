---
category: Components
title: Menu
subtitle: 菜单
description: react-ui Menu 菜单组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在一个下拉菜单中组织一组操作命令、导航项或子菜单时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/usage.tsx"></code>

### 搜索

`Menu.Search` 在下拉菜单内渲染一个搜索输入框。焦点保持在输入框内，`ArrowUp`/`ArrowDown` 移动高亮项，`Enter` 触发高亮项。过滤由用户控制——传入 `value` 和 `onChange` 并根据查询过滤 `Menu.Item` 子项。默认情况下，搜索值会在菜单关闭过渡完成后自动清除——如果希望在不同打开之间保留查询，请使用 `clearSearchOnClose={false}` 禁用：


同样的方法也适用于子菜单。如果要在嵌套项匹配时保持父菜单可见，请在过滤树时包含父菜单（如果其任何后代匹配查询）：

<code src="./demo/searchNested.tsx"></code>

<code src="./demo/search.tsx"></code>

### 复选框项

`Menu.CheckboxItem` 渲染一个带勾选指示器的菜单项。它类似于普通的 [Checkbox](/components/checkbox/)——使用 `checked`/`onChange` 管理状态，或使用 `defaultChecked` 作为非受控值。默认情况下，点击复选框项不会关闭菜单；可以在该项上设置 `closeMenuOnClick`（或在 `Menu` 上设置 `closeOnItemClick={false}`）来覆盖：

<code src="./demo/checkboxItem.tsx"></code>

### 复选框组

将 `Menu.CheckboxItem` 组件包裹在 `Menu.CheckboxGroup` 中，以使用单个 `value: string[]` / `onChange` 对管理多选状态（非受控使用 `defaultValue`）。每个项需要一个 `value`。点击项会切换其在组中的值：


`Menu.CheckboxItem` 仍可作为独立项使用（不带组），使用自身的 `checked` / `defaultChecked` / `onChange` 属性。同时存在时，项级别的 `checked` 和 `onChange` 会覆盖组级别。

<code src="./demo/checkboxGroup.tsx"></code>

### 单选项

`Menu.RadioItem` 表示 `Menu.RadioGroup` 中的单个选项。该组通过 `value`/`onChange`（非受控使用 `defaultValue`）管理选中值。当前选中的项会显示一个指示点。与复选框项一样，单选项默认点击不会关闭菜单：

<code src="./demo/radioItem.tsx"></code>

### 对齐带/不带指示器的项标签

使用 `Menu` 上的 `alignItemsLabels` 属性控制如何为指示器槽位预留空间。当混合使用 `Menu.Item` 与 `Menu.CheckboxItem` 或 `Menu.RadioItem`，并希望标签从同一水平位置开始时，这很有用：

- `alignItemsLabels="with-indicators"`（默认）—— 仅在 `Menu.CheckboxItem` 和 `Menu.RadioItem` 上预留指示器空间。普通 `Menu.Item` 不添加内边距。
- `alignItemsLabels="all"` —— 在每个 `Menu.Item` 上都预留指示器空间，因此普通项的标签与复选框和单选项对齐。
- `alignItemsLabels="none"` —— 仅在当前显示指示器的项上预留指示器空间。未选中的复选框和单选项不渲染槽位（切换时布局会变化）。

<code src="./demo/alignItemsLabels.tsx"></code>

### 自定义勾选图标

使用 `checkIcon` 属性替换 `Menu.CheckboxItem` 和 `Menu.RadioItem` 渲染的默认指示器。在 `Menu` 上设置 `checkIcon` 会应用于下拉菜单中所有复选框/单选项。在单个项上设置 `checkIcon` 会覆盖菜单级别：

<code src="./demo/checkIcon.tsx"></code>

### 右键菜单

使用 `Menu.ContextMenu` 在右键点击时于光标位置打开菜单下拉框。它替代了 `Menu.Target` 并包裹应响应 `contextmenu` 事件的元素——浏览器默认右键菜单被阻止，ReactUI 的 `Menu.Dropdown` 取而代之定位在光标处。再次右键点击会将下拉框重新定位到新坐标。设置 `disabled` 可恢复浏览器默认右键菜单：


### 触摸设备

在触摸设备上（尤其是 iOS Safari，它不会触发 `contextmenu` 事件），下拉菜单通过长按打开。使用 `longPressDelay` 属性控制元素需要按多久才会打开下拉菜单，默认 `500`ms：


为防止在触摸设备上出现原生文本选择呼出菜单，`Menu.ContextMenu` 会在包裹的元素上禁用文本选择（`user-select: none`）。

```tsx
import { Menu } from '@react-ui/ui';

function Demo() {
  return (
    <Menu>
      <Menu.ContextMenu longPressDelay={400}>
        <div>Long-press me</div>
      </Menu.ContextMenu>
      <Menu.Dropdown>
        <Menu.Item>复制</Menu.Item>
        <Menu.Item>粘贴</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
```

<code src="./demo/contextMenu.tsx"></code>

### 受控模式

下拉菜单的打开状态可以使用 `opened` 和 `onChange` 属性进行控制：

```tsx
import { useState } from 'react';
import { Menu } from '@react-ui/ui';

function Demo() {
  const [opened, setOpened] = useState(false);
  return (
    <Menu opened={opened} onChange={setOpened}>
      {/* Menu content */}
    </Menu>
  );
}
```

### 悬停显示菜单

设置 `trigger="hover"` 可在悬停菜单目标和下拉菜单时显示下拉菜单。`closeDelay` 和 `openDelay` 属性可用于控制打开和关闭的延迟（毫秒）。注意：

- 若设置 `closeDelay={0}`，菜单会在用户到达下拉菜单之前关闭，因此请设置 `offset={0}` 以消除目标元素和下拉菜单之间的间距。
- 使用 `trigger="hover"` 的菜单不具备可访问性——使用键盘导航的用户将无法使用它。若同时需要悬停和点击触发，请使用 `trigger="click-hover"`。


要使悬停显示的 `Menu` 在所有设备上都可访问，请改用 `trigger="click-hover"`。下拉菜单在桌面端悬停时显示，在移动设备上点击时显示。

<code src="./demo/hover.tsx"></code>

<code src="./demo/clickHover.tsx"></code>

### 禁用项

<code src="./demo/disabled.tsx"></code>

### 下拉菜单位置

<code src="./demo/positionConfigurator.tsx"></code>

### 过渡动画

Menu 下拉菜单可以使用 [Transition](/components/transition/) 组件中的任何预设过渡动画：

<code src="./demo/transitions.tsx"></code>

### 自定义组件作为 Menu.Item

默认情况下，`Menu.Item` 渲染为 button 元素。要更改它，请设置 `component` 属性：


注意，传给 `component` 属性的组件应允许将 props 展开到其根元素上：

```tsx
import { Menu } from '@react-ui/ui';

// ❌ 不能与 Menu.Item 一起使用
function IncorrectItem() {
  return <button type="button">我的自定义菜单项</button>;
}

// ✅ 可以与 Menu.Item 一起正常使用
const CorrectItem = ({ ref, ...props }) => (
  <button type="button" {...props} ref={ref}>
    My custom Menu item
  </button>
);

function Demo() {
  // ❌ 不能工作
  const incorrect = <Menu.Item component={IncorrectItem} />;

  // ✅ 能工作
  const correct = <Menu.Item component={CorrectItem} />;
}
```

<code src="./demo/component.tsx"></code>

### 自定义组件作为目标

<code src="./demo/customControl.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 可访问性

Menu 遵循 [WAI-ARIA 推荐](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/examples/menu-button-links/)：

- 下拉元素具有 `role="menu"` 和 `aria-labelledby="target-id"` 属性
- 目标元素具有 `aria-haspopup="menu"`、`aria-expanded`、`aria-controls="dropdown-id"` 属性
- 菜单项具有 `role="menuitem"` 属性

下拉菜单未打开时，`aria-controls` 属性将为 undefined。

### 支持的目标元素

非受控 Menu 使用 `trigger="click"`（默认）时，只有与 `button` 元素或渲染它的组件（[Button](/components/button/)、[ActionIcon](/components/action-icon/) 等）一起使用时才具备可访问性。其他元素不支持 `Space` 和 `Enter` 按键。

### 悬停菜单

使用 `trigger="hover"` 的 Menu 不具备可访问性——无法通过键盘访问。仅在不需要考虑可访问性的场景下使用。若同时需要悬停和点击触发，请使用 `trigger="click-hover"`。

### 导航

若使用 Menu 构建导航，可使用下面演示中的选项来遵循 [WAI-ARIA 导航推荐](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)。


### 键盘交互

<KeyboardEventsTable
  data={[
    {
      key: 'Escape',
      description: '关闭下拉菜单',
      condition: '焦点在下拉菜单内',
    },
    {
      key: 'Space/Enter',
      description: '打开/关闭下拉菜单',
      condition: '焦点在目标元素上',
    },
    {
      key: 'ArrowUp',
      description: '将焦点移到上一个菜单项',
      condition: '焦点在下拉菜单内',
    },
    {
      key: 'ArrowDown',
      description: '将焦点移到下一个菜单项',
      condition: '焦点在下拉菜单内',
    },
    {
      key: 'Home',
      description: '将焦点移到第一个菜单项',
      condition: '焦点在下拉菜单内',
    },
    {
      key: 'End',
      description: '将焦点移到最后一个菜单项',
      condition: '焦点在下拉菜单内',
    },
    {
      key: 'ArrowUp/ArrowDown',
      description: '在不离开输入框的情况下将高亮移到上一个/下一个菜单项',
      condition: '焦点在 Menu.Search 上',
    },
    {
      key: 'Enter',
      description: '触发高亮项',
      condition: '焦点在 Menu.Search 上',
    },
    {
      key: 'Printable character',
      description:
        '将焦点移到下一个标签以输入字符开头的项。再次按下同一字符会在匹配项之间循环。在 500ms 内输入多个字符会匹配标签以完整输入字符串开头的项。',
      condition: '焦点在下拉菜单内，且无 Menu.Search',
    },
  ]}
/>

若还需支持 `Tab` 和 `Shift + Tab`，请设置 `menuItemTabIndex={0}`。

<code src="./demo/navigation.tsx"></code>

<StylesApiSelectors component="Menu"></StylesApiSelectors>

<TargetComponent component="Menu"></TargetComponent>



## API {#api}

### MenuProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 触发元素 | `ReactNode` | — |
| width | 菜单宽度 | `number \| string` | `'auto'` |
| position | 弹出位置 | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` |
| shadow | 阴影 | `UIShadow` | `'md'` |
| withArrow | 是否显示箭头 | `boolean` | `false` |
| closeOnItemClick | 点击菜单项是否关闭 | `boolean` | `true` |
| withinPortal | 是否使用 Portal | `boolean` | `true` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
