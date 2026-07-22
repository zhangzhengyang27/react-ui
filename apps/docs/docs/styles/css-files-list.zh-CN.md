---
category: Styles
title: CssFilesList
subtitle: CSS 文件清单
description: react-ui CssFilesList 文档。
---


## 组件依赖

某些组件需要额外的样式才能正常工作。例如，[Button](/components/button/)
组件基于 [UnstyledButton](/components/unstyled-button/) 构建。如果你想使用 [Button](/components/button/)，
也需要导入 `UnstyledButton` 的样式。


有些组件（如 [Select](/components/select/)）本身没有样式——它们构建在其他组件之上。
要了解某个组件内部使用了哪些组件，请查看该组件的源代码。

如果你不确定某个组件内部使用了哪些组件，可以导入所有被复用组件的样式：

```tsx
import '@xiaoye-react/ui/styles/UnstyledButton.css';
import '@xiaoye-react/ui/styles/Button.css';
```

```tsx
import '@xiaoye-react/ui/styles/ScrollArea.css';
import '@xiaoye-react/ui/styles/UnstyledButton.css';
import '@xiaoye-react/ui/styles/VisuallyHidden.css';
import '@xiaoye-react/ui/styles/Paper.css';
import '@xiaoye-react/ui/styles/Popover.css';
import '@xiaoye-react/ui/styles/CloseButton.css';
import '@xiaoye-react/ui/styles/Group.css';
import '@xiaoye-react/ui/styles/Loader.css';
import '@xiaoye-react/ui/styles/Overlay.css';
import '@xiaoye-react/ui/styles/ModalBase.css';
import '@xiaoye-react/ui/styles/Input.css';
import '@xiaoye-react/ui/styles/InlineInput.css';
import '@xiaoye-react/ui/styles/Flex.css';
import '@xiaoye-react/ui/styles/FloatingIndicator.css';
import '@xiaoye-react/ui/styles/ActionIcon.css';
```

## 全局样式

所有 ReactUI 组件都依赖全局样式。你需要在其他所有样式之前导入它们：

- `baseline.css` – 最小化的 CSS reset，设置 `box-sizing: border-box` 并调整字体相关属性
- `default-css-variables.css` – 包含由默认主题生成的所有 CSS 变量
- `global.css` – ReactUI 组件中使用的全局 class

```tsx
import '@xiaoye-react/ui/styles/baseline.css';
import '@xiaoye-react/ui/styles/default-css-variables.css';
import '@xiaoye-react/ui/styles/global.css';
```

## 导入顺序

保持正确的样式导入顺序很重要。例如，如果你想使用
[Button](/components/button/) 组件，需要先导入 [UnstyledButton](/components/unstyled-button/) 的样式，
然后再导入 [Button](/components/button/) 的样式。

```tsx
// ✅ 正确顺序 – Button 样式会覆盖 UnstyledButton 样式
import '@xiaoye-react/ui/styles/UnstyledButton.css';
import '@xiaoye-react/ui/styles/Button.css';
```

```tsx
// ❌ 错误顺序 – UnstyledButton 样式会覆盖 Button 样式
import '@xiaoye-react/ui/styles/Button.css';
import '@xiaoye-react/ui/styles/UnstyledButton.css';
```

## 文件列表

注意，如果下面的列表中找不到某个文件，说明该组件本身没有样式，或者它构建在其他组件之上。

<CssFilesList></CssFilesList>
