---
category: Components
title: Button
subtitle: 按钮
description: 用于触发即时操作的按钮组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

Button 用于标记一个或一组操作命令，响应用户点击行为并触发相应业务逻辑。

react-ui 的 Button 基于 `variant` + `color` 设计，不同变体适用于不同场景：

| 需求 | 写法 |
| --- | --- |
| 主按钮 | `<Button variant="filled">` |
| 默认按钮 | `<Button variant="default">` |
| 描边按钮 | `<Button variant="outline">` |
| 文本按钮 | `<Button variant="subtle">` |
| 链接按钮 | `<Button variant="transparent">` |
| 渐变按钮 | `<Button variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>` |

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 全宽

设置 `fullWidth` 属性后，Button 将占据父元素 100% 的宽度。

<code src="./demo/fullWidth.tsx"></code>

### 左右区域

`leftSection` 和 `rightSection` 属性用于在按钮左右两侧添加图标或其他元素。添加区域后，对应侧的内边距会自动减小。

在 [RTL](/docs/styles/rtl) 模式下，`leftSection` 与 `rightSection` 会自动互换位置。

<code src="./demo/sections.tsx"></code>

### 区域位置

`justify` 属性用于设置按钮内部元素的 `justify-content`，可调整左右区域的对齐方式。例如，设置 `justify="space-between"` 可将左右区域分散到按钮两端。

若仅需将单个区域对齐到某一侧，可将 `justify` 设为 `space-between`，并在对侧区域传入空的 `<span />`。

<code src="./demo/sectionsJustify.tsx"></code>

### 紧凑尺寸

Button 支持 `xs` 至 `xl` 以及 `compact-xs` 至 `compact-xl` 尺寸。`compact` 尺寸与 `xs` 至 `xl` 的字号相同，但内边距与高度更小。

<code src="./demo/compact.tsx"></code>

<code src="./demo/gradient.tsx"></code>

### 禁用状态

设置 `disabled` 属性可禁用 Button，禁用后按钮不再响应交互并展示禁用样式。若希望按钮视觉上禁用但仍可交互，请使用 `data-disabled` 属性。禁用样式对所有变体均一致。

<code src="./demo/disabled.tsx"></code>

### 链接按钮的禁用状态

`<a />` 元素不支持 `disabled` 属性。当 Button 渲染为链接且需要禁用时，应使用 `data-disabled` 属性，并在 `onClick` 事件中调用 `event.preventDefault()`。

<code src="./demo/disabledLink.tsx"></code>

### 自定义禁用样式

自定义禁用样式时，建议同时定义 `&:disabled` 与 `&[data-disabled]` 选择器：

- `&:disabled`：用于设置 `disabled` 属性时的样式，以及父组件（如 `<fieldset />`）禁用按钮时的样式。
- `&[data-disabled]`：用于按钮实际未被禁用但需要呈现禁用视觉的样式，例如与 [Tooltip](/components/tooltip) 配合使用的场景，或 Button 渲染为链接时。

<code src="./demo/disabledStyles.tsx"></code>

### 带 Tooltip 的禁用按钮

