# 丰富 react-ui 第一阶段实施计划：底层基建组件（修订版）

## 0. 当前进度

截至本次计划修订，以下子任务已完成：

-   **测试基础设施**：`packages/ui/package.json` 已新增 Vitest / `@testing-library/react` / jsdom 等依赖与脚本；`packages/ui/vitest.config.ts` 与 `packages/ui/src/test-setup.ts` 已创建并配置完成。
-   **Hooks 能力**：`packages/hooks/src/use-focus-trap/` 目录下已实现 `useFocusTrap`、`scope-tab.ts`、`tabbable.ts`，并在 `packages/hooks/src/index.ts` 导出。
-   **Portal 组件**：`packages/ui/src/components/Portal/Portal.tsx` 与 `Portal.test.tsx` 已实现。
-   **VisuallyHidden 组件**：`packages/ui/src/components/VisuallyHidden/VisuallyHidden.tsx`、`.module.css`、测试已实现。
-   **Paper 组件**：`packages/ui/src/components/Paper/Paper.tsx`、`.module.css`、测试已实现。
-   **Overlay 组件**：`packages/ui/src/components/Overlay/Overlay.tsx`、`.module.css`、测试已实现。
-   **CloseButton 组件**：`packages/ui/src/components/CloseButton/CloseButton.tsx`、`.module.css`、测试已实现。
-   **FocusTrap 组件**：`packages/ui/src/components/FocusTrap/FocusTrap.tsx`、测试已实现，依赖 `@react-ui/hooks` 的 `useFocusTrap` 与 `useMergedRef`。
-   **工具函数**：`getDefaultZIndex`、`getSingleElementChild` 已在 `packages/ui/src/core/utils/` 下创建并导出。
-   **组件导出补齐**：`packages/ui/src/components/index.ts` 已按字母顺序导出 `CloseButton`、`FocusTrap`、`Overlay`、`Paper`、`Portal`、`ScrollArea`、`VisuallyHidden`。
-   **ScrollArea 基础版组件**：
    -   主组件 `ScrollArea.tsx` 已实现，支持 `type="always" | "never"`、`scrollbars`、`scrollbarSize`、`offsetScrollbars`、`viewportRef`、`viewportProps`、`onScrollPositionChange`、边界回调（`onBottomReached` / `onTopReached` / `onLeftReached` / `onRightReached`）、`overscrollBehavior`、`startScrollPosition`。
    -   子组件 `ScrollAreaRoot`、`ScrollAreaViewport`、`ScrollAreaScrollbar`、`ScrollAreaThumb`、`ScrollAreaCorner` 已实现。
    -   滚动条可见逻辑 `ScrollAreaScrollbarVisible.tsx`、方向滚动条 `ScrollbarX.tsx` / `ScrollbarY.tsx`、滚动条容器 `Scrollbar.tsx` 已实现。
    -   Context `ScrollArea.context.ts`、`Scrollbar.context.ts` 已实现。
    -   `use-resize-observer.ts` 已实现。
    -   工具函数 `compose-event-handlers`、`get-scroll-position-from-pointer`、`get-thumb-offset-from-scroll`、`get-thumb-ratio`、`get-thumb-size`、`is-scrolling-within-scrollbar-bounds`、`linear-scale`、`to-int` 已创建并统一导出。
    -   样式文件 `ScrollArea.module.css` 已创建，定义了 root / viewport / scrollbar / thumb / corner 样式及 CSS 变量。
    -   类型文件 `ScrollArea.types.ts` 与统一导出 `index.ts` 已创建。

尚未完成的内容：

-   无，第一阶段已全部完成。

## 0.1 最终验证结果

-   `pnpm lint`：通过（修复 eslint 忽略 `.next` 构建产物后）。
-   `pnpm --filter @react-ui/ui test`：通过，41 个测试用例全部通过。
-   `pnpm --filter @react-ui/ui exec tsc --noEmit`：通过。
-   `pnpm spellcheck`：通过。
-   `pnpm build`：通过，`packages/hooks`、`packages/ui`、apps 均构建成功。

## 1. Summary

本阶段目标是为 react-ui 补齐 Mantine 中支撑上层组件的底层基建能力。目前已全部完成，包括 ScrollArea 组件实现、测试、Demo、文档以及全量验证。

