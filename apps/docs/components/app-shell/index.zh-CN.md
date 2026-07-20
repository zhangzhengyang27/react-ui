---
category: Components
title: AppShell
subtitle: 应用外壳
description: react-ui AppShell 应用外壳组件。
group:
  title: 布局
  order: 2
---

## 何时使用 {#when-to-use}

需要构建带有侧边栏、头部、导航的应用外壳布局，常用于后台管理系统时使用。

## 代码演示 {#examples}

### 用法

`AppShell` 是一个布局组件，可用于创建常见的 Header / Navbar / Footer / Aside
布局模式。所有 `AppShell` 组件都具有 `position: fixed` 样式，因此它们不会随页面滚动。

[基本 AppShell 示例](/app-shell?e=BasicAppShell)，包含 header 和 navbar。
Navbar 在移动端默认隐藏，可以通过汉堡按钮切换。

```tsx
import { AppShell, Burger } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />

        <div>徽标</div>
      </AppShell.Header>

      <AppShell.Navbar>导航栏</AppShell.Navbar>

      <AppShell.Main>主内容</AppShell.Main>
    </AppShell>
  );
}
```

### 配置

`AppShell` 组件接受 `header`、`footer`、`navbar` 和 `aside` 属性来配置相应的部分。
若要使用相应的组件，则必须设置这些属性。
例如，要使用 `AppShell.Header` 组件，需在 `AppShell` 组件上设置 `header` 属性。

`header` 和 `footer` 配置对象共享相同的类型：


`navbar` 和 `aside` 配置对象类型：

```tsx
interface Configuration {
  /** 部分的高度：数字、字符串或
   ** 以断点为键、高度为值的对象 */
  height: AppShellSize | AppShellResponsiveSize;

  /** 当 collapsed 为 true 时，该部分从视口中隐藏
   ** 且不会影响 AppShell.Main 的偏移 */
  collapsed?: boolean;

  /** 控制 AppShell.Main 是否应由该部分进行偏移。
   ** 适用于基于滚动位置隐藏 header 等场景。 */
  offset?: boolean;
}
```

```tsx
interface Configuration {
  /** 部分的宽度：数字、字符串或
   ** 以断点为键、宽度为值的对象 */
  width: AppShellSize | AppShellResponsiveSize;

  /** 部分切换到移动模式的断点。
   ** 在移动模式下，该部分始终具有 100% 宽度，
   ** 其折叠状态由 `collapsed.mobile` 控制
   ** 而非 `collapsed.desktop` */
  breakpoint: UIBreakpoint | (string & {}) | number;

  /** 确定该部分是否应折叠 */
  collapsed?: { desktop?: boolean; mobile?: boolean };
}
```

### 高度配置

`header` 和 `footer` 配置对象中的 `height` 属性的工作方式如下：

- 如果传入数字，该值将转换为 [rem](/docs/styles/rem)，并在所有视口大小下用作高度。
- 要根据视口宽度更改高度，请使用以断点为键、高度为值的对象。其工作方式与 [style props](/docs/styles/style-props#responsive-styles) 相同。

数字高度示例：`height` 转换为 [rem](/docs/styles/rem)，
并在所有视口大小下保持不变：


带断点的对象高度示例：
- 当视口宽度 < `theme.breakpoints.sm` 时，`height` 为 48
- 当视口宽度 >= `theme.breakpoints.sm` 且 < `theme.breakpoints.lg` 时，`height` 为 60
- 当视口宽度 >= `theme.breakpoints.lg` 时，`height` 为 76

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell header={{ height: 48 }}>
      <AppShell.Header>头部</AppShell.Header>
    </AppShell>
  );
}
```

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell header={{ height: { base: 48, sm: 60, lg: 76 } }}>
      <AppShell.Header>头部</AppShell.Header>
    </AppShell>
  );
}
```

### 宽度配置

`navbar` 和 `aside` 配置对象中的 `width` 属性的工作方式如下：

