---
category: Styles
title: CssVariables
subtitle: CSS 变量
description: react-ui CssVariables 文档。
---


## 字体排版变量

字体排版变量控制所有 ReactUI 组件的 font-family、font-size、line-height、font-weight 和其他文本相关属性。

### 字体

以下 CSS 变量用于为所有 ReactUI 组件设置字体：

<CssVariablesGroup data={[ { variable: '--ui-font-family', description: '控制大多数 ReactUI 组件的 font-family 属性', defaultValue: '系统无衬线字体', }, { variable: '--ui-font-family-monospace', description: '控制代码块的 font-family 属性', defaultValue: '系统等宽字体', }, { variable: '--ui-font-family-headings', description: '控制标题的 font-family 属性', defaultValue: '系统无衬线字体', }, ]}></CssVariablesGroup>

你可以在 [theme](/docs/theming/theme-object) 中控制这些变量。注意，如果
`theme.headings.fontFamily` 未设置，`--ui-font-family-headings` 的值将与 `--ui-font-family` 相同。


如果你想将系统字体作为自定义字体的 fallback，可以引用 `DEFAULT_THEME` 的值，而无需手动定义：


你可以在 CSS 中引用字体变量：


也可以在 [ff style prop](/docs/styles/style-props) 中使用：

- `ff="text"` 将使用 `--ui-font-family` 变量
- `ff="monospace"` 将使用 `--ui-font-family-monospace` 变量
- `ff="heading"` 将使用 `--ui-font-family-headings` 变量


### 字体大小

字体大小变量用于大多数 ReactUI 组件来控制文本大小。具体使用哪个变量取决于组件及其 `size` prop。

<CssVariablesGroup data={[ { variable: '--ui-font-size-xs', defaultValue: '0.75rem (12px)', }, { variable: '--ui-font-size-sm', defaultValue: '0.875rem (14px)', }, { variable: '--ui-font-size-md', defaultValue: '1rem (16px)', }, { variable: '--ui-font-size-lg', defaultValue: '1.125rem (18px)', }, { variable: '--ui-font-size-xl', defaultValue: '1.25rem (20px)', }, ]}></CssVariablesGroup>

你可以在 CSS 中引用字体大小变量：


也可以在 [fz style prop](/docs/styles/style-props) 中使用：


要定义自定义字体大小，可以使用 `theme.fontSizes` 属性：


注意，`theme.fontSizes` 对象会与 `DEFAULT_THEME.fontSizes` 合并——
你不需要定义所有值，只需要定义你想修改的值。


你可以向 `theme.fontSizes` 对象添加任意数量的额外字体大小。
这些值将以 `--ui-font-size-{size}` 格式定义为 CSS 变量：


定义 `theme.fontSizes` 后，你可以在 CSS 中引用这些变量：


> **大小写转换**
>
> 自定义字体大小不会自动应用 camelCase 到 kebab-case 的转换。
> 如果你使用 camelCase 键定义 `theme.fontSizes`，你需要以 camelCase 格式引用它们。
> 例如，如果你定义了 `{ customSize: '1rem' }`，需要以 `--ui-font-size-customSize` 引用。

### 行高

行高变量用于 [Text](/components/text) 组件。在其他组件中，
行高要么根据字体大小计算，要么设置为 `--ui-line-height`，
它是 `--ui-line-height-md` 的别名。

<CssVariablesGroup data={[ { variable: '--ui-line-height', defaultValue: '1.55', }, { variable: '--ui-line-height-xs', defaultValue: '1.4', }, { variable: '--ui-line-height-sm', defaultValue: '1.45', }, { variable: '--ui-line-height-md', defaultValue: '1.55', }, { variable: '--ui-line-height-lg', defaultValue: '1.6', }, { variable: '--ui-line-height-xl', defaultValue: '1.65', }, ]}></CssVariablesGroup>

你可以在 CSS 中引用行高变量：


也可以在 [lh style prop](/docs/styles/style-props) 中使用：


要定义自定义行高，可以使用 `theme.lineHeights` 属性：


### 标题

`theme.headings` 控制 [Title](/components/title) 和 [Typography](/components/typography) 组件中标题的 font-size、line-height、font-weight 和 text-wrap CSS 属性。

