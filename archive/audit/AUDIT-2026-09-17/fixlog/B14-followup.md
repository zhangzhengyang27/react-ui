# B14 横切批(components 侧 8 条)补修日志

修复人:修复工程师(B14 批次补修,② RTL 与 ③ 暗色变量两节)。日期:2026-09-17。
仓库:/Users/zhangzhengyang/Desktop/PROJECT/react-ui(工作树,未 commit/push)。

## 修复范围说明

本日志覆盖 B14 报告 ② RTL 全扫(B14-1 ~ B14-5)与 ③ 暗色变量全扫(B14-6 ~ B14-8)中位于 `packages/ui/src/components/` 的 8 条;① SSR(B14-T1)与 ⑤ apps/docs 侧(B14-9 ~ B14-11)不在本批范围。

## 测试总况

- 命令:`cd packages/ui && npx vitest run src/components/Tree src/components/Carousel src/components/Menu src/components/Menubar src/components/List src/components/DataTable src/components/Table src/components/Descriptions src/components/Stepper src/components/Checkbox src/components/Radio src/components/Chip src/components/Tabs src/components/Transfer src/components/Cascader src/components/Upload`(node v22.12.0)
- 结果:**16 个测试文件 / 116 用例全部通过**。
- 本批改动 tsx 文件 `tsc --noEmit -p tsconfig.json` 过滤检查(TreeNode/FlatTreeNode/Carousel/MenuSubTarget/MenubarTarget/MenubarDropdown):**0 错误**(仓库存量 TS 错误非本批引入)。中途发现 MenubarDropdown.tsx 曾误用 `../../core` 相对路径(components/ 下无 core 目录),已纠正为 `../../../core` 并复跑通过。

## 修复明细

| 单号 | 状态 | 改动文件与要点 | 测试结果 |
| --- | --- | --- | --- |
| B14-1 | 已修 | `components/Tree/TreeNode.tsx`、`components/Tree/FlatTreeNode.tsx`:两处 keydown 接入 `useDirection()`(经 `../../core` 导出),以 `expandKey/collapseKey` 变量替代硬编码——RTL 下展开/进入为 ArrowLeft、收起/返回为 ArrowRight(WAI-ARIA APG tree 模式),与 Tree.module.css 已用的 `padding-inline-start`/`border-inline-start` 逻辑属性视觉方向对齐;FlatTreeNode 为 memo 组件,hook 正常生效 | Tree 测试通过(方向键用例 LTR 语义不变) |
| B14-2 | 已修 | `components/Carousel/Carousel.tsx`(ui 包副本,经 components/index.ts 从 @xiaoye-react/ui 导出):①`useEmblaCarousel` options 增 `direction: orientation === 'horizontal' ? dir : undefined`(embla `AxisDirectionOptionType = 'ltr' \| 'rtl'`,与 useDirection 的 Direction 精确匹配),RTL 下滚动方向/拖拽翻转,对照 packages/@xiaoye-react/carousel/src/Carousel.tsx:225-230 已修副本;②handleKeydown 水平方向键按 dir 互换(nextKey/prevKey),垂直方向仍 Up/Down,依赖数组补 `dir` | Carousel 测试通过(LTR 键位不变) |
| B14-3 | 已修 | `components/Menu/MenuSubTarget.tsx`:子菜单开/关键改为 `openKey = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight'`(关闭键对称互换)——子菜单经 Popover 的 `getFloatingPosition` 已随 dir 翻转弹出方向,键位对齐;`components/Menubar/MenubarTarget/MenubarTarget.tsx`、`components/Menubar/MenubarDropdown/MenubarDropdown.tsx`:横向 roving 的 `forwardKey/backKey` 均改为随 dir 互换(RTL 下视觉上的「下一个」在左侧) | Menu + Menubar 测试通过(LTR 键位不变) |
| B14-4 | 已修 | `components/List/List.module.css`:`.root[data-with-padding]` 的 `padding-left` → `padding-inline-start`(嵌套缩进)、`[data-native-markers] .item` 的 `margin-left` → `margin-inline-start`(原生 marker 间距)、`.itemIcon` 的 `margin-right` → `margin-inline-end`(图标与内容间距)——列表 marker/图标属 start/end 方向语义,RTL 下整体翻到起始侧 | List 测试通过 |
| B14-5 | 已修 | 逐文件核对工作树,本批 6 个文件全部仍有残留,均改逻辑属性:`DataTable/DataTable.module.css`(.th/.td `text-align: left` → `start`;`[data-sticky-last='left']` 的 `border-right` → `border-inline-end`、`[data-sticky-last='right']` 的 `border-left` → `border-inline-start`;`.footerControls` `margin-left: auto` → `margin-inline-start: auto`,同属物理属性漏网)、`Table/Table.module.css`(column-borders 的 `border-right`/`last-child border-right: 0` → `border-inline-end`;.th 与 .caption `text-align: left` → `start`)、`Descriptions/Descriptions.module.css`(.label/.value `text-align: left` → `start`)、`Stepper/Stepper.module.css`(.step 与 vertical .stepBody `text-align: left` → `start`)、`Checkbox/Checkbox.module.css` 与 `Radio/Radio.module.css`(.required 星号 `margin-left` → `margin-inline-start`) | 各组件测试通过 |
| B14-6 | 已修 | `components/Chip/Chip.module.css`:`background-color: var(--ui-color-default-bg)`(全库未定义、invalid at computed-value time → 恒透明)→ `var(--ui-color-default)`(resolver light=white/dark=dark-6,随主题切换),与 Input(`--input-bg: var(--ui-color-default)`)、EmptyState 同族 default 背景来源对齐,未选中 filled 默认 variant 恢复有底色 | Chip 测试 5/5 通过 |
| B14-7 | 已修 | `components/Tabs/Tabs.module.css`:`--tabs-bd: 1px solid var(--ui-primary-color-outline)` → `var(--ui-color-primary-outline)`——`--ui-primary-color-*` 家族(resolver:filled/filled-hover/light/light-hover/light-color/contrast/0-9)无 outline 成员,而 `--ui-color-{name}-outline` 由 get-css-color-variables.ts:35/68 对含 primary 在内的一切颜色产出,`--tabs-bd` 链式失效解除,outline variant 分隔边框不再回落 currentColor | Tabs 测试通过 |
| B14-8 | 已修 | `--ui-default-radius` → `--ui-radius-default`(规范名,resolver:39 `'--ui-radius-default': defaultRadius`)共 6 处:`DataTable/DataTable.module.css`:124、163(expandButton/columnSettingsButton)、`Transfer/Transfer.module.css`:17(panel)、`Cascader/Cascader.module.css`:27、92(columnItem/searchItem)、`Dropzone/Upload/Upload.module.css`:16(fileItem)——消费方自定义 `theme.defaultRadius` 时这 6 处圆角恢复跟随;改后全库 grep `ui-default-radius` 0 残留 | DataTable/Transfer/Cascader/Upload 测试通过 |

## 遗留说明

- B14 报告 ② 节「低危不登记」项(Combobox use-pills-reorder / MultiSelect Alt+左右键胶囊重排未接 dir)按报告结论未改动。
- DataTable 吸附列(`column.sticky: 'left' | 'right'` 与内联 `left:`/`right:` 偏移)本身属物理命名 API(与 Affix/Drawer position 同类,报告列为不立项),本批仅按建议将分隔边框改逻辑属性,吸附定位 API 保持物理语义。