- 如果传入数字，该值将转换为 [rem](/docs/styles/rem)，并在视口大于 `breakpoint` 时用作宽度。
- 要根据视口宽度更改宽度，请使用以断点为键、宽度为值的对象。其工作方式与 [style props](/docs/styles/style-props#responsive-styles) 相同。
  请注意，当视口小于 `breakpoint` 时，宽度始终为 100%。

数字宽度示例：`width` 转换为 [rem](/docs/styles/rem)，
并在视口大小大于 `breakpoint` 时保持不变。
当视口宽度小于 `breakpoint` 时，`width` 为 100%：


带断点的对象宽度示例：
- 当视口宽度 < `theme.breakpoints.sm` 时，`width` 为 100%
- 当视口宽度 >= `theme.breakpoints.sm` 且 < `theme.breakpoints.lg` 时，`width` 为 200
- 当视口宽度 >= `theme.breakpoints.lg` 时，`width` 为 300

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell navbar={{ width: 48, breakpoint: 'sm' }}>
      <AppShell.Navbar>导航栏</AppShell.Navbar>
    </AppShell>
  );
}
```

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell
      navbar={{ width: { sm: 200, lg: 300 }, breakpoint: 'sm' }}
    >
      <AppShell.Navbar>导航栏</AppShell.Navbar>
    </AppShell>
  );
}
```

### padding 属性

`padding` 属性控制 `AppShell.Main` 组件的内边距。使用此属性很重要，
不要直接在 `AppShell.Main` 上设置内边距，因为该内边距还用于计算
`AppShell.Header`、`AppShell.Navbar`、`AppShell.Aside` 和 `AppShell.Footer` 组件的偏移。

`padding` 属性的工作方式与 [style props](/docs/styles/style-props#responsive-styles) 相同，
接受数字、字符串以及以断点为键、内边距值为值的对象。可
引用 `theme.spacing` 值或使用任何有效的 CSS 值。

静态 `padding` 属性示例：


响应式 `padding` 属性示例：
- 当视口宽度 < `theme.breakpoints.sm` 时，`padding` 为 10
- 当视口宽度 >= `theme.breakpoints.sm` 且 < `theme.breakpoints.lg` 时，`padding` 为 15
- 当视口宽度 >= `theme.breakpoints.lg` 时，`padding` 为 `theme.spacing.xl`

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return <AppShell padding="md">{/* AppShell 内容 */}</AppShell>;
}
```

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell padding={{ base: 10, sm: 15, lg: 'xl' }}>
      {/* AppShell 内容 */}
    </AppShell>
  );
}
```

### Header 偏移配置

`header` 属性包含一个 `offset` 属性，允许控制
`AppShell.Main` 组件是否由 header 的高度进行偏移。
当想基于滚动位置折叠 `AppShell.Header` 时，这特别有用。
例如，可使用 [use-headroom](/docs/hooks/use-headroom) Hook
在向下滚动时隐藏 header，向上滚动时显示 header（[示例](/app-shell?e=Headroom)）。

```tsx
import { AppShell, rem } from '@react-ui/ui';
import { useHeadroom } from '@react-ui/hooks';

function Demo() {
  const { pinned } = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell
      header={{ height: 60, collapsed: !pinned, offset: false }}
      padding="md"
    >
      <AppShell.Header>头部</AppShell.Header>

      <AppShell.Main
        pt={`calc(${rem(60)} + var(--ui-spacing-md))`}
      >
        {/* 内容 */}
      </AppShell.Main>
    </AppShell>
  );
}
```

### 折叠 navbar/aside 配置

`navbar` 和 `aside` 属性包含一个 `collapsed` 属性，接受格式为 `{ mobile: boolean; desktop: boolean }` 的对象。
这允许根据视口宽度以不同方式配置折叠状态。

针对移动端和桌面端分别设置折叠状态的[示例](/app-shell?e=CollapseDesktop)：

```tsx
import { AppShell, Button } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] =
    useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>头部</AppShell.Header>
      <AppShell.Navbar>导航栏</AppShell.Navbar>
      <AppShell.Main>
        <Button onClick={toggleDesktop} visibleFrom="sm">
          切换 navbar
        </Button>
        <Button onClick={toggleMobile} hiddenFrom="sm">
          切换 navbar
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
```

### withBorder 属性

`withBorder` 属性在 `AppShell` 及其关联部分上可用：`AppShell.Header`、`AppShell.Navbar`、`AppShell.Aside` 和 `AppShell.Footer`。
默认情况下，`withBorder` 属性为 `true` – 所有组件在与 `AppShell.Main` 组件相邻的一侧都有边框。
例如，`AppShell.Header` 位于页面顶部——它在底部有边框，
`AppShell.Navbar` 位于页面左侧——它在右侧有边框。

要移除所有组件的边框，请在 `AppShell` 上设置 `withBorder={false}`：


要移除特定组件的边框，请在该组件上设置 `withBorder={false}`：