<CssVariablesGroup
  data={[
    { group: '通用变量' },
    {
      variable: '--ui-heading-font-weight',
      description:
        '控制所有标题的 font-weight 属性，除非被覆盖',
      defaultValue: '700',
    },
    {
      variable: '--ui-heading-text-wrap',
      description: '控制所有标题的 text-wrap 属性',
      defaultValue: 'wrap',
    },
    { group: 'h1 标题' },
    {
      variable: '--ui-h1-font-size',
      defaultValue: '2.125rem (34px)',
    },
    {
      variable: '--ui-h1-line-height',
      defaultValue: '1.3',
    },
    {
      variable: '--ui-h1-font-weight',
      defaultValue: '700',
    },
    { group: 'h2 标题' },
    {
      variable: '--ui-h2-font-size',
      defaultValue: '1.625rem (26px)',
    },
    {
      variable: '--ui-h2-line-height',
      defaultValue: '1.35',
    },
    {
      variable: '--ui-h2-font-weight',
      defaultValue: '700',
    },
    { group: 'h3 标题' },
    {
      variable: '--ui-h3-font-size',
      defaultValue: '1.375rem (22px)',
    },
    {
      variable: '--ui-h3-line-height',
      defaultValue: '1.4',
    },
    {
      variable: '--ui-h3-font-weight',
      defaultValue: '700',
    },
    { group: 'h4 标题' },
    {
      variable: '--ui-h4-font-size',
      defaultValue: '1.125rem (18px)',
    },
    {
      variable: '--ui-h4-line-height',
      defaultValue: '1.45',
    },
    {
      variable: '--ui-h4-font-weight',
      defaultValue: '700',
    },
    { group: 'h5 标题' },
    {
      variable: '--ui-h5-font-size',
      defaultValue: '1rem (16px)',
    },
    {
      variable: '--ui-h5-line-height',
      defaultValue: '1.5',
    },
    {
      variable: '--ui-h5-font-weight',
      defaultValue: '700',
    },
    { group: 'h6 标题' },
    {
      variable: '--ui-h6-font-size',
      defaultValue: '0.875rem (14px)',
    },
    {
      variable: '--ui-h6-line-height',
      defaultValue: '1.5',
    },
    {
      variable: '--ui-h6-font-weight',
      defaultValue: '700',
    },
  ]}
/>

这些变量用于 [Title](/components/title) 组件，`order` prop 控制使用哪个标题级别。例如，`order={3}` 的 Title 将使用：

- `--ui-h3-font-size`
- `--ui-h3-line-height`
- `--ui-h3-font-weight`


你可以在 CSS 中引用标题变量：


也可以在 [fz 和 lh style props](/docs/styles/style-props) 中使用：


要修改标题样式，可以使用 `theme.headings` 属性：


`theme.headings` 对象会与 `DEFAULT_THEME.headings` 对象深度合并——
你不需要定义所有值，只需要定义你想修改的值。


### 字体平滑

字体平滑变量控制 [-webkit-font-smoothing 和 moz-osx-font-smoothing](https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth)
CSS 属性。这些变量用于让文本在高像素密度屏幕上显示得更好。

字体平滑变量由 `theme.fontSmoothing` [theme](/docs/theming/theme-object) 属性控制，默认为 `true`。如果 `theme.fontSmoothing` 为 `false`，两个变量都将设置为 `unset`。

<CssVariablesGroup data={[ { variable: '--ui-webkit-font-smoothing', description: '控制 -webkit-font-smoothing CSS 属性', defaultValue: 'antialiased', }, { variable: '--ui-moz-font-smoothing', description: '控制 -moz-osx-font-smoothing CSS 属性', defaultValue: 'grayscale', }, ]}></CssVariablesGroup>

如果你需要覆盖字体平滑值，最好的方式是禁用 `theme.fontSmoothing`，然后在 body 元素上设置[全局样式](/docs/styles/global-styles/#add-global-styles-in-your-application)：

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  // 控制 --ui-font-family
  fontFamily: 'Arial, sans-serif',

  // 控制 --ui-font-family-monospace
  fontFamilyMonospace: 'Courier New, monospace',

  headings: {
    // 控制 --ui-font-family-headings
    fontFamily: 'Georgia, serif',
  },
});
```

```tsx
import { createTheme, DEFAULT_THEME } from '@xiaoye-react/ui';

