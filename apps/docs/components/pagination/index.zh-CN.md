---
category: Components
title: Pagination
subtitle: 分页
description: react-ui Pagination 分页组件。
group:
  title: 导航
  order: 3
---

## 何时使用 {#when-to-use}

需要在长列表或表格底部展示分页控件，让用户切换页码时使用。

## 代码演示 {#examples}

### 用法

<code src="./demo/configurator.tsx"></code>

### 带分页内容的示例

<code src="./demo/withContent.tsx"></code>

### 受控模式

要控制组件状态，请提供 `value` 和 `onChange` 属性：

```tsx
import { useState } from 'react';
import { Pagination } from '@xiaoye-react/ui';

function Demo() {
  const [activePage, setPage] = useState(1);
  return (
    <Pagination value={activePage} onChange={setPage} total={10} />
  );
}
```

### 相邻项数

使用 `siblings` 属性控制活动项两侧的兄弟项数量：

<code src="./demo/siblings.tsx"></code>

### 边界项数

使用 `boundaries` 属性控制上一页按钮之后和下一页按钮之前显示的项数：

<code src="./demo/boundaries.tsx"></code>

### 响应式布局

设置 `layout="responsive"` 以使用 CSS 容器查询，在容器较窄时显示紧凑的“第 X 页，共 Y 页”标签。
使用 `formatLabel` 属性自定义标签文本。

<code src="./demo/responsive.tsx"></code>

### 隐藏页面控件

设置 `withPages={false}` 以隐藏页面控件：

<code src="./demo/withPages.tsx"></code>

<code src="./demo/stylesApi.tsx"></code>

### 复合组件

可使用以下复合组件来完全控制 `Pagination` 的渲染：

- `Pagination.Root`——上下文提供者
- `Pagination.Items`——项目列表
- `Pagination.Next`——下一页控件
- `Pagination.Previous`——上一页控件
- `Pagination.First`——首页控件
- `Pagination.Last`——末页控件
- `Pagination.Label`——响应式布局的紧凑标签

<code src="./demo/composition.tsx"></code>

### 控件作为链接

<code src="./demo/links.tsx"></code>

### 更改图标

<code src="./demo/icons.tsx"></code>

<code src="./demo/autoContrast.tsx"></code>

### 控件尺寸

默认情况下，分页控件比输入框和按钮尺寸更小。
若希望控件与输入框和按钮尺寸相同，可为 `size` 属性使用 `input-` 前缀：

<code src="./demo/size.tsx"></code>

### 起始值

设置 `startValue` 以定义起始页码。例如，`startValue={5}` 且 `total={15}` 时，
分页范围将从 5 到 15：

<code src="./demo/startValue.tsx"></code>

### URL 同步

可将分页状态与 URL 查询参数同步。这种模式常用于列表视图，当希望分享带有特定页面选中的 URL 时。

### Next.js


### react-router-dom


### nuqs

使用 [nuqs](https://nuqs.dev/) 的示例：

```tsx
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination } from '@xiaoye-react/ui';

function Demo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (p: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', p.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return <Pagination total={10} value={page} onChange={handlePageChange} />;
}
```

```tsx
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@xiaoye-react/ui';

function Demo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (p: number) => {
    setSearchParams({ page: p.toString() });
  };

  return <Pagination total={10} value={page} onChange={handlePageChange} />;
}
```

```tsx
import { useQueryState, parseAsInteger } from 'nuqs';
import { Pagination } from '@xiaoye-react/ui';

function Demo() {
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));
  return <Pagination total={10} value={page} onChange={setPage} />;
}
```

<StylesApiSelectors component="Pagination"></StylesApiSelectors>

<AutoContrast component="Pagination" withVariant={false}></AutoContrast>



## API {#api}

### PaginationProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| total | 总页数 | `number` | — |
| value | 当前页码（受控） | `number` | — |
| defaultValue | 默认页码 | `number` | `1` |
| onChange | 页码变化回调 | `(page: number) => void` | — |
| siblings | 当前页两侧显示的兄弟页数 | `number` | `1` |
| boundaries | 首/尾显示的页数 | `number` | `1` |
| size | 尺寸 | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| withEdges | 是否显示首/尾跳转 | `boolean` | `false` |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
