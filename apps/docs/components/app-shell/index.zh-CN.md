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
布局模式。根元素是一个 `display: grid` 容器（最小高度 `100vh`），Header / Navbar /
Main / Aside / Footer 各自占据一个网格区域，行高与列宽由 `header.height`、
`footer.height`、`navbar.width`、`aside.width` 通过 CSS 变量决定。

[基本 AppShell 示例](/app-shell?e=BasicAppShell)，包含 header 和 navbar。
Navbar 是否隐藏只由 `navbar.collapsed` 决定，组件本身没有内置的断点行为，
示例中的汉堡按钮用于切换该状态。

```tsx
import { AppShell, Burger } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

function Demo() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        collapsed: !opened,
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
这些属性只提供尺寸与折叠状态，不决定对应组件是否渲染——各部分组件始终渲染，
未配置时 `AppShell.Header`/`AppShell.Footer` 的高度为 `auto`，
而 `AppShell.Navbar`/`AppShell.Aside` 的宽度回退为 `0px`，需配置 `width` 才可见。

`header` 和 `footer` 配置对象共享相同的类型：


`navbar` 和 `aside` 配置对象类型：

```tsx
interface Configuration {
  /** 部分的高度：数字或字符串，
   ** 数字会转换为 rem */
  height: React.CSSProperties['height'];
}
```

```tsx
interface Configuration {
  /** 部分的宽度：数字或字符串，数字会转换为 rem */
  width: React.CSSProperties['width'];

  /** 确定该部分是否应折叠，为 true 时该部分宽度为 0 */
  collapsed?: boolean;
}
```

### 高度配置

`header` 和 `footer` 配置对象中的 `height` 属性的工作方式如下：

- 如果传入数字，该值将转换为 [rem](/docs/styles/rem) 后用作高度。
- 如果传入字符串，该值原样用作高度，例如 `'50vh'`。

数字高度示例：`height` 转换为 [rem](/docs/styles/rem)：


```tsx
import { AppShell } from '@xiaoye-react/ui';

function Demo() {
  return (
    <AppShell header={{ height: 48 }}>
      <AppShell.Header>头部</AppShell.Header>
    </AppShell>
  );
}
```

### 宽度配置

`navbar` 和 `aside` 配置对象中的 `width` 属性的工作方式如下：

- 如果传入数字，该值将转换为 [rem](/docs/styles/rem)，并用作该部分的宽度。
- 如果传入字符串，该值原样用作该部分的宽度。

数字宽度示例：`width` 转换为 [rem](/docs/styles/rem)：


```tsx
import { AppShell } from '@xiaoye-react/ui';

function Demo() {
  return (
    <AppShell navbar={{ width: 48 }}>
      <AppShell.Navbar>导航栏</AppShell.Navbar>
    </AppShell>
  );
}
```

### padding 属性

`padding` 属性控制 `AppShell.Main` 组件的内边距。该值写在根元素的
`--app-shell-padding` 变量上，只有 `AppShell.Main` 会读取它，
因此请在 `AppShell` 上设置，不要直接给 `AppShell.Main` 加内边距。

`padding` 属性接受数字和 `theme.spacing` 的键：数字会转换为
[rem](/docs/styles/rem)，字符串会解析为对应的 `var(--ui-spacing-<键>)` 变量。

`padding` 属性示例：


```tsx
import { AppShell } from '@xiaoye-react/ui';

function Demo() {
  return <AppShell padding="md">{/* AppShell 内容 */}</AppShell>;
}
```

### 折叠 navbar/aside 配置

`navbar` 和 `aside` 属性包含一个 `collapsed` 属性，类型为 `boolean`。
当它为 `true` 时，该部分宽度为 0，即处于折叠状态。
折叠/展开的动画来自根元素内置的 `grid-template-columns` 过渡（`0.2s ease`），
没有可供配置过渡的属性。

通过按钮切换折叠状态的[示例](/app-shell?e=CollapseDesktop)：

```tsx
import { AppShell, Button } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

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
        collapsed: !mobileOpened && !desktopOpened,
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

### CSS 变量

<DataTable head={['变量', '描述']} data={[ [<code>--app-shell-padding</code>, 'AppShell.Main 的内边距'], [<code>--app-shell-navbar-width</code>, 'Navbar 宽度，collapsed 为 true 时为 0px'], [<code>--app-shell-aside-width</code>, 'Aside 宽度，collapsed 为 true 时为 0px'], [<code>--app-shell-header-height</code>, 'Header 高度'], [<code>--app-shell-footer-height</code>, 'Footer 高度'], ]}></DataTable>

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
| navbar | 左侧导航（Navbar 组件）配置，`collapsed` 为 `true` 时宽度为 0 | `{ width: React.CSSProperties['width']; collapsed?: boolean }` | — |
| header | 顶部头部（Header 组件）高度配置 | `{ height: React.CSSProperties['height'] }` | — |
| aside | 右侧侧栏（Aside 组件）配置，`collapsed` 为 `true` 时宽度为 0 | `{ width: React.CSSProperties['width']; collapsed?: boolean }` | — |
| footer | 底部内容（Footer 组件）高度配置 | `{ height: React.CSSProperties['height'] }` | — |
| padding | `AppShell.Main` 的内边距 | `UISpacing`（`theme.spacing` 的键或数字） | `'md'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