const theme = createTheme({
  fontFamily: `Roboto, ${DEFAULT_THEME.fontFamily}`,
});
```

```scss
.text {
  font-family: var(--ui-font-family);
}

.code {
  font-family: var(--ui-font-family-monospace);
}

.heading {
  font-family: var(--ui-font-family-headings);
}
```

```tsx
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Text ff="monospace">
      这段文字使用了 --ui-font-family-monospace 变量
    </Text>
  );
}
```

```scss
.demo {
  font-size: var(--ui-font-size-md);
}
```

```tsx
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Text fz="xl">
      这段文字使用了 --ui-font-size-xl 变量
    </Text>
  );
}
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
  },
});
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

// 只修改 xs 字体大小，其他值将从 DEFAULT_THEME 获取
const theme = createTheme({
  fontSizes: {
    xs: '0.5rem',
  },
});
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  fontSizes: {
    xxs: '0.125rem',
    xxl: '2rem',
  },
});
```

```scss
.demo {
  font-size: var(--ui-font-size-xxs);
}
```

```scss
.demo {
  line-height: var(--ui-line-height-md);
}
```

```tsx
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Text lh="xl">
      这段文字使用了 --ui-line-height-xl 变量
    </Text>
  );
}
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  lineHeights: {
    xs: '1.2',
    sm: '1.3',
    md: '1.4',
    lg: '1.5',
    xl: '1.6',
  },
});
```

```scss
.h1 {
  font-size: var(--ui-h1-font-size);
  line-height: var(--ui-h1-line-height);
  font-weight: var(--ui-h1-font-weight);
}
```

```tsx
import { Box } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Box fz="h1" lh="h1">
      这段文字使用了 --ui-h1-* 变量
    </Box>
  );
}
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
        lineHeight: '1.5',
        fontWeight: '500',
      },
      h2: {
        fontSize: '1.5rem',
        lineHeight: '1.6',
        fontWeight: '500',
      },
    },
    // ...
  },
});
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

// 只修改 h1 的字体大小，其他值将从 DEFAULT_THEME 获取
const theme = createTheme({
  headings: {
    sizes: {
      h1: {
        fontSize: '2rem',
      },
    },
  },
});
```

```tsx
import { createTheme } from '@xiaoye-react/ui';