Button 禁用时不会触发 `onMouseLeave` 事件（[详见 React 相关 issue](https://github.com/facebook/react/issues/18753)）。因此，若需将 [Tooltip](/components/tooltip) 与禁用 Button 配合使用，应使用 `data-disabled` 替代 `disabled`。同时，由于按钮实际并未禁用，需将 `onClick` 处理为 `(event) => event.preventDefault()`。

<code src="./demo/disabledTooltip.tsx"></code>

### 加载状态

设置 `loading` 属性后，Button 将被禁用，并在按钮中央渲染一个带遮罩的 [Loader](/components/loader)。Loader 的颜色由 Button 的变体决定。

<code src="./demo/loading.tsx"></code>

### Loader 属性

通过 `loaderProps` 属性可自定义 [Loader](/components/loader)，它接受 Loader 组件的所有属性。

使用 [Styles API](/docs/styles/styles-api) 与 [data-* 属性](/docs/styles/data-attributes) 自定义 Button 的示例：

<code src="./demo/loaderProps.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 自定义变体

添加新的 Button 变体时，请使用 [data-variant](/docs/styles/variants-sizes) 属性。通常建议将新变体注册到 [theme](/docs/theming/theme-object) 中，以便在应用内所有 Button 组件中复用。

<code src="./demo/customVariant.tsx"></code>

### 自定义变体颜色

通过向主题注册 [variantColorResolver](/docs/theming/colors#colors-variant-resolver)，可自定义 Button 及其他组件变体的颜色。

<code src="./demo/autoContrast.tsx"></code>

### Button.Group

Button.Group 内部的子 Button 之间不应再包裹额外元素：

```tsx
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button.Group>
      <div>
        <Button>此项样式不会生效</Button>
      </div>
      <Button>边框显示不正确</Button>
    </Button.Group>
  );
}
```

<code src="./demo/group.tsx"></code>

### Button.GroupSection

使用 `Button.GroupSection` 组件可在 Button.Group 中渲染非按钮区域。

<code src="./demo/groupSection.tsx"></code>

<Gradient component="Button"></Gradient>

<StylesApiSelectors component="Button"></StylesApiSelectors>

<AutoContrast component="Button"></AutoContrast>

<Polymorphic defaultElement="button" changeToElement="a" component="Button" withNext></Polymorphic>

<GetElementRef component="Button" refType="button"></GetElementRef>

## API {#api}

### ButtonProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| variant | 按钮视觉变体 | `'filled' \| 'light' \| 'outline' \| 'transparent' \| 'white' \| 'subtle' \| 'default' \| 'gradient'` | `'filled'` |
| color | 主题色键或任意 CSS 颜色 | `UIColor` | `theme.primaryColor` |
| size | 按钮尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'compact-xs' \| 'compact-sm' \| 'compact-md' \| 'compact-lg' \| 'compact-xl'` | `'sm'` |
| radius | 圆角 | `UIRadius` | `theme.defaultRadius` |
| gradient | `variant="gradient"` 时的渐变配置 | `{ from: UIColor; to: UIColor; deg: number }` | `theme.defaultGradient` |
| loading | 加载状态，会渲染 Loader 并禁用点击 | `boolean` | `false` |
| loaderProps | 传递给 Loader 组件的属性 | `LoaderProps` | — |
| disabled | 禁用状态 | `boolean` | `false` |
| leftSection | 按钮左侧内容（通常用于放置图标） | `ReactNode` | — |
| rightSection | 按钮右侧内容 | `ReactNode` | — |
| fullWidth | 宽度 100% | `boolean` | `false` |
| justify | 内部元素的 `justify-content` | `CSSProperties['justifyContent']` | `'center'` |
| autoContrast | 根据背景色自动调整 `filled` 变体的文本颜色 | `boolean` | `false` |
| component | 多态渲染的根组件 | `React.ComponentType` | `'button'` |
| as | 同 `component`，语法糖 | `keyof JSX.IntrinsicElements \| React.ComponentType` | — |

除上表所列属性外，Button 还支持所有原生 `<button>` 属性，包括 `onClick`、`type`、`aria-*`、`data-*` 等。

### Button.Group

按钮组容器，相邻按钮的间距与圆角会自动处理。

```tsx
<Button.Group>
  <Button>Prev</Button>
  <Button>Current</Button>
  <Button>Next</Button>
</Button.Group>
```

## 样式 API {#styles-api}

<APITable component="Button" componentPrefix="Button" withStylesApi />

## 主题变量 {#design-token}

| 变量 | 说明 | 默认值 |
| --- | --- | --- |
| `--button-height` | 按钮高度 | 由 `size` 决定 |
| `--button-padding-x` | 水平内边距 | 由 `size` 决定 |
| `--button-fz` | 字体大小 | 由 `size` 决定 |
| `--button-radius` | 圆角 | 由 `radius` 决定 |
| `--button-bg` | 背景色 | 由 `color` + `variant` 计算 |
| `--button-hover` | hover 背景色 | 由 `color` + `variant` 计算 |
| `--button-color` | 文本色 | 由 `color` + `variant` 计算 |
| `--button-bd` | 边框色 | 由 `color` + `variant` 计算 |

## FAQ {#faq}

### 为什么需要 UIProvider？

react-ui 的样式引擎（`useStyles` / `varsResolver`）依赖 `UIContext` 提供的主题与颜色方案。所有 react-ui 组件必须在 `UIProvider` 包裹下使用。本站基于 dumi 2 构建，每个 react-ui 示例内部均已单独引入 `UIProvider`。
