# @xiaoye-react/pro

> 小叶的 React 管理端页面模式层：`PageContainer` / `SearchFilter` / `ProTable`，基于 [@xiaoye-react/ui](https://www.npmjs.com/package/@xiaoye-react/ui) 构建的开箱即用中后台列表页方案。

## 简介

`@xiaoye-react/pro` 把管理端列表页的公共骨架（查询区 + 工具栏 + 数据表格 + 分页）封装成一个 `request` 属性即可驱动的组件：

- **ProTable**：DataTable + 查询区 + 工具栏 + 分页的整合。给一个 `request` 函数，分页/搜索/排序变化时自动重新请求，loading 与空态内置；`actionsRef` 暴露 `refresh()` 供增删改后手动刷新
- **SearchFilter**：基于 `@xiaoye-react/form` 的查询区，字段栅格、展开/收起、查询/重置
- **PageContainer**：页头（标题/面包屑/操作区）+ 内容容器的页面骨架

## 环境要求

- React 19（peer 与 `@xiaoye-react/ui` 一致）
- 需同时安装 peer 包：`@xiaoye-react/ui`（^3.0.0）与 `@xiaoye-react/hooks`

## 安装

```bash
pnpm add @xiaoye-react/pro @xiaoye-react/ui @xiaoye-react/hooks
```

## 使用

```tsx
import { UIProvider } from '@xiaoye-react/ui'
import { ProTable } from '@xiaoye-react/pro'
import '@xiaoye-react/ui/style.css'
import '@xiaoye-react/pro/style.css'

type User = { id: string; name: string }

function UsersPage() {
    return (
        <UIProvider>
            <ProTable<User>
                columns={[
                    { accessor: 'name', title: '姓名' },
                ]}
                request={async ({ page, pageSize, search }) => {
                    const res = await fetch(
                        `/api/users?page=${page}&pageSize=${pageSize}&name=${search?.name ?? ''}`,
                    )
                    const json = await res.json()
                    return { records: json.list, total: json.total }
                }}
            />
        </UIProvider>
    )
}
```

`request` 的入参是 `{ page, pageSize, search?, sortStatus? }`，返回 `{ records, total }`——对接任何后端分页协议都只需要这一层适配。

## License

MIT