// 在你的主题中禁用字体平滑
const theme = createTheme({
  fontSmoothing: false,
});
```

```scss
// 在项目中添加全局样式，使用你想要的字体平滑值
body {
  -webkit-font-smoothing: subpixel-antialiased;
  -moz-osx-font-smoothing: auto;
}
```

<code src="./css-variables/demo/usage.tsx"></code>

## 颜色变量

颜色变量由 `theme.colors` 和 `theme.primaryColor` 控制。`theme.colors` 对象中定义的每种颜色都需要有 10 个色阶。主题颜色可以通过名称和色阶索引引用，例如 `--ui-color-red-6`。

你可以在主题对象上定义新颜色或覆盖已有颜色：


上面的代码将定义以下 CSS 变量：

<CssVariablesGroup
  data={[
    {
      variable: '--ui-color-demo-0',
      defaultValue: '#FF0000',
    },
    {
      variable: '--ui-color-demo-1',
      defaultValue: '#FF3333',
    },
    {
      variable: '--ui-color-demo-2',
      defaultValue: '#FF6666',
    },
    {
      variable: '--ui-color-demo-3',
      defaultValue: '#FF9999',
    },
    {
      variable: '--ui-color-demo-4',
      defaultValue: '#FFCCCC',
    },
    {
      variable: '--ui-color-demo-5',
      defaultValue: '#FFEEEE',
    },
    {
      variable: '--ui-color-demo-6',
      defaultValue: '#FFFAFA',
    },
    {
      variable: '--ui-color-demo-7',
      defaultValue: '#FFF5F5',
    },
    {
      variable: '--ui-color-demo-8',
      defaultValue: '#FFF0F0',
    },
    {
      variable: '--ui-color-demo-9',
      defaultValue: '#FFEBEB',
    },
  ]}
/>

### 变体颜色

一些 ReactUI 组件（如 [Button](/components/button) 或 [Badge](/components/badge)）具有 `variant` prop，
它与 `color` prop 一起控制组件的文本、背景和边框颜色。
对于每种变体和颜色，ReactUI 都定义了一组 CSS 变量来控制这些颜色。
例如，对于默认的 `blue` 颜色，定义了以下 CSS 变量：

<CssVariablesGroup
  data={[
    { group: 'Filled 变体' },
    {
      variable: '--ui-color-blue-filled',
      description: 'filled 变体的背景色',
      defaultValue: 'var(--ui-color-blue-6)',
    },
    {
      variable: '--ui-color-blue-filled-hover',
      description: 'filled 变体 hover 时的背景色',
      defaultValue: 'var(--ui-color-blue-7)',
    },
    { group: 'Light 变体' },
    {
      variable: '--ui-color-blue-light',
      description: 'light 变体的背景色',
      defaultValue: 'rgba(34, 139, 230, 0.1)',
    },
    {
      variable: '--ui-color-blue-light-hover',
      description: 'light 变体 hover 时的背景色',
      defaultValue: 'rgba(34, 139, 230, 0.12)',
    },
    {
      variable: '--ui-color-blue-light-color',
      description: 'light 变体的文本颜色',
      defaultValue: 'var(--ui-color-blue-6)',
    },
    { group: 'Outline 变体' },
    {
      variable: '--ui-color-blue-outline',
      description: 'outline 变体的边框颜色',
      defaultValue: 'var(--ui-color-blue-6)',
    },
    {
      variable: '--ui-color-blue-outline-hover',
      description: 'outline 变体的边框颜色',
      defaultValue: 'rgba(34, 139, 230, 0.05)',
    },
  ]}
/>

例如，如果你这样使用 [Button](/components/button) 组件：


该组件将具有以下样式：

- 背景色为 `var(--ui-color-pink-filled)`
- hover 时背景色为 `var(--ui-color-pink-filled-hover)`
- 文本颜色为 `var(--ui-color-white)`
- 边框颜色为 `transparent`

注意，上述变量不是静态的，它们根据 `theme.colors` 和 `theme.primaryShade` 的值生成。
此外，它们在亮色和暗色配色方案下的值也不同。

变体颜色变量用于所有支持 `color` prop 的组件，例如
[Button](/components/button)、[Badge](/components/badge)、[Avatar](/components/avatar) 和 [Pagination](/components/pagination)。
这些组件使用的颜色值由下面介绍的 `cssVariablesResolver` 和
[variantColorResolver](/docs/styles/variants-sizes/#variantcolorresolver) 决定。

### 主色变量

主色变量由 `theme.primaryColor` 定义（它必须是 `theme.colors` 的键）。
主色定义了以下 CSS 变量：

<CssVariablesGroup
  data={[
    {
      variable: '--ui-primary-color-{shade}',
      description:
        'shade 为 0-9，用于引用特定主色色阶',
      defaultValue: 'var(--ui-color-{primaryColor}-{shade})',
    },
    {
      variable: '--ui-primary-color-filled',
      description: 'filled 变体的背景色',
      defaultValue: 'var(--ui-color-{primaryColor}-filled)',
    },
    {
      variable: '--ui-primary-color-filled-hover',
      description: 'filled 变体 hover 时的背景色',
      defaultValue:
        'var(--ui-color-{primaryColor}-filled-hover)',
    },
    {
      variable: '--ui-primary-color-light',
      description: 'light 变体的背景色',
      defaultValue: 'var(--ui-color-{primaryColor}-light)',
    },
    {
      variable: '--ui-primary-color-light-hover',
      description: 'light 变体 hover 时的背景色',
      defaultValue: 'var(--ui-color-{primaryColor}-light-hover)',
    },
    {
      variable: '--ui-primary-color-light-color',
      description: 'light 变体的文本颜色',
      defaultValue: 'var(--ui-color-{primaryColor}-light-color)',
    },
  ]}
/>

你可以在 CSS 中引用主色变量：


### 其他颜色变量

以下颜色用于各种 ReactUI 组件。注意，默认值针对亮色配色方案提供，暗色配色方案下的值不同。

<CssVariablesGroup
  data={[
    {
      variable: '--ui-color-white',
      description: 'theme.white 的值',
      defaultValue: '#fff',
    },
    {
      variable: '--ui-color-black',
      description: 'theme.black 的值',
      defaultValue: '#000',
    },
    {
      variable: '--ui-color-text',
      description: 'body 元素中使用的文本颜色',
      defaultValue: 'var(--ui-color-black)',
    },
    {
      variable: '--ui-color-body',
      description: 'body 背景色',
      defaultValue: 'var(--ui-color-white)',
    },
    {
      variable: '--ui-color-error',
      description: '用于错误消息和状态的颜色',
      defaultValue: 'var(--ui-color-red-6)',
    },
    {
      variable: '--ui-color-success',
      description: '用于成功消息和状态的颜色',
      defaultValue: 'var(--ui-color-teal-8)',
    },
    {
      variable: '--ui-color-placeholder',
      description: '用于输入框 placeholder 的颜色',
      defaultValue: 'var(--ui-color-gray-5)',
    },
    {
      variable: '--ui-color-dimmed',
      description: '用于暗淡文本的颜色',
      defaultValue: 'var(--ui-color-gray-6)',
    },
    {
      variable: '--ui-color-bright',
      description: '用于明亮文本的颜色',
      defaultValue: 'var(--ui-color-black)',
    },
    {
      variable: '--ui-color-anchor',
      description: '用于链接的颜色',
      defaultValue: 'var(--ui-primary-color-6)',
    },
    {
      variable: '--ui-color-default',
      description: 'default 变体的背景色',
      defaultValue: 'var(--ui-color-white)',
    },
    {
      variable: '--ui-color-default-hover',
      description: 'default 变体 hover 时的背景色',
      defaultValue: 'var(--ui-color-gray-0)',
    },
    {
      variable: '--ui-color-default-color',
      description: 'default 变体的文本颜色',
      defaultValue: 'var(--ui-color-black)',
    },
    {
      variable: '--ui-color-default-border',
      description: 'default 变体的边框颜色',
      defaultValue: 'var(--ui-color-gray-4)',
    },
    {
      variable: '--ui-color-disabled',
      description: '禁用元素的背景色',
      defaultValue: 'var(--ui-color-gray-2)',
    },
    {
      variable: '--ui-color-disabled-color',
      description: '禁用元素的文本颜色',
      defaultValue: 'var(--ui-color-gray-5)',
    },
    {
      variable: '--ui-color-disabled-border',
      description: '禁用元素的边框颜色',
      defaultValue: 'var(--ui-color-gray-3)',
    },
  ]}
/>

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  colors: {
    demo: [
      '#FF0000',
      '#FF3333',
      '#FF6666',
      '#FF9999',
      '#FFCCCC',
      '#FFEEEE',
      '#FFFAFA',
      '#FFF5F5',
      '#FFF0F0',
      '#FFEBEB',
    ],
  },
});
```