所有组件严格遵循 react-ui 现有架构：`polymorphicFactory`/`factory` + `useStyles` + `varsResolver` + CSS Modules，并参考 Mantine 对应源码实现。

## 2. Current State Analysis

### 2.1 项目架构

-   **Monorepo**：pnpm workspace + turbo，根目录见 [`pnpm-workspace.yaml`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/pnpm-workspace.yaml)。
-   **UI 包**：`packages/ui`，入口 [`packages/ui/src/index.ts`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/ui/src/index.ts)，导出 `components` 与 `core`。
-   **组件实现模式**：以 [`Button`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/ui/src/components/Button/Button.tsx)、[`Paper`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/ui/src/components/Paper/Paper.tsx)、[`Overlay`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/packages/ui/src/components/Overlay/Overlay.tsx) 为例，使用：
    -   `polymorphicFactory` / `factory` 创建多态组件
    -   `useProps` 处理默认 props
    -   `useStyles` 统一 className/style
    -   `createVarsResolver` 解析 CSS 变量
    -   `*.module.css` 管理样式
-   **核心能力**：`Box` 提供 style props 与多态渲染；`MantineProvider` 提供主题；`styles-api` 提供类名/样式解析。
-   **已具备的内部能力**：
    -   `@react-ui/hooks` 提供 `useFocusTrap`、`useMergedRef`、`useIsomorphicEffect`、`assignRef` 等。
    -   `core/utils` 提供 `createSafeContext`、`getDefaultZIndex`、`getSize`、`getRadius`、`getShadow`、`rem`、`rgba` 等。

### 2.2 已有组件

`Button`、`UnstyledButton`、`Accordion`、`Loader`、`Transition`、`Collapse`、`ActionIcon`、`Text`、`Title`、`Anchor`、`Stack`、`Group`、`Container`、`Portal`、`VisuallyHidden`、`Paper`、`Overlay`、`CloseButton`、`FocusTrap`、`ScrollArea`。

### 2.3 测试现状

-   `packages/ui/package.json` 已配置 Vitest、`@testing-library/react`、jsdom 等 devDependencies，并已新增 `"test": "vitest run"`、`"test:watch": "vitest"` 脚本。
-   `packages/ui/vitest.config.ts` 已创建，配置 jsdom 环境、`@vitejs/plugin-react`、`test-setup.ts` 与 CSS 支持。
-   `packages/ui/src/test-setup.ts` 已导入 `@testing-library/jest-dom` 断言扩展。
-   现有测试模式：所有组件测试均通过 `MantineProvider` 包裹渲染，断言静态类名、属性转发、多态渲染、事件回调等。

### 2.4 参考源码

Mantine 本地源码位于 `/Users/zhangzhengyang/Desktop/Code/react/UI/mantine-master/packages/@mantine/core/src/components/ScrollArea/`，本次实现已参考其主要结构与交互逻辑。

## 3. Proposed Changes

### 3.1 新增组件测试：ScrollArea

**涉及文件**：

-   `packages/ui/src/components/ScrollArea/ScrollArea.test.tsx`

**测试策略**：

-   使用 `MantineProvider` 包裹渲染。
-   由于 jsdom 中 `ResizeObserver` 与指针拖拽行为有限，测试重点放在可稳定验证的行为上：
    -   默认渲染：包含 viewport、content、自定义滚动条（xy 方向）。
    -   `type="never"`：不渲染滚动条。
    -   `scrollbars="x"` / `"y"`：只渲染对应方向滚动条。
    -   `scrollbarSize`：通过 CSS 变量或样式断言生效。
    -   `viewportRef`：正确指向 viewport DOM 节点。
    -   `onScrollPositionChange`：滚动时回调被调用并返回正确坐标。
    -   `onBottomReached` / `onTopReached` / `onLeftReached` / `onRightReached`：滚动到边界时触发。
    -   `startScrollPosition`：初始化时滚动到指定位置。
    -   静态类名：`mantine-ScrollArea-root`、`mantine-ScrollArea-viewport` 等。

### 3.2 新增文档站 Demo

**涉及文件**：

-   新建 `apps/docs/src/demos/ScrollArea.tsx`
    -   展示固定高度内容滚动、水平滚动、`type="never"`、`scrollbarSize` 等用法。
