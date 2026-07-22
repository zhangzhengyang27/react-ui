---
category: Components
title: TableOfContents
subtitle: 目录
description: react-ui TableOfContents 目录组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在长文档侧边显示当前可见章节的目录链接时使用。

## 代码演示 {#examples}

### 用法

使用 `TableOfContents` 组件显示目录，类似于 react-ui.dev 文档侧边栏中的目录。该组件会跟踪滚动位置并高亮列表中的当前标题。

<code src="./demo/usage.tsx"></code>

### use-scroll-spy 选项

`TableOfContents` 基于 [use-scroll-spy](/docs/hooks/use-scroll-spy) Hook。可使用 `scrollSpyOptions` 属性将选项传递给 `use-scroll-spy` Hook。

自定义选择器、深度和值获取的示例：

```tsx
import { TableOfContents } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TableOfContents
      scrollSpyOptions={{
        selector: '#mdx [data-heading]',
        getDepth: (element) => Number(element.getAttribute('data-order')),
        getValue: (element) => element.getAttribute('data-heading') || '',
      }}
    />
  );
}
```

### 向控件传递属性

可使用 `getControlProps` 函数向 `TableOfContents` 组件渲染的控件传递属性。它接受一个包含 `active` 和 `data` 属性的对象，并应返回一个 props 对象。

将控件更改为链接的示例：

```tsx
import { TableOfContents } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TableOfContents
      getControlProps={({ active, data }) => ({
        component: 'a',
        href: `#${data.id}`,
        style: { color: active ? 'blue' : 'gray' },
        children: data.value,
      })}
    />
  );
}
```

### 初始数据

`TableOfContents` 在挂载时获取数据。若需在 `TableOfContents` 组件挂载之前渲染标题（例如在服务端渲染期间），可传入 `initialData` 属性，值为标题数据数组。`initialData` 会在挂载时被实际数据替换。

```tsx
import { TableOfContents } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TableOfContents
      initialData={[
        { id: '1', value: 'Heading 1', depth: 1 },
        { id: '2', value: 'Heading 2', depth: 2 },
        { id: '3', value: 'Heading 3', depth: 3 },
      ]}
    />
  );
}
```

### 深度偏移

使用 `minDepthToOffset` 属性设置应应用偏移的最小深度。默认情况下，`minDepthToOffset` 为 `1`，意味着一级和二级标题不会偏移。设置为 `0` 可对所有标题应用偏移。

要控制偏移值（以 px 为单位），请设置 `depthOffset` 属性：

<code src="./demo/depthOffset.tsx"></code>

<code src="./demo/autoContrast.tsx"></code>

### 样式 API

使用 [Styles API](/docs/styles/styles-api) 和 [data-* 属性](/docs/styles/data-attributes) 自定义 `TableOfContents` 的示例：

<code src="./demo/styles.tsx"></code>

### 重新初始化

默认情况下，`TableOfContents` 不会跟踪 DOM 的变化。若需在父组件挂载后更新标题数据，可以使用 `reinitializeRef` 从 [use-scroll-spy](/docs/hooks/use-scroll-spy) Hook 获取重新初始化函数：

```tsx
import { useRef, useLayoutEffect } from 'react';
import { TableOfContents } from '@xiaoye-react/ui';

function Demo({ dependency }) {
  const reinitializeRef = useRef(() => {});

  useLayoutEffect(() => {
    reinitializeRef.current();
  }, [dependency]);

  return <TableOfContents reinitializeRef={reinitializeRef} />;
}
```

<AutoContrast component="TableOfContents"></AutoContrast>



## API {#api}

### TableOfContentsProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| data | 目录项数组 | `{ id: string; depth: number; value: string }[]` | `[]` |
| variant | 视觉变体 | `'default'` | `'default'` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'sm'` |
| minWidth | 最小宽度 | `number` | `240` |
| maxHeight | 最大高度 | `number \| string` | `'80vh'` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
