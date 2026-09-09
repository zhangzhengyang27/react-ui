# 组件库管理端倾斜计划（Admin Roadmap）

> 目标：从「C 端优先的通用库」转向「管理端优先、兼容 C 端」。
> 衡量标准：搭建一个典型中后台页面（列表页 / 表单页 / 详情页 / 仪表盘）时，**不再需要业务侧自建任何组件**。

> **进度（2026-09-10）**：
> - ✅ M1 完成：DataTable MVP + Cascader（组件、单测 23 个、文档页与示例）。
> - ✅ M2 提前完成：DataTable 虚拟滚动（@tanstack/react-virtual）、行展开、列设置面板（单测累计 22 个）。
> - ✅ P1 完成：Descriptions（6 单测）、Transfer（8 单测）、Upload（dropzone 包，11 单测），文档与示例齐备。
> - ✅ P2 完成：新包 `@xiaoye-react/pro`（PageContainer / SearchFilter / ProTable，17 单测），三种 CRUD 模板（Modal 编辑 / Drawer 编辑 / 主从详情）进文档；ui 510 / dropzone 61 / pro 17 全部通过。
> - ✅ 文档首页已增加「管理端方案」入口（生态区卡片，中英双语）。
> - 后续可选：pro 包接入统一发版流程；a11y 增强（DataTable 键盘行导航、Cascader 方向键）。

## 一、现状盘点

### 已具备（管理端可用，无需大动）

| 能力 | 载体 | 状态 |
| --- | --- | --- |
| 表单系统 | `@xiaoye-react/form`：use-form / use-field / validators / schema-resolver（standard-schema，兼容 zod/valibot）/ lists 动态表单项 | ✅ 完整 |
| 日期选择 | `@xiaoye-react/dates`：DatePicker / Calendar / TimePicker / Month·YearPicker 全家桶 | ✅ 完整 |
| 后台骨架 | `AppShell`、`Breadcrumbs`、`NavLink`、`Tabs`、`Pagination`、`Stepper` | ✅ 完整 |
| 仪表盘 | `@xiaoye-react/charts`（recharts 封装）：Bar/Line/Area/Pie/Donut/Radar 等 | ✅ 可用 |
| 反馈 | `Notifications`、`Modal`/`Drawer`、`LoadingOverlay`、`Skeleton`、`EmptyState` | ✅ 完整 |
| 文件投放区 | `@xiaoye-react/dropzone`（Dropzone / DropzoneFullScreen） | ⚠️ 只解决「拖入」，无上传管理 |
| 大数据渲染 | `@tanstack/react-virtual` 已在文档 demo 中验证（Combobox/Tree 虚拟化） | ⚠️ 非库级依赖 |

### 缺口（本计划要补的）

1. **数据表格**：`Table` 仅是展示型（Thead/Tbody/Td），无排序 / 筛选 / 行选择 / 行展开 / 虚拟滚动 / 列管理 —— 中后台第一大缺口。
2. **Cascader 级联选择**：无。
3. **Transfer 穿梭框**：无。
4. **Upload 上传**：dropzone 只有投放区，无文件列表、受控 value、上传进度/状态管理。
5. **Descriptions 描述列表**：`DataList` 是 dl/dt/dd 语义的轻组件，缺 bordered / columns / colspan 的 antd 式 Descriptions。
6. **页面模式层**：无搜索区 / 列表页 / PageHeader 等模式封装，每个后台项目都要重搭一遍。

## 二、总体策略

**分层放置，复用优先，不重写已有组件。**

- `packages/ui`（主包）：放**基础数据组件** —— DataTable、Cascader、Transfer、Descriptions。与现有组件同等风格（CSS Modules + `--ui-*` 变量 + factory/varsResolver），保持主包「一套主题全覆盖」的承诺。
- `packages/@xiaoye-react/pro`（新包）：放**页面模式层** —— ProTable、PageContainer、SearchFilter、CRUD 模板。允许依赖 ui + hooks，独立发版，避免主包膨胀。
- 复用清单：行选择勾选逻辑复用 `Tree` 的 `is-node-checked / get-all-checked-nodes / is-node-indeterminate`；Cascader 复用 `Combobox` + `filter-tree-data`；Transfer 复用 `Checkbox` + `use-list-state`；ProTable 数据请求复用 hooks 包的 `use-fetch`；导出复用 `use-clipboard`；空态/加载复用 `EmptyState`/`LoadingOverlay`。
- `Table` 保持展示型组件不动，`DataTable` 是基于它的独立封装，二者并存。
- 不引入 CSS-in-JS；不引入新样式方案。

## 三、分期计划

### P0：DataTable 数据表格（第 1–6 周）

**M1 — MVP（第 1–3 周）**

