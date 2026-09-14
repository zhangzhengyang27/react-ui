---
category: Components
title: CodeHighlight
subtitle: 代码高亮
description: react-ui CodeHighlight 文档。
group:
  title: 通用
  order: 1
---

## 安装

> **⚠️ 尚未发布到 npm**：该组件位于仓库内的 `@xiaoye-react/code-highlight` 包中，此包还没有发布到 npm。组件源码随本仓库提供，发布后此处会更新安装方式。


安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
// ‼️ code-highlight 样式必须在核心包样式之后导入
import '@xiaoye-react/code-highlight/styles.css';
```

## 示例

`CodeHighlight` 组件用于显示带语法高亮的代码片段。它提供灵活的适配器系统，允许你使用任意代码高亮库。

使用 [shiki](https://shiki.matsu.io/) 进行代码高亮的示例：

<code src="./demo/usage.tsx"></code>

## 适配器

`@xiaoye-react/ui` 包不依赖任何特定的代码高亮库。你可以选择包提供的默认适配器之一，或创建自己的适配器。

默认适配器：

- `createShikiAdapter` – 创建 [shiki](https://shiki.matsu.io/) 适配器
- `createHighlightJsAdapter` – 创建 [highlight.js](https://highlightjs.org/) 适配器
- `plainTextAdapter` – 不高亮代码，仅按纯文本显示（未提供适配器时默认使用）

## 使用 shiki

[Shiki](https://shiki.matsu.io/) 库为 TypeScript 和 CSS/Sass 代码提供最先进的语法高亮。它使用 textmate 语法进行高亮（与 VSCode 相同）。如果你需要高亮高级 TypeScript（泛型、嵌套在 props 中的 jsx）或 CSS 代码（自定义语法、最新特性），推荐使用 Shiki 适配器。ReactUI 文档中的所有代码高亮都使用 Shiki 适配器。

要使用 shiki 适配器，你需要安装 `shiki` 包：


然后用 `CodeHighlightAdapterProvider` 包裹你的应用，并将 `createShikiAdapter` 作为 `adapter` 属性传入：

之后，你就可以在应用中使用 `CodeHighlight` 组件：

本页后续所有代码高亮示例均使用 shiki 适配器。

```tsx
import { UIProvider } from '@xiaoye-react/ui';
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@xiaoye-react/code-highlight';

// Shiki 需要异步代码来加载高亮器
async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    // 你可以在这里加载支持的主题
    themes: [],
  });

  return shiki;
}

const shikiAdapter = createShikiAdapter(loadShiki);

function App() {
  return (
    <UIProvider>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        {/* 你的应用内容 */}
      </CodeHighlightAdapterProvider>
    </UIProvider>
  );
}
```

## 使用 highlight.js

与 shiki 相比，[Highlight.js](https://highlightjs.org/) 提供的高亮精度较低，但包体积更小、性能更好。如果你需要高亮基础 JavaScript、HTML 和 CSS 代码，请选择 highlight.js 适配器。

要使用 highlight.js 适配器，你需要安装 `highlight.js` 包：


然后用 `CodeHighlightAdapterProvider` 包裹你的应用，并将 `createHighlightJsAdapter` 作为 `adapter` 属性传入：

然后你需要在应用中添加一个 highlight.js 主题的样式。可以通过从 `highlight.js` 包导入 css 文件，或在应用 head 中添加 CDN 链接来实现：

之后，你就可以在应用中使用 `CodeHighlight` 组件。

```tsx
import { UIProvider } from '@xiaoye-react/ui';
import { CodeHighlightAdapterProvider, createHighlightJsAdapter } from '@xiaoye-react/code-highlight';
import hljs from 'highlight.js/lib/core';
import tsLang from 'highlight.js/lib/languages/typescript';

hljs.registerLanguage('typescript', tsLang);

const highlightJsAdapter = createHighlightJsAdapter(hljs);

