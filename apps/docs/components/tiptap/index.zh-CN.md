---
category: Components
title: Tiptap
subtitle: 富文本编辑器
description: react-ui Tiptap 文档。
group:
  title: 数据录入
  order: 4
---


## 安装

> **⚠️ 尚未发布到 npm**：该组件位于仓库内的 `@xiaoye-react/tiptap` 包中，此包还没有发布到 npm。组件源码随本仓库提供，发布后此处会更新安装方式。


安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
// ‼️ tiptap 样式必须在核心包样式之后导入
import '@xiaoye-react/tiptap/styles.css';
```

## TipTap 编辑器

`@xiaoye-react/ui` 包为 [Tiptap](https://tiptap.dev/) 提供了 UI。`RichTextEditor` 组件与 tiptap 的 [Editor](https://tiptap.dev/api/editor) 实例一起工作。这意味着你可以通过 [useEditor hook](https://tiptap.dev/installation/react) 完全控制编辑器的[状态和配置](https://tiptap.dev/guide/configuration)。

换句话说，`RichTextEditor` 组件不会替你管理状态；控件只是在 `Editor` 实例上执行操作。如果你想实现与状态或组件值相关的功能（例如受控模式、将值转换为 HTML/Markdown），你应该查阅 [tiptap.dev](https://tiptap.dev/) 网站上的文档。

## 用法

<code src="./demo/usage.tsx"></code>

## 柔和变体

`variant="subtle"` 会移除控件组的边框，使控件更大，并减少工具栏的间距：

<code src="./demo/subtleVariant.tsx"></code>

## 受控模式

要控制编辑器状态，请创建一个包装组件，并将 `onChange` 处理函数传递给 `useEditor` hook：

```tsx
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor as UIRichTextEditor } from '@xiaoye-react/tiptap';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <UIRichTextEditor editor={editor}>
      <UIRichTextEditor.Toolbar>
        <UIRichTextEditor.ControlsGroup>
          <UIRichTextEditor.Bold />
          <UIRichTextEditor.Italic />
        </UIRichTextEditor.ControlsGroup>
      </UIRichTextEditor.Toolbar>

      <UIRichTextEditor.Content />
    </UIRichTextEditor>
  );
}
```

## 控件与扩展

某些控件需要安装额外的 [Tiptap 扩展](https://tiptap.dev/extensions)。例如，如果你想使用 `RichTextEditor.Superscript` 控件，需要安装 `@tiptap/extension-superscript` 包：


`@tiptap/starter-kit` 默认包含以下控件（应默认安装）：

- `RichTextEditor.H1`
- `RichTextEditor.H2`
- `RichTextEditor.H3`
- `RichTextEditor.H4`
- `RichTextEditor.H5`
- `RichTextEditor.H6`
- `RichTextEditor.BulletList`
- `RichTextEditor.OrderedList`
- `RichTextEditor.Bold`
- `RichTextEditor.Italic`
- `RichTextEditor.Strikethrough`
- `RichTextEditor.ClearFormatting`
- `RichTextEditor.Blockquote`
- `RichTextEditor.Code`
- `RichTextEditor.CodeBlock`
- `RichTextEditor.Hr`
- `RichTextEditor.Undo`
- `RichTextEditor.Redo`
- `RichTextEditor.Underline`
- `RichTextEditor.Unlink`

需要 [@tiptap/extension-text-align](https://www.npmjs.com/package/@tiptap/extension-text-align) 扩展的控件：

- `RichTextEditor.AlignLeft`
- `RichTextEditor.AlignRight`
- `RichTextEditor.AlignCenter`
- `RichTextEditor.AlignJustify`

需要 [@tiptap/extension-color](https://www.npmjs.com/package/@tiptap/extension-color) 和 [@tiptap/extension-text-style](https://www.npmjs.com/package/@tiptap/extension-text-style) 扩展的控件：

- `RichTextEditor.ColorPicker`
- `RichTextEditor.Color`
- `RichTextEditor.UnsetColor`

其他需要扩展的控件：

- `RichTextEditor.Superscript` 需要 [@tiptap/extension-superscript](https://www.npmjs.com/package/@tiptap/extension-superscript)
- `RichTextEditor.Subscript` 需要 [@tiptap/extension-subscript](https://www.npmjs.com/package/@tiptap/extension-subscript)
- `RichTextEditor.Highlight` 需要 [@tiptap/extension-highlight](https://www.npmjs.com/package/@tiptap/extension-highlight)

## 占位符

要使用占位符，需要安装 [@tiptap/extension-placeholder](https://www.npmjs.com/package/@tiptap/extension-placeholder) 包：


<code src="./demo/placeholder.tsx"></code>

## 链接扩展

`@xiaoye-react/ui` 包提供了一个自定义的 `Link` 扩展，必须用它替代 `@tiptap/extension-link`，才能使 `Ctrl + K` 键盘快捷键正常工作：

```tsx
// 使用 @xiaoye-react/ui 包导出的 Link 扩展
import { useEditor } from '@tiptap/react';
import { Link, RichTextEditor } from '@xiaoye-react/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      Link,
      // ... 其他扩展
    ],
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

