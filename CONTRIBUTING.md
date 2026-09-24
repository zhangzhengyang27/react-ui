# 贡献指南

单人维护的仓库，但门禁、规范和发布流程都按"外人也能接手"的标准写在这里——包括未来的你自己和 AI 协作者。

## 环境

- Node 22（本机走 nvm：`export PATH="$HOME/.nvm/versions/node/v22.15.0/bin:$PATH"`）
- pnpm 9.12.3（版本锁定在根 `package.json` 的 `packageManager` 字段）
- `pnpm install`

## 日常命令

```bash
pnpm dev            # 全 workspace 并行 dev
pnpm build:packages # 构建所有包
pnpm test:packages  # 全部单测（vitest）
```

## 提交前必须全绿的门禁

与 CI（`.github/workflows/ci.yml`）完全一致，本地跑过的 CI 一定过：

| 命令 | 说明 |
| --- | --- |
| `pnpm lint` | eslint（**`--max-warnings` 是棘轮，只允许调低**）+ stylelint + spellcheck |
| `pnpm typecheck` | ui + hooks + docs demos 三套配置 |
| `pnpm build:packages` | 产物构建 |
| `pnpm check:exports` | 校验包导出指向真实文件，**必须在 build 之后跑** |
| `pnpm docs:lint` | 文档导入 / demo 控制项 / API 表逐行核对，同样依赖构建产物 |
| `pnpm test:packages` | 全部单测 |
| `pnpm e2e:interactions` | 24 条真实浏览器交互用例（需要 chromium：`pnpm exec playwright install chromium`） |

两条对本地环境的历史教训：`docs:lint` 的 api-tables 解析跨包继承要靠 hooks 的构建产物类型；`e2e:interactions` 启动前会校验 4175 端口上是 harness 本尊（防别的程序占端口跑出满屏 not found）。

## 提交规范

- commitlint（config-conventional）+ cz-git，直接 `pnpm commit` 交互式生成
- subject 用中文一句话讲清"为什么"，type 按 conventional（feat / fix / docs / refactor / perf / test / build / ci / chore / revert）
- 直接提交 main（单人仓）。推送前保持 `git status --porcelain` 为空、与 `origin/main` 对齐——这也是发布预检的前提

## 新增一个组件

1. `packages/ui/src/components/<Name>/`：组件 + `<Name>.module.css`（CSS Modules + `--ui-*` 变量，**不引入 CSS-in-JS**）+ factory / StylesApi，形状对齐现有组件（如 `Button`）
2. 导出进对应 `index.ts`，`pnpm check:exports` 确认公开面没有"只有类型没有运行时"的导出
3. 单测放同目录 `*.test.tsx`（vitest + testing-library）；触及 jsdom 盲区（pointer 命中、事件顺序、transitionend）的补 `e2e/interactions` 用例
4. 文档：`apps/docs/components/<name>/index.zh-CN.md` + `demo/`。**API 表的每一行都必须能在类型里找到**（`docs:lint` 会逐行核对，跨包继承的成员依赖 hooks 构建产物），demo 控制项引用的 prop 名也会被核对

## 债务政策

- lint 棘轮与 exhaustive-deps 台账只许调低；"故意不修"的理由必须留在 `eslint.config.mjs` 的注释里，不留注释的豁免会被清掉
- 裁决原则（两轮全量审计沉淀）：**测试显式编码的行为 > 审查者直觉**；争议项写「待裁决」，不进正式问题单。见 `archive/audit/`（可复用的 12 条逐文件审查清单在 `archive/audit/AUDIT-2026-09-17/CHECKLIST.md`）

## 发布

见根 README「发布流程」：`scripts/release.mjs` 三档命令（preflight / check / publish），顺序固定 hooks → ui → pro。版本号手工改，不用 changesets。
