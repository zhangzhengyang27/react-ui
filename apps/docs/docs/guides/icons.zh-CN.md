---
category: Guides
title: Icons
subtitle: 图标
description: react-ui Icons 文档。
---


## Phosphor 图标

ReactUI 的示例和文档使用 [Phosphor icons](https://phosphoricons.com/)，部分 `@xiaoye-react/` 包也依赖它们。如果你不知道该用哪个图标库，我们推荐 [Phosphor icons](https://phosphoricons.com/)。

## 图标尺寸

大多数图标库支持 `size` 属性（或类似的 `width` 和 `height` 属性），用于修改图标的宽度和高度。通常以像素为单位的数字。

{/* <Demo data={GuidesDemos.icon} /> */}

> **size 属性中的 rem 单位**
>
> 图标的 `size` 属性通常会在底层转换为 `width` 和 `height` 属性。
> 例如 `size={16}` 会转换为 svg 元素上的 `width="16"` 和 `height="16"` 属性。
>
> 你也可以在 `size` 属性中使用 rem 单位：`size="1rem"` 会转换为 `width="1rem"` 和 `height="1rem"`，
> 但不推荐这样做，因为这违反 SVG 标准——某些浏览器（如 Firefox）会在控制台显示警告。

## 自定义图标

我们建议将图标作为 React 组件使用。这样你就可以在 `fill` 和 `stroke` 属性中使用 `currentColor`，
让图标根据上下文自动改变颜色。

<code src="./icons/demo/customIcon.tsx"></code>
