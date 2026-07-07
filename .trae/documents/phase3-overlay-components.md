# 丰富 react-ui 第三阶段实施计划：浮层与导航组件

## 1. Summary

第二阶段已完成 Divider、Center、Flex、Space、SimpleGrid、Badge、Blockquote、Breadcrumbs、Burger 等布局与基础展示组件，且导出、文档、Demo、lint / test / build 全部就绪。

第三阶段目标是补齐 Mantine 中**依赖 Portal + FocusTrap + 位置计算**的浮层与导航组件。这类组件是上层交互的基础，也是 Form、DataTable 等更复杂组件常依赖的容器。

## 2. Current State Analysis

### 2.1 已具备能力

-   主题系统：`MantineProvider`、`useProps`、`useStyles`、`createVarsResolver` 已就绪。
-   样式体系：CSS Modules + CSS 变量，支持 static classNames、classNames/styles 覆盖。
-   底层组件：`Portal`、`FocusTrap`、`Overlay`、`ScrollArea`、`Transition`、`UnstyledButton`、`CloseButton` 已可用。
-   测试体系：Vitest + jsdom + `@testing-library/react`。
-   构建体系：`packages/ui` 与 `packages/hooks` 均使用 Vite 构建，website 构建通过。
-   文档体系：`apps/website`（Nextra 4）已支持新组件接入。

### 2.2 已有组件

`Accordion`、`ActionIcon`、`Anchor`、`Badge`、`Blockquote`、`Breadcrumbs`、`Burger`、`Button`、`Center`、`CloseButton`、`Collapse`、`Container`、`Divider`、`Flex`、`FocusTrap`、`Group`、`Loader`、`Overlay`、`Paper`、`Portal`、`ScrollArea`、`SimpleGrid`、`Space`、`Stack`、`Text`、`Title`、`Transition`、`UnstyledButton`、`VisuallyHidden`。

### 2.3 参考源码

本地 Mantine 源码：`/Users/zhangzhengyang/Desktop/Code/react/UI/mantine-master/packages/@mantine/core/src/components/`。

## 3. Proposed Changes

### 3.1 组件清单与实现顺序

按依赖关系与实现复杂度排序：

1.  **Tooltip** — 文字提示

    -   支持 `label`、`position`、`offset`、`withArrow`、`opened`、`disabled`、`multiline`。
    -   依赖位置计算，引入 `@floating-ui/react`。
    -   文件：`packages/ui/src/components/Tooltip/Tooltip.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

2.  **Affix** — 固定定位容器

    -   支持 `position`、`zIndex`。
    -   无复杂依赖，基于 `Portal` + `Box`。
    -   文件：`packages/ui/src/components/Affix/Affix.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

3.  **Popover** — 弹出层

    -   支持 `target`、`position`、`offset`、`withArrow`、`opened`、`onChange`、`trapFocus`、`clickOutsideEvents`。
    -   依赖 `@floating-ui/react`、`FocusTrap`、`Portal`。
    -   文件：`packages/ui/src/components/Popover/Popover.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

4.  **HoverCard** — 悬停卡片

    -   支持 `target`、`position`、`offset`、`withArrow`、`openDelay`、`closeDelay`。
    -   复用 Popover 内部能力或独立实现。
    -   文件：`packages/ui/src/components/HoverCard/HoverCard.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

5.  **Menu** — 下拉菜单

    -   支持 `trigger`、`position`、`offset`、`withArrow`、`opened`、`onChange`、`loop`、`trapFocus`。
    -   依赖 `Popover`、`FocusTrap`、键盘导航。
    -   文件：`packages/ui/src/components/Menu/Menu.tsx`、`.module.css`、`.test.tsx`、`index.ts`、`MenuItem`、`MenuLabel`、`MenuDivider`。

6.  **Modal** — 模态框

    -   支持 `opened`、`onClose`、`title`、`size`、`radius`、`overlayProps`、`closeOnClickOutside`、`closeOnEscape`、`trapFocus`、`scrollAreaComponent`。
    -   依赖 `Portal`、`Overlay`、`FocusTrap`、`CloseButton`、`ScrollArea`。
    -   文件：`packages/ui/src/components/Modal/Modal.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

7.  **Drawer** — 抽屉

    -   支持 `opened`、`onClose`、`position`、`size`、`radius`、`overlayProps`、`closeOnEscape`、`trapFocus`、`scrollAreaComponent`。
    -   依赖 `Portal`、`Overlay`、`FocusTrap`、`CloseButton`、`ScrollArea`。
    -   文件：`packages/ui/src/components/Drawer/Drawer.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

8.  **Alert** — 警告提示（可选）
    -   支持 `color`、`variant`、`title`、`icon`、`withCloseButton`、`onClose`。
    -   依赖 `CloseButton`，纯展示组件。
    -   文件：`packages/ui/src/components/Alert/Alert.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

### 3.2 新增依赖

-   `@floating-ui/react`：用于 Tooltip / Popover / HoverCard / Menu 的浮层定位。
-   视实现情况可能需要 `@floating-ui/react-dom`（已被 `@floating-ui/react` 包含）。

### 3.3 组件导出

更新 `packages/ui/src/components/index.ts`，按字母顺序追加新组件导出。

### 3.4 Demo 与文档

-   在 `apps/website/demos/` 下为每个新组件创建 Demo。
-   在 `apps/website/app/components/` 下为每个新组件创建 Markdown 文档。
-   更新 `apps/website/app/components/_meta.ts` 导航配置。
-   更新 `apps/website/components/ComponentOverview.tsx` 组件概览。
-   运行 `pnpm --filter website docs:gen` 重新生成 API 文档。

### 3.5 测试

每个组件至少覆盖：

-   默认渲染与静态类名。
-   核心 props 生效（如 Tooltip 的 position、Modal 的 opened、Drawer 的 position）。
-   多态渲染（`component` prop）若适用。
-   事件/交互 props（如 Menu 的键盘导航、Modal 的关闭）。

### 3.6 全量验证

-   `pnpm lint`
-   `pnpm test:packages`
-   `pnpm build:packages`
-   `pnpm --filter website build`
-   `pnpm spellcheck`

## 4. Assumptions & Decisions

-   第三阶段重点解决**浮层定位**问题，统一使用 `@floating-ui/react` 作为位置计算引擎。
-   继续优先实现通用交互组件，暂不涉及 Form、DataTable、Charts 等复杂业务组件。
-   每个组件严格对应 Mantine 7.x API，但只保留当前项目主题系统已支持的 props。
-   若某个组件实现过复杂（如 Menu 的完整键盘导航），采用“先可用、后完善”的原则。

## 5. Out of Scope

-   不实现 Notification / Toast 系统（需要全局状态管理）。
-   不实现 Stepper、Tabs、Pagination 等数据/流程组件（第四阶段）。
-   不实现 Form 相关组件（Input、Checkbox、Select 等，第五阶段）。

## 6. Timeline

本阶段预计为一个迭代周期，完成全部 7 ~ 8 个组件（含测试、Demo、文档）及全量验证。