```tsx
import { AppShell } from '@react-ui/ui';

// 所有组件都不会有边框
function Demo() {
  return (
    <AppShell withBorder={false}>{/* AppShell 内容 */}</AppShell>
  );
}
```

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell>
      <AppShell.Header withBorder={false}>头部</AppShell.Header>
    </AppShell>
  );
}
```

### zIndex 属性

`zIndex` 属性在 `AppShell` 及其关联部分上可用：`AppShell.Header`、`AppShell.Navbar`、`AppShell.Aside` 和 `AppShell.Footer`。
默认情况下，所有部分的 `z-index` 为 `100`。

要更改所有部分的 `z-index`，请在 `AppShell` 组件上设置 `zIndex` 属性：


要更改特定部分的 `z-index`，请在该部分上设置 `zIndex` 属性：

```tsx
import { AppShell } from '@react-ui/ui';

// 所有部分的 z-index 为 200
function Demo() {
  return <AppShell zIndex={200}>{/* AppShell 内容 */}</AppShell>;
}
```

```tsx
import { AppShell } from '@react-ui/ui';

// AppShell.Header 的 z-index 为 100
// AppShell.Navbar 和 AppShell.Aside 的 z-index 为 300
function Demo() {
  return (
    <AppShell>
      <AppShell.Header zIndex={100}>头部</AppShell.Header>
      <AppShell.Navbar zIndex={300}>导航栏</AppShell.Navbar>
      <AppShell.Aside zIndex={300}>侧边栏</AppShell.Aside>
    </AppShell>
  );
}
```

### 控制过渡

在 `AppShell` 组件上使用 `transitionDuration` 和 `transitionTimingFunction` 属性来控制部分动画：

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      {/* AppShell 内容 */}
    </AppShell>
  );
}
```

### disabled 属性

在 `AppShell` 组件上设置 `disabled` 属性，以防止除 `AppShell.Main` 之外的所有部分渲染。
当想在应用的某些页面上隐藏 shell 时，这很有用。

```tsx
import { AppShell } from '@react-ui/ui';

function Demo() {
  return <AppShell disabled>{/* AppShell 内容 */}</AppShell>;
}
```

### AppShell.Section 组件

`AppShell.Section` 用于在 `AppShell.Navbar` 和 `AppShell.Aside` 内创建有组织的区域。
由于这些组件是具有 `flex-direction: column` 的 flexbox 容器，因此带有 `grow` 属性的 `AppShell.Section`
组件将扩展以填充可用空间，并且可以通过设置
`component={ScrollArea}` 使其可滚动。

在以下示例中：

- 第一个和最后一个部分（header 和 footer）只占用其内容所需的空间
- 带有 `grow` 的中间部分占用所有剩余空间，并在内容超过可用高度时可滚动

```tsx
import { AppShell, ScrollArea } from '@react-ui/ui';

function Demo() {
  return (
    <AppShell navbar={{ width: 300, breakpoint: 0 }}>
      <AppShell.Navbar>
        <AppShell.Section>导航栏头部</AppShell.Section>
        <AppShell.Section grow component={ScrollArea}>
          将扩展以填充可用空间的 Navbar 主体部分
        </AppShell.Section>
        <AppShell.Section>
          始终在底部的 Navbar footer
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>主内容</AppShell.Main>
    </AppShell>
  );
}
```

### CSS 变量

<DataTable head={['变量', '描述']} data={[ [<Code>--app-shell-navbar-width</Code>, 'Navbar 宽度'], [<Code>--app-shell-navbar-offset</Code>, 'Navbar 偏移'], [<Code>--app-shell-aside-width</Code>, 'Aside 宽度'], [<Code>--app-shell-aside-offset</Code>, 'Aside 偏移'], [<Code>--app-shell-header-height</Code>, 'Header 高度'], [<Code>--app-shell-header-offset</Code>, 'Header 偏移'], [<Code>--app-shell-footer-height</Code>, 'Footer 高度'], [<Code>--app-shell-footer-offset</Code>, 'Footer 偏移'], ]}></DataTable>

在样式中使用 CSS 变量的示例：

```scss
.main {
  min-height: calc(100dvh - var(--app-shell-header-height));
}
```



## API {#api}

### AppShellProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 布局类型 | `'default' \| 'alt'` | `'default'` |
| navbar | 左侧导航（Navbar 组件） | `ReactNode` | — |
| header | 顶部头部（Header 组件） | `ReactNode` | — |
| aside | 右侧侧栏（Aside 组件） | `ReactNode` | — |
| footer | 底部内容 | `ReactNode` | — |
| padding | 内边距 | `number \| string` | `0` |
| disabled | 是否禁用响应式行为 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