-   更新 [`apps/docs/src/registry.tsx`](file:///Users/zhangzhengyang/Desktop/Code/react/UI/react-ui/apps/docs/src/registry.tsx)
    -   导入 `ScrollAreaDemo` 并追加 `{ name: 'ScrollArea', demos: [{ title: '示例', component: ScrollAreaDemo }] }`。

### 3.3 新增站点文档

**涉及文件**：

-   新建 `apps/website/docs/components/scroll-area.md`
    -   说明 ScrollArea 基础版 API、实现要点、与 Mantine 的差异（仅支持 `type="always"` / `type="never"`，暂不支持 hover/scroll/auto 与 Autosize）。

### 3.4 全量验证

-   运行依赖安装：`pnpm install`
-   运行类型检查：`pnpm --filter @react-ui/ui exec tsc --noEmit`
-   运行代码检查：`pnpm lint:es`、`pnpm lint:style`、`pnpm spellcheck`
-   运行测试：`pnpm --filter @react-ui/ui test`
-   运行构建：`pnpm build`
-   文档站验证：`pnpm --filter docs dev`（或对应脚本）

## 4. Assumptions & Decisions

| 决策项          | 选择                                                                             | 理由                                                                    |
| --------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| ScrollArea 范围 | 基础版仅实现 `type="always"` / `type="never"`                                    | 降低当前阶段复杂度，避免阻塞 Modal/Drawer；hover/scroll/auto 作为增强版 |
| 子组件拆分      | 参考 Mantine 拆分为 Root/Viewport/Scrollbar/Thumb/Corner                         | 结构清晰，便于后续扩展                                                  |
| 测试范围        | 聚焦渲染、props、ref、滚动回调与边界回调                                         | jsdom 对 ResizeObserver 与指针拖拽支持有限，避免不稳定断言              |
| 深色模式        | 滚动条颜色使用固定半透明色                                                       | react-ui 主题系统深色模式支持待后续完善                                 |
| 文档沉淀        | 创建 `apps/website/docs/components/scroll-area.md` + 更新 `apps/docs/src/demos/` | 与已有组件文档模式保持一致                                              |

## 5. Verification Steps

1. **依赖安装**：运行 `pnpm install`，确保无 lockfile 冲突。
2. **类型检查**：运行 `pnpm --filter @react-ui/ui exec tsc --noEmit`，无类型错误。
3. **代码检查**：
    - `pnpm lint:es`
    - `pnpm lint:style`
    - `pnpm spellcheck`
4. **测试验证**：运行 `pnpm --filter @react-ui/ui test`，所有新增与已有测试通过。
5. **构建验证**：运行 `pnpm build`，确保 `packages/ui` 与 `packages/hooks` 构建通过。
6. **文档站验证**：运行 `pnpm --filter docs dev`（或对应脚本），新组件 Demo 正常展示。
7. **文档完整性**：检查 `apps/website/docs/components/scroll-area.md` 已创建。

## 6. 实施顺序建议

按以下顺序实现，每完成一项即运行对应 lint + test：

1. 编写 `packages/ui/src/components/ScrollArea/ScrollArea.test.tsx`。
2. 创建 `apps/docs/src/demos/ScrollArea.tsx` 并更新 `apps/docs/src/registry.tsx`。
3. 创建 `apps/website/docs/components/scroll-area.md`。
4. 全量 lint + 测试 + 构建验证。

## 7. 风险与注意事项

-   **React 版本**：react-ui 使用 React 19.1.1，Mantine 参考源码为 v9.4.1（React 19.2.x），API 基本一致，但 `useEffectEvent` 已不可用，已替换为 `useRef` 方案。
-   **CSS Modules 与 SCSS**：Mantine 部分组件使用 SCSS mixins，react-ui 使用纯 CSS，已转换为普通 CSS 变量或固定色值。
-   **ScrollArea 复杂度**：自定义滚动条涉及大量 DOM 操作与事件处理，基础版优先保证 `type="always"` 可用，不追求与 Mantine 100% 一致。
-   **测试覆盖**：ResizeObserver 与指针拖拽在 jsdom 中行为有限，测试重点放在渲染、类名、viewport ref、onScrollPositionChange 回调与滚动边界回调。