```tsx
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Button color="pink" variant="filled">
      Filled pink button
    </Button>
  );
}
```

```scss
.demo {
  color: var(--ui-primary-color-0);
  background-color: var(--ui-primary-color-filled);
}
```

## 间距变量

`theme.spacing` 值用于大多数 ReactUI 组件来控制 padding、margin 和其他间距相关属性。
以下 CSS 变量基于 `theme.spacing` 定义：

<CssVariablesGroup data={[ { variable: '--ui-spacing-xs', defaultValue: '0.625rem (10px)', }, { variable: '--ui-spacing-sm', defaultValue: '0.75rem (12px)', }, { variable: '--ui-spacing-md', defaultValue: '1rem (16px)', }, { variable: '--ui-spacing-lg', defaultValue: '1.25rem (20px)', }, { variable: '--ui-spacing-xl', defaultValue: '2rem (32px)', }, ]}></CssVariablesGroup>

要定义自定义间距值，请使用 `theme.spacing` 属性：

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
});
```

## 圆角变量

支持 `radius` prop 的 ReactUI 组件使用圆角变量来控制 border radius。
以下 CSS 变量基于 `theme.radius` 定义：

<CssVariablesGroup data={[ { variable: '--ui-radius-xs', defaultValue: '0.125rem (2px)', }, { variable: '--ui-radius-sm', defaultValue: '0.25rem (4px)', }, { variable: '--ui-radius-md', defaultValue: '0.5rem (8px)', }, { variable: '--ui-radius-lg', defaultValue: '1rem (16px)', }, { variable: '--ui-radius-xl', defaultValue: '2rem (32px)', }, ]}></CssVariablesGroup>

此外，`--ui-radius-default` 变量基于 `theme.defaultRadius` 值定义。
如果组件上的 `radius` prop 未显式设置，则使用 `--ui-radius-default`。

要定义自定义圆角值，请使用 `theme.radius` 和 `theme.defaultRadius` 属性：

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  defaultRadius: 'sm',
  radius: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '3rem',
  },
});
```