function App() {
  return (
    <UIProvider>
      <CodeHighlightAdapterProvider adapter={highlightJsAdapter}>
        {/* 你的应用内容 */}
      </CodeHighlightAdapterProvider>
    </UIProvider>
  );
}
```

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css"
/>
```

## 创建自定义适配器

如果你想增强默认的代码高亮行为，或使用其他库，可以创建自定义适配器。

创建带有自定义主题和逻辑的自定义 shiki 适配器示例：

```tsx
import { type CodeHighlightAdapter, stripShikiCodeBlocks } from '@xiaoye-react/code-highlight';

// Shiki transformers 可用于高亮 diff 和其他标记
// https://shiki.style/packages/transformers
import { transformerNotationDiff, transformerNotationHighlight } from '@shikijs/transformers'

// Shiki 主题作为对象，你可以使用任何 VSCode 主题
import { darkTheme, lightTheme } from './shiki-themes';

async function loadShiki() {
  const { createHighlighter } = await import('shiki');
  const shiki = await createHighlighter({
    langs: ['tsx', 'scss', 'html', 'bash', 'json'],
    themes: [],
  });

  return shiki;
}

// 将此适配器传递给 CodeHighlightAdapterProvider 组件
export const customShikiAdapter: CodeHighlightAdapter = {
  // loadContext 在客户端调用以加载 shiki 高亮器
  // 如果你的库需要异步初始化，则必须使用它
  // loadContext 返回的值会作为 ctx 参数传递给 getHighlighter
  loadContext: loadShiki,

  // ctx 是 loadContext 返回的值
  // 如果未使用 loadContext 或尚未解析，则为 null
  getHighlighter: (ctx) => {
    if (!ctx) {
      return ({ code }) => ({ highlightedCode: code, isHighlighted: false });
    }

    return ({ code, language, colorScheme }) => ({
      isHighlighted: true,
      // stripShikiCodeBlocks 从高亮代码中移除 <pre> 和 <code> 标签
      highlightedCode: stripShikiCodeBlocks(
        ctx.codeToHtml(code, {
          lang: language,
          theme: (colorScheme === 'light' ? lightTheme : darkTheme) as any,
          transformers: [transformerNotationDiff(), transformerNotationHighlight()],
        })
      ),
    });
  },
};
```

## 复制按钮

你可以使用 `copyLabel` 和 `copiedLabel` 属性自定义复制按钮标签。如果需要移除复制按钮，请设置 `withCopyButton={false}`。

<code src="./demo/copy.tsx"></code>

## 带标签页

`CodeHighlightTabs` 组件允许你将多个代码块组织成标签页：

<code src="./demo/tabs.tsx"></code>

## 带图标的标签页

你可以使用任意 React 节点作为标签页图标。下面的示例使用了 `@xiaoye-react/dev-icons` 包中的 TypeScript 和 CSS 图标，但你也可以使用其他图标库或自定义图标：

<code src="./demo/tabsIcons.tsx"></code>

## 根据文件名显示标签页图标

作为为每个标签页手动提供图标的替代方案，你可以使用 `getFileIcon` 属性根据文件名分配图标。`getFileIcon` 接受文件名，必须返回 React 节点或 `null`。

<code src="./demo/tabsGetIcons.tsx"></code>

## 行号

设置 `withLineNumbers` 属性以在代码旁显示行号：

<code src="./demo/lineNumbers.tsx"></code>

## 可展开代码

如果代码片段太长，你可以使用 `withExpandButton` 和 `defaultExpanded={false}` 属性使其可展开。要更改展开/折叠控件提示的标签，请使用 `expandCodeLabel` 和 `collapseCodeLabel`。

<code src="./demo/expand.tsx"></code>

## 自定义控件

将 `controls` 属性与 `CodeHighlightControl` 组件一起使用，为代码块添加自定义控件：

<code src="./demo/customControl.tsx"></code>

## 行内代码

`InlineCodeHighlight` 组件允许你高亮行内代码片段：

<code src="./demo/inline.tsx"></code>
