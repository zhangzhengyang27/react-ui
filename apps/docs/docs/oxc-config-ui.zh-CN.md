---
title: oxc 配置
order: 13
---

# ReactUI oxc 配置

[oxc-config-ui](https://github.com/react-ui-org/oxc-config-ui)
是一组用于 ReactUI 项目的 [oxc](https://oxc.rs) 配置，包含
[oxlint](https://www.npmjs.com/package/oxlint)（代码检查器）和
[oxfmt](https://www.npmjs.com/package/oxfmt)（代码格式化工具）。
你可以在自己的项目中使用它，以确保代码遵循与 ReactUI 相同的风格和约定。

## 安装

一起安装 `oxc-config-ui`、`oxlint` 和 `oxfmt`：

```bash
pnpm add -D oxlint oxfmt oxc-config-ui
```

## oxlint 配置

在项目根目录创建一个 `oxlint.config.ts` 文件，并继承共享配置：

```tsx
import { defineConfig } from 'oxlint';
import { oxlint } from 'oxc-config-ui';

export default defineConfig({
  extends: [oxlint],
  ignorePatterns: ['**/*.{mjs,cjs,js,d.ts,d.mts}'],
});
```

## oxfmt 配置

在项目根目录创建一个 `oxfmt.config.ts` 文件：

```tsx
import { defineConfig } from 'oxfmt';
import { oxfmt } from 'oxc-config-ui';

export default defineConfig(oxfmt);
```

你可以通过展开基础配置并添加项目专属设置来自定义格式化工具，例如添加额外的忽略模式：

```tsx
import { defineConfig } from 'oxfmt';
import { oxfmt } from 'oxc-config-ui';

export default defineConfig({
  ...oxfmt,
  ignorePatterns: [...oxfmt.ignorePatterns, 'dist'],
});
```

## 运行 oxlint 和 oxfmt

在 `package.json` 中添加脚本以检查并格式化代码：

```json
{
  "scripts": {
    "lint": "oxlint",
    "format": "oxfmt --write \"**/*.{ts,tsx,css}\""
  }
}
```

然后使用你的包管理器运行：

```bash
pnpm lint
pnpm format
```

## 规则与源代码

ReactUI 的 oxlint 配置继承了推荐的 [oxlint](https://oxc.rs/docs/guide/usage/linter)
规则，并为 `react`、`typescript`、`jsx-a11y` 和 `jest` 插件添加了自定义规则。
你可以在 [oxc-config-ui 仓库](https://github.com/react-ui-org/oxc-config-ui) 中找到完整的规则列表和源代码。
