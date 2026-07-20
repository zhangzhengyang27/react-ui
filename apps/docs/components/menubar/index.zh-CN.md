---
category: Components
title: Menubar
subtitle: 菜单栏
description: react-ui Menubar 菜单栏组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在应用顶部展示一组水平排列的菜单（类似桌面应用菜单栏）时使用。

## 代码演示 {#examples}

### 用法

`Menubar` 是桌面应用风格的菜单栏：一排顶级菜单触发器（File、Edit、View…），每个触发器都会打开一个下拉菜单。方向键可以在顶级菜单之间移动，一旦某个菜单打开，移动到同级菜单会立即打开它。`Menubar` 遵循 [WAI-ARIA menubar 模式](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)。

`Menubar` 基于 [Menu](/components/menu) 构建——每个 `Menubar.Menu` 都是一个独立的 `Menu` 实例，下拉内容由常用的 `Menu.Item`、`Menu.Divider`、`Menu.Label`、`Menu.Sub`、`Menu.CheckboxItem` 和 `Menu.RadioItem` 组件组合而成。

<code src="./demo/usage.tsx"></code>

### 组合

`Menubar` 由以下组件组成：

- `Menubar` – 根元素，管理所有菜单的打开/活动状态
- `Menubar.Menu` – 包裹单个菜单，内部渲染一个 `Menu` 实例
- `Menubar.Target` – 顶级触发按钮（`role="menuitem"`）
- `Menubar.Dropdown` – 下拉容器，接受的子元素与 `Menu.Dropdown` 相同

```tsx
import { Menu, Menubar } from '@react-ui/ui';

function Demo() {
  return (
    <Menubar>
      <Menubar.Menu>
        <Menubar.Target>文件</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>新建文件</Menu.Item>
          <Menu.Item>Open…</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Target>编辑</Menubar.Target>
        <Menubar.Dropdown>
          <Menu.Item>撤销</Menu.Item>
          <Menu.Item>重做</Menu.Item>
        </Menubar.Dropdown>
      </Menubar.Menu>
    </Menubar>
  );
}
```

### 触发与循环

`trigger` 控制当前没有任何菜单打开时如何打开菜单：

- `click`（默认）—— 点击目标时打开菜单。一旦任意菜单打开，悬停到同级目标会立即切换。这与原生桌面应用菜单栏行为一致。
- `hover` – 只要悬停到目标就会打开菜单，即使所有菜单都关闭。

使用 `trigger="hover"` 时，悬停目标会立即打开菜单，指针离开菜单栏时关闭：


`loop`（默认 `true`）控制使用方向键导航时，是否从最后一个菜单绕回到第一个菜单，反之亦然。

<code src="./demo/hover.tsx"></code>

### 复选框与单选项

`Menubar.Dropdown` 支持与 `Menu` 相同的选择项：`Menu.CheckboxItem` 用于切换选项，`Menu.RadioGroup` 配合 `Menu.RadioItem` 用于单选。默认情况下，点击复选框或单选项不会关闭菜单。

<code src="./demo/selectable.tsx"></code>

### 受控模式

设置 `openIndex` 和 `onOpenChange` 来控制哪个菜单处于打开状态。`openIndex` 是打开的 `Menubar.Menu` 的零基索引（按 DOM 顺序），当所有菜单都关闭时为 `null`：


对于非受控用法并希望初始有一个菜单打开，请改用 `defaultOpenIndex` 属性。

<code src="./demo/controlled.tsx"></code>

### 位置

默认情况下，下拉菜单相对于目标定位在 `bottom-start`。更改 `position` 属性可为菜单栏中的所有菜单使用不同的 [Floating UI 位置](/components/popover/#position-and-placement)：


单个菜单接受与 [Menu](/components/menu) 相同的属性——将它们传给 `Menubar.Menu` 以覆盖单个菜单的设置，例如 `position`、`withinPortal`、`closeOnItemClick`、`shadow`、`width` 或 `transitionProps`。

```tsx
import { Menubar } from '@react-ui/ui';

function Demo() {
  return (
    <Menubar position="bottom-end">
      {/* ...menus */}
    </Menubar>
  );
}
```

### 键盘交互

`Menubar` 实现了 WAI-ARIA menubar 模式定义的键盘交互。设置 RTL 方向时，`ArrowLeft` 和 `ArrowRight` 会互换。

<KeyboardEventsTable data={[ { key: 'ArrowRight', description: '移到下一个顶级菜单，若有菜单打开则切换打开的菜单' }, { key: 'ArrowLeft', description: '移到上一个顶级菜单，若有菜单打开则切换打开的菜单' }, { key: 'ArrowDown / Enter / Space', description: '打开获得焦点的菜单并将焦点移到第一项' }, { key: 'ArrowUp', description: '打开获得焦点的菜单并将焦点移到最后一项' }, { key: 'Escape', description: '关闭打开的菜单并将焦点返回到其目标' }, { key: 'Home / End', description: '移到第一个/最后一个顶级菜单' }, { key: 'Character keys', description: '将焦点移到下一个以输入字符开头的顶级菜单' }, { key: 'Tab', description: '将焦点移入或移出菜单栏（单个 tab 停靠点）' }, ]}></KeyboardEventsTable>

<code src="./demo/stylesApi.tsx"></code>

<StylesApiSelectors component="Menubar"></StylesApiSelectors>



## API {#api}

### MenubarProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | Menubar.Menu 列表 | `ReactNode` | — |
| defaultActive | 默认激活的菜单 | `string` | — |
| active | 当前激活的菜单（受控） | `string` | — |
| onMenuTrigger | 菜单触发回调 | `(id: string) => void` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
