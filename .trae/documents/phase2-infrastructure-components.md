# 丰富 react-ui 第二阶段实施计划：布局与基础展示组件

## 1. Summary

第一阶段已完成 Portal、VisuallyHidden、Paper、Overlay、CloseButton、FocusTrap、ScrollArea 等底层基建组件，且 lint / test / build 全部通过。

第二阶段目标是补齐 Mantine 中**无复杂外部依赖、支撑上层交互组件、使用频率高**的布局与基础展示原子组件。本阶段共计划实现 **8 个组件**：Divider、Center、Flex、SimpleGrid、Space、Badge、Blockquote、Breadcrumbs，以及可选的 Burger（若时间允许）。

所有组件继续沿用 react-ui 现有架构：`factory` / `polymorphicFactory` + `useProps` + `useStyles` + `varsResolver` + CSS Modules，并参考 `/Users/zhangzhengyang/Desktop/Code/react/UI/mantine-master/packages/@mantine/core/src/components/` 对应源码实现。

## 2. Current State Analysis

### 2.1 已具备能力

-   主题系统：`MantineProvider`、`useProps`、`useStyles`、`createVarsResolver` 已就绪。
-   样式体系：CSS Modules + CSS 变量，支持静态类名、类名覆盖、样式覆盖。
-   测试体系：Vitest + jsdom + `@testing-library/react`，所有组件测试均通过 `MantineProvider` 包裹渲染。
-   构建体系：`packages/ui` 与 `packages/hooks` 均使用 Vite 构建，apps 构建通过。
-   文档体系：`apps/docs`（Vite 示例）+ `apps/website`（Nextra 文档）已支持新组件接入。

### 2.2 已有组件

`Accordion`、`ActionIcon`、`Anchor`、`Button`、`CloseButton`、`Collapse`、`Container`、`FocusTrap`、`Group`、`Loader`、`Overlay`、`Paper`、`Portal`、`ScrollArea`、`Stack`、`Text`、`Title`、`Transition`、`UnstyledButton`、`VisuallyHidden`。

### 2.3 参考源码

本地 Mantine 源码：`/Users/zhangzhengyang/Desktop/Code/react/UI/mantine-master/packages/@mantine/core/src/components/`。

## 3. Proposed Changes

### 3.1 组件清单与实现顺序

按依赖关系与实现复杂度排序：

1.  **Divider** — 分隔线

    -   支持 `orientation`、`size`、`label`、`labelPosition`、`color`、`variant`。
    -   无外部依赖，纯样式组件。
    -   文件：`packages/ui/src/components/Divider/Divider.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

2.  **Center** — 居中容器

    -   支持 `inline` 控制行内/块级居中。
    -   无外部依赖，基于 `Box`。
    -   文件：`packages/ui/src/components/Center/Center.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

3.  **Flex** — 弹性布局

    -   支持 `gap`、`rowGap`、`columnGap`、`align`、`justify`、`wrap`、`direction`、`basis`、`grow`、`shrink` 等 flex 属性。
    -   依赖 Mantine 的 spacing/size token 解析，复用 `getSize` / `rem`。
    -   文件：`packages/ui/src/components/Flex/Flex.tsx`、`.module.css`、`.test.tsx`、`index.ts`、`flex-props.ts`。

4.  **Space** — 空白占位

    -   支持 `w`、`h` 控制宽高。
    -   基于 `Box`，无外部依赖。
    -   文件：`packages/ui/src/components/Space/Space.tsx`、`.test.tsx`、`index.ts`。

5.  **SimpleGrid** — 简化网格

    -   支持 `cols`、`spacing`、`verticalSpacing`、`type`（responsive breakpoints）。
    -   依赖 CSS Grid 与 `getSize`。
    -   文件：`packages/ui/src/components/SimpleGrid/SimpleGrid.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

6.  **Badge** — 徽章

    -   支持 `variant`、`color`、`size`、`radius`、`leftSection`、`rightSection`、`fullWidth`、`circle`。
    -   依赖 CloseButton（可选右侧关闭区域），依赖 Loader/Transition 可延后。
    -   文件：`packages/ui/src/components/Badge/Badge.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

7.  **Blockquote** — 引用块

    -   支持 `color`、`icon`、`cite`、`radius`。
    -   无复杂依赖，纯展示组件。
    -   文件：`packages/ui/src/components/Blockquote/Blockquote.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

8.  **Breadcrumbs** — 面包屑

    -   支持 `separator`、`separatorMargin`、`children`。
    -   依赖 `Text` / `Anchor` 作为子项渲染，无复杂状态。
    -   文件：`packages/ui/src/components/Breadcrumbs/Breadcrumbs.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

9.  **Burger**（可选）— 汉堡菜单按钮
    -   支持 `opened`、`size`、`color`、`transitionDuration`。
    -   无外部依赖，基于 `UnstyledButton`。
    -   文件：`packages/ui/src/components/Burger/Burger.tsx`、`.module.css`、`.test.tsx`、`index.ts`。

### 3.2 组件导出

更新 `packages/ui/src/components/index.ts`，按字母顺序追加新组件导出。

### 3.3 Demo 与文档

-   在 `apps/docs/src/demos/` 下为每个新组件创建 Demo（或合并为“第二阶段组件”Demo 页面）。
-   更新 `apps/docs/src/registry.tsx`，注册新组件示例。
-   在 `apps/website/docs/components/` 下为每个新组件创建 Markdown 文档，说明 API 与基础用法。

### 3.4 测试

每个组件至少覆盖：

-   默认渲染与静态类名。
-   核心 props 生效（如 Divider 的 orientation、Badge 的 color/variant、Flex 的 gap/justify）。
-   多态渲染（`component` prop）若适用。
-   事件/交互 props（如 Burger 的 onClick）。

### 3.5 全量验证

-   `pnpm lint`
-   `pnpm --filter @react-ui/ui test`
-   `pnpm --filter @react-ui/ui exec tsc --noEmit`
-   `pnpm spellcheck`
-   `pnpm build`

## 4. Assumptions & Decisions

-   继续优先实现**纯展示/布局组件**，暂不涉及 Form、Overlay、Popover 等需要复杂状态管理的组件。
-   每个组件严格对应 Mantine 7.x API，但只保留当前项目主题系统已支持的 props；暂不支持 `vars`、`classNames`、`styles` 以外的样式覆盖方式。
-   Demo 与文档采用“先可用、后完善”的原则，每个组件至少包含一个基础示例。
-   若实现过程中发现某个组件依赖未实现的能力（如 Burger 可能需要更精细的动画 token），优先简化实现，而非引入新依赖。

## 5. Out of Scope

-   不实现 Modal / Drawer / Popover / Tooltip 等需要 Portal + FocusTrap + 位置计算的上层组件（第三阶段）。
-   不实现 Form 相关组件（Input、Checkbox、Select 等）。
-   不实现需要复杂 hooks（如 `useFloating`、`useCombobox`）的组件。

## 6. Timeline

本阶段预计为一个迭代周期，完成全部 8 个组件（含测试、Demo、文档）及全量验证。