## 文本颜色

要使用文本颜色，需要安装额外的包：


你可以使用以下控件更改文本颜色：

- `RichTextEditor.ColorPicker` – 允许从给定的预定义色板中拾取颜色，或使用 [ColorPicker](/components/color-picker/) 组件
- `RichTextEditor.Color` – 允许一键应用给定颜色
- `RichTextEditor.UnsetColor` – 清除颜色样式

<code src="./demo/colors.tsx"></code>

## 代码高亮

要使用代码高亮，需要安装额外的包：


<code src="./demo/codeHighlight.tsx"></code>

## 源代码模式

你可以使用以下控件查看和编辑编辑器内容的源代码：
- `RichTextEditor.SourceCode` – 允许切换源代码模式

<code src="./demo/sourceCodeSwitcher.tsx"></code>

## 任务列表

要使用任务列表，需要安装额外的包：


<code src="./demo/tasks.tsx"></code>

## 排版样式

默认情况下，`RichTextEditor` 使用 [Typography](/components/typography/) 和一些额外样式渲染内容。你可以通过设置 `withTypographyStyles={false}` 禁用这些样式：


然后你可以通过 [全局样式](/docs/styles/global-styles/) 或 [Styles API](/docs/styles/styles-api/) 添加自己的样式：

```tsx
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@xiaoye-react/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      // ... 你的扩展
    ],
  });

  return (
    <RichTextEditor editor={editor} withTypographyStyles={false}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

<code src="./demo/typographyStyles.tsx"></code>

## 气泡菜单

你可以在任何 `RichTextEditor` 控件中使用 [BubbleMenu](https://tiptap.dev/api/extensions/bubble-menu) 组件。气泡菜单会出现在选中的文本附近：

<code src="./demo/bubbleMenu.tsx"></code>

## 浮动菜单

你可以在任何 `RichTextEditor` 控件中使用 [FloatingMenu](https://tiptap.dev/api/extensions/floating-menu) 组件。浮动菜单会出现在空行中：

<code src="./demo/floatingMenu.tsx"></code>

## 粘性工具栏

在 `RichTextEditor.Toolbar` 组件上设置 `sticky` 属性可使工具栏粘性定位；使用 `stickyOffset` 控制 `top` 属性。例如，在 react-ui.dev 文档网站上有一个高度为 `var(--docs-header-height)` 的页眉。此时，我们需要设置 `stickyOffset="var(--docs-header-height)"`，以使粘性定位与固定定位的元素正确配合。

<code src="./demo/usage.tsx" id="tiptap-sticky-toolbar"></code>

## 编辑器上下文

使用 `useRichTextEditorContext` hook 从上下文中获取 [Editor](https://tiptap.dev/api/editor)。该 hook 可用于创建自定义控件或运行 Tiptap [编辑器 API](https://tiptap.dev/api/editor) 支持的任何操作。

```tsx
import { Button } from '@xiaoye-react/ui';
import { useRichTextEditorContext } from '@xiaoye-react/tiptap';

