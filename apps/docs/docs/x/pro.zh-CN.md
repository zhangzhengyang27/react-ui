---
category: X
title: Pro
subtitle: 管理端模式层
description: react-ui Pro 管理端模式层组件。
---


## 安装

<InstallScript packages="@xiaoye-react/pro"></InstallScript>

`@xiaoye-react/pro` 是面向管理端的**页面模式层**，基于 `@xiaoye-react/ui` 构建：`PageContainer` 页面骨架、`SearchFilter` 查询区、`ProTable` 数据列表。三者可以独立使用，组合起来即是标准的中后台列表页。

## PageContainer 页面骨架 {#pagecontainer}

标题、副标题、面包屑与右侧操作区的页面头部结构，`headerGap` 控制头部与内容的间距：

```tsx
import { PageContainer } from '@xiaoye-react/pro';

<PageContainer
  title="成员管理"
  subtitle="维护平台成员信息"
  breadcrumbs={breadcrumbs}
  extra={<Button size="xs">新建成员</Button>}
>
  {/* 页面内容 */}
</PageContainer>
```

## SearchFilter 查询区 {#searchfilter}

配置驱动的查询表单：字段栅格布局、超出 `collapsedRows` 行自动折叠并提供展开/收起、查询/重置按钮内置。字段通过 `type` 映射内置输入组件（`text` / `number` / `select`），复杂字段用 `render` 自定义：

```tsx
import { SearchFilter } from '@xiaoye-react/pro';

<SearchFilter
  fields={[
    { name: 'keyword', type: 'text', label: '关键词', placeholder: '姓名 / 部门' },
    { name: 'department', type: 'select', label: '部门', data: ['研发部', '市场部'] },
  ]}
  onSearch={(values) => console.log(values)}
/>
```

## ProTable 数据列表 {#protable}

`ProTable` = SearchFilter（可选）+ 工具栏 + DataTable 的请求编排层。传入 `request` 即可获得：

- **自动首查**：挂载后以 `{ page: 1, pageSize }` 发起请求
- **分页编排**：翻页/改每页条数自动携带参数重查，改每页条数自动回第 1 页
- **搜索编排**：查询区提交后自动回第 1 页并携带 `search` 值
- **排序编排**：排序变化自动回第 1 页并携带 `sortStatus`
- **竞态保护**：仅采纳最后一次请求的响应
- **手动刷新**：内置刷新按钮 + `actionsRef.current.refresh()`（保存数据后刷新列表）

```tsx
import { ProTable } from '@xiaoye-react/pro';

<ProTable
  columns={columns}
  rowKey={(record) => record.id}
  request={async ({ page, pageSize, search }) => {
    const res = await api.getUsers({ page, pageSize, keyword: search?.keyword });
    return { records: res.list, total: res.total };
  }}
  search={{ fields: [{ name: 'keyword', type: 'text', label: '关键词' }] }}
  striped
/>
```

`request` 抛错时结束 loading 并调用 `onRequestError`（未提供时 console.error）。

## CRUD 列表页模板 {#crud-template}

`PageContainer` + `ProTable` + `Modal` 组合出的标准列表页：新建/编辑共用一个弹窗表单，保存后通过 `actionsRef` 刷新列表。业务代码只需要列定义、请求函数与表单字段：

<code src="./pro/demo/crud.tsx"></code>

### 列表 + Drawer 编辑

字段较多或需要更大编辑空间时，用 `Drawer` 承载表单：操作列内联「编辑」入口，校验失败信息展示在对应字段下方：

<code src="./pro/demo/drawer-edit.tsx"></code>

### 主从详情

左表右详情：点击列表行（`dataTableProps.onRowClick`）联动右侧 `Descriptions` 展示完整信息，适合「列表扫一眼、详情看仔细」的审阅类页面：

<code src="./pro/demo/master-detail.tsx"></code>

## API

### ProTableProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义，透传给 DataTable | `DataTableColumn<T>[]` | 必填 |
| request | 数据请求函数 | `(params: ProTableRequestParams) => Promise<ProTableRequestResult<T>>` | 必填 |
| search | 查询区配置，传 `false` 关闭 | `SearchFilterProps \| false` | - |
| defaultSearchValues | 查询区默认值 | `Record<string, any>` | `{}` |
| toolbar | 工具栏左侧内容 | `React.ReactNode` | - |
| rowKey | 行唯一 key | `(record: T, index: number) => string` | - |
| defaultPageSize | 每页条数初始值 | `number` | `10` |
| refreshText | 刷新按钮文案 | `string` | `'刷新'` |
| onRequestError | 请求失败回调 | `(error: unknown, params) => void` | - |
| actionsRef | 接收 `{ refresh }` | `React.MutableRefObject<{ refresh: () => void } \| null>` | - |
| dataTableProps | 透传给 DataTable 的其余表现属性 | `Partial<DataTableProps<T>>` | - |

`ProTableRequestParams`：`{ page, pageSize, search?, sortStatus? }`；`ProTableRequestResult<T>`：`{ records: T[], total: number }`。

### SearchFilterProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 字段配置 | `SearchFilterField[]` | 必填 |
| values / defaultValue / onChange | 查询值（受控/非受控） | `Record<string, any>` | `{}` |
| onSearch | 点击查询或回车触发 | `(values) => void` | - |
| onReset | 点击重置触发 | `() => void` | - |
| columns | 栅格列数 | `number` | `3` |
| collapsedRows | 收起时显示的行数 | `number` | `1` |
| searchText / resetText | 按钮文案 | `string` | `'查询' / '重置'` |
| loading | 查询中禁用 | `boolean` | `false` |

`SearchFilterField`：`{ name, label?, type?: 'text' | 'number' | 'select', data?, placeholder?, colSpan?, render? }`。

### PageContainerProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题 | `React.ReactNode` | - |
| subtitle | 副标题 | `React.ReactNode` | - |
| breadcrumbs | 面包屑区 | `React.ReactNode` | - |
| extra | 右侧操作区 | `React.ReactNode` | - |
| headerGap | 头部与内容间距 | `UISpacing \| number \| string` | `'md'` |
| contentGap | 子元素间距 | `UISpacing \| number \| string` | `0` |