## 阴影变量

阴影变量用于所有支持 `shadow` prop 的 ReactUI 组件。以下 CSS 变量基于 `theme.shadows` 定义：

<CssVariablesGroup data={[ { variable: '--ui-shadow-xs', defaultValue: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)', }, { variable: '--ui-shadow-sm', defaultValue: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 10px 15px -5px, rgba(0, 0, 0, 0.04) 0 7px 7px -5px', }, { variable: '--ui-shadow-md', defaultValue: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px', }, { variable: '--ui-shadow-lg', defaultValue: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 28px 23px -7px, rgba(0, 0, 0, 0.04) 0 12px 12px -7px', }, { variable: '--ui-shadow-xl', defaultValue: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 36px 28px -7px, rgba(0, 0, 0, 0.04) 0 17px 17px -7px', }, ]}></CssVariablesGroup>

要定义自定义阴影值，请使用 `theme.shadows` 属性：

```tsx
import { createTheme } from '@xiaoye-react/ui';

const theme = createTheme({
  shadows: {
    xs: '0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 8px rgba(0, 0, 0, 0.1)',
    xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
});
```

## z-index 变量

z-index 变量在 `@xiaoye-react/ui/styles.css` 中定义。与其他变量不同，
z-index 变量不受 theme 控制，也不会暴露在 theme 对象中。

<CssVariablesGroup data={[ { variable: '--ui-z-index-app', defaultValue: '100', }, { variable: '--ui-z-index-modal', defaultValue: '200', }, { variable: '--ui-z-index-popover', defaultValue: '300', }, { variable: '--ui-z-index-overlay', defaultValue: '400', }, { variable: '--ui-z-index-max', defaultValue: '9999', }, ]}></CssVariablesGroup>

你可以在 CSS 中引用 z-index 变量：


也可以在组件中通过引用 CSS 变量来使用：

```css
/* 将内容显示在 modal 之上 */
.my-content {
  z-index: calc(var(--ui-z-index-modal) + 1);
}
```

```tsx
import { Modal } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Modal
      zIndex="var(--ui-z-index-max)"
      opened
      onClose={() => {}}
    >
      Modal content
    </Modal>
  );
}
```

## CSS 变量解析器

[UIProvider](/docs/theming/ui-provider) 上的 `cssVariablesResolver` prop 允许你修改 ReactUI CSS 变量的值，甚至添加你自己的变量。
`cssVariablesResolver` 是一个接受 [theme](/docs/theming/theme-object) 作为唯一参数的函数，
返回一个将 CSS 变量分为三组的的对象：

- `variables` – 不依赖配色方案的变量
- `light` – 仅用于亮色配色方案的变量
- `dark` – 仅用于暗色配色方案的变量

添加基于 `theme.other` 的新 CSS 变量的示例：


然后你就可以在应用的任何部分使用 `--ui-hero-height` 和 `--ui-color-deep-orange` 变量：

```tsx
import {
  createTheme,
  CSSVariablesResolver,
  UIProvider,
} from '@xiaoye-react/ui';

const themeOverride = createTheme({
  other: {
    deepOrangeLight: '#E17900',
    deepOrangeDark: '#FC8C0C',
    heroHeight: 400,
  },
});

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--ui-hero-height': theme.other.heroHeight,
  },
  light: {
    '--ui-color-deep-orange': theme.other.deepOrangeLight,
  },
  dark: {
    '--ui-color-deep-orange': theme.other.deepOrangeDark,
  },
});

function Demo() {
  return (
    <UIProvider
      theme={themeOverride}
      cssVariablesResolver={resolver}
    >
      {/* Your app here */}
    </UIProvider>
  );
}
```

```css
.hero {
  height: var(--ui-hero-height);

  /* 背景色会根据配色方案自动变化 */
  background-color: var(--ui-color-deep-orange);
}
```