function Demo() {
  const { editor } = useRichTextEditorContext();
  return (
    <Button
      onClick={() => editor?.chain().focus().toggleBold().run()}
    >
      加粗
    </Button>
  );
}
```

## 自定义控件

使用 `RichTextEditor.Control` 组件创建自定义控件。它支持 `button` 元素支持的所有属性，并具有 `active` 属性来指示激活状态。注意，你需要设置 `aria-label` 属性，以便屏幕阅读器能够识别该控件。

<code src="./demo/customControl.tsx"></code>

## 更改图标

你可以通过设置 `icon` 属性来更改控件的图标。它接受一个必须处理 `size` 属性的组件：

<code src="./demo/icons.tsx"></code>

## 标签与本地化

`RichTextEditor` 支持通过 `labels` 属性更改所有控件的标签：


大多数标签用于为控件添加 `aria-label` 和 `title` 属性；部分标签可以是返回字符串的函数。如果你未提供所有标签，它们会与默认标签合并。

所有可用标签：


默认标签（可从 `@xiaoye-react/ui` 包导入）：

```tsx
import { useEditor } from '@tiptap/react';
import { RichTextEditor } from '@xiaoye-react/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [
      // ... 你的扩展
    ],
  });

  return (
    <RichTextEditor
      editor={editor}
      labels={{
        boldControlLabel: '加粗文本',
        italicControlLabel: '斜体文本',
        // ...其他标签
      }}
    >
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
```

```tsx
// RichTextEditorLabels 类型可从 @xiaoye-react/ui 包导入
export interface RichTextEditorLabels {
  /** RichTextEditor.Bold control aria-label */
  boldControlLabel: string;

  /** RichTextEditor.Hr control aria-label */
  hrControlLabel: string;

  /** RichTextEditor.Italic control aria-label */
  italicControlLabel: string;

  /** RichTextEditor.Underline control aria-label */
  underlineControlLabel: string;

  /** RichTextEditor.Strike control aria-label */
  strikeControlLabel: string;

  /** RichTextEditor.ClearFormatting control aria-label */
  clearFormattingControlLabel: string;

  /** RichTextEditor.Link control aria-label */
  linkControlLabel: string;

  /** RichTextEditor.Unlink control aria-label */
  unlinkControlLabel: string;

  /** RichTextEditor.BulletList control aria-label */
  bulletListControlLabel: string;

  /** RichTextEditor.OrderedList control aria-label */
  orderedListControlLabel: string;

  /** RichTextEditor.H1 control aria-label */
  h1ControlLabel: string;

  /** RichTextEditor.H2 control aria-label */
  h2ControlLabel: string;

  /** RichTextEditor.H3 control aria-label */
  h3ControlLabel: string;

  /** RichTextEditor.H4 control aria-label */
  h4ControlLabel: string;

  /** RichTextEditor.H5 control aria-label */
  h5ControlLabel: string;

  /** RichTextEditor.H6 control aria-label */
  h6ControlLabel: string;

  /** RichTextEditor.Blockquote control aria-label */
  blockquoteControlLabel: string;

  /** RichTextEditor.AlignLeft control aria-label */
  alignLeftControlLabel: string;

  /** RichTextEditor.AlignCenter control aria-label */
  alignCenterControlLabel: string;

  /** RichTextEditor.AlignRight control aria-label */
  alignRightControlLabel: string;

  /** RichTextEditor.AlignJustify control aria-label */
  alignJustifyControlLabel: string;

  /** RichTextEditor.Code control aria-label */
  codeControlLabel: string;

  /** RichTextEditor.CodeBlock control aria-label */
  codeBlockControlLabel: string;

  /** RichTextEditor.Subscript control aria-label */
  subscriptControlLabel: string;

  /** RichTextEditor.Superscript control aria-label */
  superscriptControlLabel: string;

  /** RichTextEditor.ColorPicker control aria-label */
  colorPickerControlLabel: string;

  /** RichTextEditor.UnsetColor control aria-label */
  unsetColorControlLabel: string;

  /** RichTextEditor.Highlight control aria-label */
  highlightControlLabel: string;

  /** RichTextEditor.Undo control aria-label */
  undoControlLabel: string;

  /** RichTextEditor.Redo control aria-label */
  redoControlLabel: string;

  /** A function go get RichTextEditor.Color control aria-label based on color that control applies */
  colorControlLabel: (color: string) => string;

  /** aria-label for link editor url input */
  linkEditorInputLabel: string;

  /** placeholder for link editor url input */
  linkEditorInputPlaceholder: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in a new tab */
  linkEditorExternalLink: string;

  /** Content of external button tooltip in link editor when the link was chosen to open in the same tab */
  linkEditorInternalLink: string;

  /** Save button content in link editor */
  linkEditorSave: string;

  /** Cancel button title text in color picker control */
  colorPickerCancel: string;

  /** Clear button title text in color picker control */
  colorPickerClear: string;

  /** Color picker button title text in color picker control */
  colorPickerColorPicker: string;

  /** Palette button title text in color picker control */
  colorPickerPalette: string;

  /** Save button title text in color picker control */
  colorPickerSave: string;

  /** aria-label for color palette colors */
  colorPickerColorLabel: (color: string) => string;
}
```

```tsx
import { RichTextEditorLabels } from '@xiaoye-react/tiptap';

export const DEFAULT_LABELS: RichTextEditorLabels = {
  // Controls labels
  linkControlLabel: 'Link',
  colorPickerControlLabel: 'Text color',
  highlightControlLabel: 'Highlight text',
  colorControlLabel: (color) => `Set text color ${color}`,
  boldControlLabel: 'Bold',
  italicControlLabel: 'Italic',
  underlineControlLabel: 'Underline',
  strikeControlLabel: 'Strikethrough',
  clearFormattingControlLabel: 'Clear formatting',
  unlinkControlLabel: 'Remove link',
  bulletListControlLabel: 'Bullet list',
  orderedListControlLabel: 'Ordered list',
  h1ControlLabel: 'Heading 1',
  h2ControlLabel: 'Heading 2',
  h3ControlLabel: 'Heading 3',
  h4ControlLabel: 'Heading 4',
  h5ControlLabel: 'Heading 5',
  h6ControlLabel: 'Heading 6',
  blockquoteControlLabel: 'Blockquote',
  alignLeftControlLabel: 'Align text: left',
  alignCenterControlLabel: 'Align text: center',
  alignRightControlLabel: 'Align text: right',
  alignJustifyControlLabel: 'Align text: justify',
  codeControlLabel: 'Code',
  codeBlockControlLabel: 'Code block',
  subscriptControlLabel: 'Subscript',
  superscriptControlLabel: 'Superscript',
  unsetColorControlLabel: 'Unset color',
  hrControlLabel: 'Horizontal line',
  undoControlLabel: 'Undo',
  redoControlLabel: 'Redo',

  // Task list
  tasksControlLabel: 'Task list',
  tasksSinkLabel: 'Decrease task level',
  tasksLiftLabel: 'Increase task level',

  // Link editor
  linkEditorInputLabel: 'Enter URL',
  linkEditorInputPlaceholder: 'https://example.com/',
  linkEditorExternalLink: 'Open link in a new tab',
  linkEditorInternalLink: 'Open link in the same tab',
  linkEditorSave: 'Save',

  // Color picker control
  colorPickerCancel: 'Cancel',
  colorPickerClear: 'Clear color',
  colorPickerColorPicker: 'Color picker',
  colorPickerPalette: 'Color palette',
  colorPickerSave: 'Save',
  colorPickerColorLabel: (color) => `Set text color ${color}`,
};
```
