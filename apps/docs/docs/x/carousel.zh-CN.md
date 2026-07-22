---
category: X
title: Carousel
subtitle: 轮播
description: react-ui Carousel 文档。
---


## 安装

<InstallScript packages="embla-carousel@^8.5.2 embla-carousel-react@^8.5.2 @xiaoye-react/ui"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/styles.css';
// ‼️ carousel 样式必须在核心包样式之后导入
import '@xiaoye-react/ui/styles.css';
```

## 不要忘记导入样式

你已经按照上面的安装说明操作，但某些功能仍然无法正常工作（Carousel 幻灯片垂直渲染、没有控件或指示器）？你掉入了未导入轮播样式的陷阱！要解决这个问题，请在应用根目录导入轮播样式：

```tsx
import '@xiaoye-react/ui/styles.css';
```

## 文档示例

本页展示的示例为了演示目的使用了蓝色背景。为了简化示例代码，背景色和其他仅用于演示的样式没有包含在示例代码中。当你将示例代码复制粘贴到自己的项目中时，不会有蓝色背景。

## 用法

`@xiaoye-react/ui` 包基于 [embla carousel](https://www.embla-carousel.com/)：

<code src="./carousel/demo/usage.tsx"></code>

## 选项

<code src="./carousel/demo/configurator.tsx"></code>

## Embla 选项

你可以通过 `emblaOptions` 属性直接将配置选项传递给 embla carousel。你可以在 [embla 选项参考](https://www.embla-carousel.com/docs/api/options) 中找到选项说明。

传递 `loop`、`dragFree` 和 `align` 选项的示例：

<code src="./carousel/demo/emblaOptions.tsx"></code>

## 尺寸与间距

在 `Carousel` 组件上设置 `slideSize` 和 `slideGap`，以控制每个幻灯片的尺寸和间距：

<code src="./carousel/demo/multiple.tsx"></code>

## 响应式样式

`slideSize` 和 `slideGap` 属性的工作方式与 [样式属性](/docs/styles/style-props/) 相同，你可以传递一个包含不同断点值的对象：

<code src="./carousel/demo/breakpoints.tsx"></code>

## 容器查询

要使用[容器查询](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)替代媒体查询，请设置 `type="container"`。使用容器查询时，幻灯片尺寸和间距会根据容器宽度而非视口宽度进行调整。

注意，使用容器查询时，`slideSize` 和 `slideGap` 属性的键不能引用 `theme.breakpoints` 值。你需要使用精确的 px 或 em 值。

要查看幻灯片尺寸和间距如何变化，请拖动示例右下角的大小调整手柄来调整根元素大小：

<code src="./carousel/demo/container.tsx"></code>

## 自由拖拽

`dragFree` 会禁用幻灯片吸附点——用户可以在任意位置停止拖拽：

<code src="./carousel/demo/dragFree.tsx"></code>

## 垂直方向

`orientation="vertical"` 的轮播需要设置 `height` 属性：

<code src="./carousel/demo/vertical.tsx"></code>

## 控制图标

你可以用任意 React 节点替换默认的下一张/上一张控件图标：

<code src="./carousel/demo/icons.tsx"></code>

## 100% 高度

设置 `height="100%"` 使 Carousel 占据容器的 100% 高度。注意，在这种情况下：

- 容器元素必须具有 `display: flex` 样式
- 轮播根元素必须具有 `flex: 1` 样式
- 容器元素必须具有固定高度

```tsx
import { Carousel } from '@xiaoye-react/ui';

export function PercentageHeight() {
  return (
    <div style={{ height: 400, display: 'flex' }}>
      <Carousel withIndicators height="100%" flex={1}>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
      </Carousel>
    </div>
  );
}
```

## 获取 embla 实例

你可以通过 `getEmblaApi` 属性获取 [embla 实例](https://www.embla-carousel.com/docs/api/methods)。之后你可以使用 embla api 方法为轮播添加额外的逻辑：

<code src="./carousel/demo/progress.tsx"></code>

## Embla 插件

设置 `plugins` 属性以使用 [embla 插件](https://www.embla-carousel.com/docs/plugins) 增强轮播。注意，插件不会随 `@xiaoye-react/ui` 包一起安装，你需要单独安装。

使用 [autoplay 插件](https://www.embla-carousel.com/docs/plugins/autoplay) 的示例：

<InstallScript packages="embla-carousel-autoplay@^8.5.2"></InstallScript>

<code src="./carousel/demo/autoplay.tsx"></code>

<code src="./carousel/demo/stylesApi.tsx"></code>

## 指示器样式

<code src="./carousel/demo/indicatorStyles.tsx"></code>

## 隐藏非活动控件

<code src="./carousel/demo/controlsStyles.tsx"></code>

## 悬停显示控件

<code src="./carousel/demo/controlsHover.tsx"></code>

## 示例：图片轮播

<code src="./carousel/demo/images.tsx"></code>

## 示例：卡片轮播

<code src="./carousel/demo/cards.tsx"></code>

## 无障碍

在 `Carousel` 组件上设置 `aria-label` 或 `aria-labelledby`，以使其对屏幕阅读器可访问：


使用 `nextControlProps` 和 `previousControlProps` 属性为下一张/上一张控件设置 `aria-label`：

```tsx
import { Carousel } from '@xiaoye-react/ui';

export function AccessibleCarousel() {
  return (
    <Carousel aria-label="自然风景图片集">
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
    </Carousel>
  );
}
```

```tsx
import { Carousel } from '@xiaoye-react/ui';

export function AccessibleControlsCarousel() {
  return (
    <Carousel
      aria-label="自然风景图片集"
      nextControlProps={{ 'aria-label': '下一张幻灯片' }}
      previousControlProps={{ 'aria-label': '上一张幻灯片' }}
    >
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
      <Carousel.Slide>...</Carousel.Slide>
    </Carousel>
  );
}
```

<StylesApiSelectors component="Carousel"></StylesApiSelectors>
