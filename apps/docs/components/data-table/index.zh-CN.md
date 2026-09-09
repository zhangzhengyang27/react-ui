---
category: Components
title: DataTable
subtitle: 数据表格
description: react-ui DataTable 数据表格组件。
group:
  title: 数据展示
  order: 5
---

## 何时使用 {#when-to-use}

需要展示结构化列表数据，并要求排序、行选择、分页、固定列等表格交互能力时使用。与展示型组件 [Table](/components/table) 的定位不同，`DataTable` 是面向管理端场景的数据表格，接收列定义与行数据即可渲染完整表格。

## 代码演示 {#examples}

### 基础用法

通过 `columns` 定义列，`records` 传入行数据。`rowKey` 用于生成行唯一标识（在启用行选择或分页时建议显式指定）：

<code src="./demo/usage.tsx"></code>

### 排序

列设置 `sortable` 后点击表头即可排序，方向循环为 升序 → 降序 → 升序。非受控模式（传 `defaultSortStatus`）时组件会对 `records` 做本地稳定排序；受控模式（传 `sortStatus` + `onSortStatusChange`）时组件只负责展示排序指示器与触发回调，数据排序由使用方处理：

<code src="./demo/sorting.tsx"></code>

### 行选择

设置 `selectionMode="checkbox"` 或 `"radio"` 启用行选择，表头提供全选/半选能力，选中项以行 key 数组表达：

<code src="./demo/selection.tsx"></code>

### 分页

传入 `total` 即渲染分页底栏。远端分页场景下 `records` 只传当前页数据，翻页时通过 `onPageChange` 请求新数据：

<code src="./demo/pagination.tsx"></code>

### 加载与空态

`loading` 显示遮罩；`records` 为空且非加载中时展示空态，可通过 `empty` 自定义：

<code src="./demo/states.tsx"></code>

### 固定列与横向滚动

设置 `minWidth` 后表格横向滚动，列通过 `sticky` 固定在左侧或右侧（固定列建议使用数值 px 宽度）：

<code src="./demo/stickyColumns.tsx"></code>

### 虚拟滚动

设置 `virtualized` 开启行虚拟滚动，万级数据依然流畅。建议同时设置 `maxHeight` 与 `estimatedRowHeight`：

<code src="./demo/virtualized.tsx"></code>

### 行展开

传入 `renderExpanded` 后表格首列出现展开控件，支持受控（`expandedRows`）与非受控（`defaultExpandedRows`）：

<code src="./demo/rowExpansion.tsx"></code>

### 列设置

设置 `withColumnSettings` 后表格右上角出现列设置面板，可控制各列显示/隐藏：

<code src="./demo/columnSettings.tsx"></code>

## API {#api}

### DataTableProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列定义 | `DataTableColumn<T>[]` | 必填 |
| records | 行数据，远端分页时传当前页数据 | `T[]` | `[]` |
| rowKey | 行唯一 key | `(record: T, index: number) => string` | 行索引 |
| loading | 加载中，表格区域显示遮罩 | `boolean` | `false` |
| empty | 空态内容 | `React.ReactNode` | 内置 EmptyState |
| striped | 条纹行 | `boolean` | `false` |
| highlightOnHover | 悬停高亮行 | `boolean` | `false` |
| withTableBorder | 表格边框 | `boolean` | `true` |
| withRowBorders | 行边框 | `boolean` | `true` |
| horizontalSpacing | 水平内边距 | `UISize \\| number \\| string` | `'sm'` |
| verticalSpacing | 垂直内边距 | `UISize \\| number \\| string` | `'sm'` |
| onRowClick | 行点击回调 | `(record: T, index: number) => void` | - |
| minWidth | 表格最小宽度，设置后横向滚动 | `string \\| number` | - |
| maxHeight | 表格最大高度，设置后纵向滚动 | `string \\| number` | - |
| stickyHeader | 固定表头 | `boolean` | `false` |
| virtualized | 开启行虚拟滚动 | `boolean` | `false` |
| estimatedRowHeight | 虚拟滚动行高估计值（px） | `number` | `42` |
| renderExpanded | 展开行内容渲染函数 | `(record: T, index: number) => React.ReactNode` | - |
| expandedRows | 已展开行 key 集合（受控） | `string[]` | - |
| defaultExpandedRows | 已展开行初始值（非受控） | `string[]` | - |
| onExpandedRowsChange | 已展开行变化回调 | `(keys: string[]) => void` | - |
| withColumnSettings | 显示列设置面板 | `boolean` | `false` |
| hiddenColumnKeys | 隐藏列 key 集合（受控） | `string[]` | - |
| defaultHiddenColumnKeys | 隐藏列初始值（非受控） | `string[]` | - |
| onHiddenColumnKeysChange | 隐藏列变化回调 | `(keys: string[]) => void` | - |
| sortStatus | 排序状态（受控） | `DataTableSortStatus \\| null` | - |
| defaultSortStatus | 排序状态初始值（非受控，本地排序） | `DataTableSortStatus` | - |
| onSortStatusChange | 排序状态变化回调 | `(status: DataTableSortStatus) => void` | - |
| selectionMode | 行选择模式 | `'checkbox' \\| 'radio'` | - |
| selectedKeys | 已选行 key 集合（受控） | `string[]` | - |
| defaultSelectedKeys | 已选行 key 初始值（非受控） | `string[]` | - |
| onSelectedKeysChange | 已选行变化回调 | `(keys: string[]) => void` | - |
| total | 总条数，提供后渲染分页底栏 | `number` | - |
| page | 当前页码（受控，从 1 开始） | `number` | - |
| defaultPage | 初始页码（非受控） | `number` | `1` |
| pageSize | 每页条数（受控） | `number` | - |
| defaultPageSize | 每页条数初始值（非受控） | `number` | `10` |
| onPageChange | 页码变化回调 | `(page: number) => void` | - |
| onPageSizeChange | 每页条数变化回调 | `(pageSize: number) => void` | - |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| totalText | 分页底栏左侧文案 | `(total: number) => React.ReactNode` | `共 N 条` |

支持所有原生 `div` 属性。

### DataTableColumn

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accessor | 取值字段，可排序列必须为字符串字段名 | `Extract<keyof T, string> \\| ((record: T) => any)` | 必填 |
| title | 表头标题，缺省使用 accessor | `React.ReactNode` | - |
| render | 自定义单元格渲染 | `(record: T, index: number) => React.ReactNode` | - |
| width | 列宽 | `number \\| string` | - |
| minWidth | 列最小宽度 | `number \\| string` | - |
| textAlign | 文本对齐方式 | `'left' \\| 'center' \\| 'right'` | `'left'` |
| ellipsis | 溢出省略并通过 title 提示完整内容 | `boolean` | `false` |
| sticky | 固定列方向 | `'left' \\| 'right'` | - |
| sortable | 是否可排序 | `boolean` | `false` |
| hidden | 是否隐藏 | `boolean` | `false` |
| thProps | 传递给 th 的额外属性 | `React.ThHTMLAttributes` | - |
| tdProps | 传递给 td 的额外属性 | `React.TdHTMLAttributes` | - |

## 排序模式说明 {#sorting-mode}

- **非受控**：只传 `defaultSortStatus`，组件维护排序状态并对 `records` 本地排序，适合本地数据。
- **受控**：传 `sortStatus` + `onSortStatusChange`，组件不改动数据（当前页已按服务端排序时本地重排是无操作），适合远端排序。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。

### 远端分页时排序会重新请求吗？

受控排序下组件不会自动发起请求，请在 `onSortStatusChange` 中自行触发数据请求并更新 `records`。

### 虚拟滚动与行展开可以同时使用吗？

可以，但虚拟器以数据行为虚拟单元，展开行内容的高度不计入行高测量。若两者同时使用，建议展开内容控制在稳定高度内，否则滚动定位可能出现轻微偏移。
