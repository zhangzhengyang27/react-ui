---
category: Theming
title: Typography
subtitle: 排版
description: react-ui Typography 文档。
---


## 更改字体

你可以使用以下主题属性更改标题、代码和所有其他组件的字体和其他文本样式：

- `theme.fontFamily` – 控制除 [Title](/components/title/)、[Code](/components/code/) 和 [Kbd](/components/kbd/) 外所有组件的 font-family
- `theme.fontFamilyMonospace` – 控制需要等宽字体的组件的 font-family：[Code](/components/code/)、[Kbd](/components/kbd/) 和 [CodeHighlight](/docs/x/code-highlight/)
- `theme.headings.fontFamily` – 控制 [Title](/components/title/) 和 [Typography](/components/typography/) 组件中 h1-h6 标签的 font-family；如果未定义则回退到 `theme.fontFamily`

<code src="./typography/demo/fonts.tsx"></code>

## 系统字体

默认情况下，ReactUI 使用系统字体。这意味着不同设备会根据可用字体显示组件。例如，macOS 和 iOS 用户将看到 [San Francisco 字体](https://developer.apple.com/fonts/)，Windows 用户将看到 [Segoe UI 字体](https://docs.microsoft.com/en-us/typography/font-list/segoe-ui)，Android 用户将看到 [Roboto 字体](https://fonts.google.com/specimen/Roboto)，等等。这种方式为用户提供了熟悉的体验，并避免了自定义字体加载常见的问题（布局偏移、不可见文本等）。如果没有严格要求，建议使用系统字体以获得更好的性能。

主题属性的默认值：

- `theme.fontFamily` 和 `theme.headings.fontFamily` 的默认值为 `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji`
- `theme.fontFamilyMonospace` 的默认值为 `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

## 字体大小

`theme.fontSizes` 属性定义所有 ReactUI 组件的 font-size 值：


`theme.fontSizes` 的默认值：

<DataTable head={['Key', 'Value', 'Value in px']} data={Object.keys(DEFAULT_THEME.fontSizes).map((size) => [ size, `${DEFAULT_THEME.fontSizes[size]}`, `${px(DEFAULT_THEME.fontSizes[size])}px`, ])}></DataTable>

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  fontSizes: {
    xs: 10,
    sm: 11,
    md: 14,
    lg: 16,
    xl: 20,
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

<code src="./typography/demo/fontSizeConfigurator.tsx"></code>

## 行高

`theme.lineHeights` 属性定义 [Text](/components/text) 组件的 line-height 值；大多数其他组件默认使用 `theme.lineHeights.md`：


`theme.lineHeights` 的默认值：

<DataTable head={['Key', 'Value']} data={Object.keys(DEFAULT_THEME.lineHeights).map((size) => [ size, `${DEFAULT_THEME.lineHeights[size]}`, ])}></DataTable>

```tsx
import { createTheme, UIProvider } from '@xiaoye-react/ui';

const theme = createTheme({
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.55',
    lg: '1.6',
    xl: '1.65',
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

## h1-h6 样式

要自定义 [Title](/components/title/) 和 [Typography](/components/typography/) 组件中的标题样式，请设置 `theme.headings`：


使用 `theme.headings` 可以为每个标题级别自定义 font-size、font-weight 和 line-height。如果你需要对样式进行更多控制，请使用 [:is 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/:is) 配合 [Styles API](/docs/styles/styles-api) 来定位特定标题级别：

```tsx
import { createTheme, UIProvider, rem } from '@xiaoye-react/ui';

const theme = createTheme({
  headings: {
    // 所有标题的属性
    fontWeight: '400',
    fontFamily: 'Roboto',

    // 单个标题的属性，都是可选的
    sizes: {
      h1: {
        fontWeight: '100',
        fontSize: 36,
        lineHeight: '1.4',
      },
      h2: { fontSize: 30, lineHeight: '1.5' },
      // ...up to h6
      h6: { fontWeight: '900' },
    },
  },
});

function Demo() {
  return (
    <UIProvider theme={theme}>
      {/* Your app here */}
    </UIProvider>
  );
}
```

<code src="./typography/demo/headingsStyles.tsx"></code>