- 列定义 API：`accessor` / `render` / `width` / `textAlign` / `ellipsis` / `sticky`（左右固定列，基于现有 TableScrollContainer + ScrollArea）。
- 排序：受控 + 非受控，单列，表头点击 + 排序指示器。
- 行选择：checkbox / radio 两种模式，表头全选 + 半选态（复用 Tree 勾选工具函数）。
- 分页：底栏接 `Pagination`，受控 `page` / `onPageChange`，支持 pageSize 切换。
- 状态：`loading`（LoadingOverlay）、`empty`（EmptyState 可自定义）、斑马纹 / 行 hover / `onRowClick`。

验收：文档 demo 覆盖全部能力；vitest 覆盖排序/选择/分页交互；万级数据不开虚拟也流畅。

**M2 — 进阶（第 4–6 周）**

- 虚拟滚动：引入 `@tanstack/react-virtual` 作为 ui 包依赖（demo 已验证过，先例充分），与 ScrollArea 集成，保证固定列在虚拟化下不错位。
- 行展开（受控 + 非受控）。
- 列显示/隐藏 + 列设置面板（Popover + Checkbox）。
- 多列排序（可选，视需求）。
- 工具栏：刷新 / 导出 CSV（clipboard + Blob 下载）。

验收：10 万行滚动流畅；固定列与展开行无跳动；a11y（方向键行导航、aria-sort）。

### P1：管理端基础组件补齐（第 5–8 周，可与 M2 并行）

| 组件 | 要点 | 复用 |
| --- | --- | --- |
| Cascader | 单选/多选、任意层级、`loadData` 懒加载、可搜索、浮层由 Combobox 承载 | Combobox、filter-tree-data |
| Transfer | 左右面板、搜索、全选、受控 `value`；二期加拖拽排序 | Checkbox、use-list-state |
| Upload（增强 dropzone 包） | 文件列表（FileList）、受控 value、`beforeUpload`、上传进度/成功/失败状态、手动上传 ref API | dropzone、Progress |
| Descriptions | bordered / columns 响应式 / `colspan`，与 DataList 并存不合并 | 新组件，风格对齐 DataList |

验收：每个组件补齐 中英双语文档（沿用 `docs/<category>/<component>.zh-CN.md` + demos 约定）与 vitest。

### P2：模式层 `@xiaoye-react/pro`（第 7–10 周）

- `PageContainer` / `PageHeader`：标题、面包屑、操作区、extra 的页面骨架。
- `SearchFilter`：基于 form 包的查询区（字段栅格、展开/收起、查询/重置）。
- `ProTable`：DataTable + SearchFilter + 工具栏 + `use-fetch` 请求编排（自动首查、刷新、loading、分页参数透传）。
- CRUD 页面模板：文档站「管理端场景」分区提供 3 个端到端模板（列表+Drawer 编辑、列表+Modal 编辑、主从详情）。

验收：新建一个标准列表页，业务代码只需列配置 + 请求函数（内部口径：从约 3 天降至 0.5 天）。

### P3：体验与配套（贯穿全程）

- a11y：DataTable 键盘行导航、Cascader 方向键、Transfer 焦点管理。
- 深色模式 / RTL：新组件全部走 `--ui-*` 变量，主题系统免费获得。
- 测试：组件级 vitest 必配；DataTable / ProTable 增加 Playwright 截图回归（repo 已引入 @playwright/test）。
- 性能：列 render 函数稳定引用、单元格 memo、虚拟化固定列的测量策略。
- 文档：首页增加「管理端方案」入口，串联 ProTable → 模板页；README 与文档首页明确声明「纯 CSR 组件库，不支持 SSR」。

## 四、里程碑

| 里程碑 | 时间 | 交付 | 出口标准 |
| --- | --- | --- | --- |
| M1 | 第 3 周末 | DataTable MVP + Cascader | 典型列表页 100% 用库内组件搭出 |
| M2 | 第 8 周末 | 虚拟滚动 + Transfer / Upload / Descriptions | 后台常用组件零自建 |
| M3 | 第 10 周末 | pro 包模式层 + 3 个页面模板 | 列表页搭建 ≤ 0.5 天 |
| 发版 | 随里程碑 | ui 1.x minor；pro 0.x 起步 | 沿用现有 publish 流程 |

> 排期基准：单人全职，串行推进。

## 五、已拍板的决策（2026-09-09）

1. **包归属**：基础 DataTable 进主包 `ui`；ProTable / SearchFilter / PageContainer 进新包 `@xiaoye-react/pro`。
2. **虚拟化依赖**：`@tanstack/react-virtual` 进 ui 包 dependencies，DataTable 直接内置虚拟滚动。
3. **Upload 归属**：进 `dropzone` 包（FileList / 受控 value / 上传进度），不进主包。
4. **SSR 定位**：**不支持 SSR，纯 CSR 组件库**。无需做 Next.js 兼容性摸底；实现可放开使用浏览器 API，但在文档首页与 README 明确声明 CSR 定位，避免用户误用。
5. **人力**：单人全职，按原节奏 10 周串行推进 P0 → P2。
