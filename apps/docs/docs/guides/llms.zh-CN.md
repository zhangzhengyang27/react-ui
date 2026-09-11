---
category: Guides
title: Llms
subtitle: LLMs
description: react-ui Llms 文档。
---


## 文档

链接：

- [llms.txt](/llms.txt) – 精简版
- [下载](/llms-full.txt) 完整文档（约 1.8MB）

大语言模型文档包含：

- **入门指南** - 安装和设置说明
- **组件** - 所有 ReactUI 组件及其 props、示例和用法
- **Hooks** - 完整的 hooks 文档及示例
- **主题** - 主题定制和 UIProvider 设置
- **样式** - CSS modules、CSS 变量和样式方案
- **常见问题** - 常见问题及解决方案

## Cursor

在 Cursor 中，你可以使用 `@Docs` 功能引用文档：

1. 在提示词中输入 `@Docs`
2. 引用 ReactUI 文档地址：`https://react-ui.dev/llms.txt`
3. 询问关于 ReactUI 组件、样式或实现的问题

## Windsurf

对于 Windsurf 用户：

1. 使用 `@https://react-ui.dev/llms.txt` 引用文档
2. 或将其添加到你的 `.windsurfrules` 文件中以持久化访问

## ChatGPT 和 Claude

使用 ChatGPT 或 Claude 时：

1. 说明你在使用 ReactUI
2. 引用文档地址：`https://react-ui.dev/llms.txt`
3. AI 会获取并使用文档来提供准确答案

### GitHub Copilot

虽然 Copilot 不直接支持外部文档，但你可以：

1. 在注释中包含相关文档片段
2. 准确引用组件名称和 props 以获得更好的建议

## 技能

ReactUI 还在 [`xiaoye/react-ui-skills`](https://github.com/zhangzhengyang27/react-ui-skills) 仓库中为 AI 编码代理提供 skills。

当前可用的 skills：

- `reactui-combobox` – 使用 `Combobox` 构建自定义 select/autocomplete/multiselect 组件
- `reactui-form` – 使用 `@xiaoye-react/ui` 构建表单、验证、嵌套字段和表单上下文
- `reactui-custom-components` – 使用 ReactUI factory API 和 Styles API 创建自定义组件

### 安装 skills

从仓库安装每个 skill：


### 使用 skills

在你的 AI 提示词中，明确告诉代理使用某个已安装的 skill。

示例：

- "Use `$reactui-form` and build a profile form with validation and nested fields"
- "Use `$reactui-combobox` and create a searchable multi-select with custom option rendering"
- "Use `$reactui-custom-components` and scaffold a polymorphic component with Styles API support"

如果你的代理不支持 `$skill-name` 提及，可以用纯文本引用 skill 名称并要求代理遵循。

```bash
npx skills add https://github.com/zhangzhengyang27/react-ui-skills --skill reactui-combobox
npx skills add https://github.com/zhangzhengyang27/react-ui-skills --skill reactui-form
npx skills add https://github.com/zhangzhengyang27/react-ui-skills --skill reactui-custom-components
```

## MCP server（实验性）

ReactUI 还提供了一个 MCP server 包：

- `@xiaoye-react/mcp-server`

该服务器读取发布在 `react-ui.dev` 上的 ReactUI 静态 MCP 数据，并暴露 AI 代理可直接调用的工具：

- `list_items`
- `get_item_doc`
- `get_item_props`
- `search_docs`

### MCP server 配置

大多数兼容 MCP 的工具都支持通过 JSON 配置添加服务器。使用以下服务器定义：


要使用不同的数据源（例如 alpha 文档或本地静态文件），请添加环境变量：


### 在不同工具中使用 MCP server

#### Claude Desktop

1. 在 Claude Desktop 中打开 MCP 设置
2. 添加上面的 `reactui` 服务器配置
3. 开始新对话并请求 ReactUI 指导，例如："Find Button props and give me a usage example"

#### Cursor

1. 打开 Cursor MCP/server 设置
2. 添加相同的 `reactui` 服务器配置
3. 使用 agent 模式并询问 ReactUI 相关问题 – Cursor 会自动调用 MCP 工具

#### Windsurf

1. 打开 Windsurf MCP/server 设置
2. 使用相同配置注册 `@xiaoye-react/mcp-server`
3. 直接在聊天中请求组件文档、props 和示例

#### 其他 MCP 客户端（VS Code/Cline 等）

如果客户端支持自定义 MCP 服务器，请添加相同的 command 和 args：

- command: `npx`
- args: `["-y", "@xiaoye-react/mcp-server"]`

然后使用如下提示词：

- "List ReactUI items related to input fields"
- "Get full docs for Button"
- "Search ReactUI docs for color scheme and dark mode"

```json
{
  "mcpServers": {
    "reactui": {
      "command": "npx",
      "args": ["-y", "@xiaoye-react/mcp-server"]
    }
  }
}
```

```json
{
  "mcpServers": {
    "reactui": {
      "command": "npx",
      "args": ["-y", "@xiaoye-react/mcp-server"],
      "env": {
        "REACTUI_MCP_DATA_URL": "https://react-ui.dev/mcp"
      }
    }
  }
}
```

## 示例提示词

以下是一些可与 AI 工具配合使用的示例提示词：

- "Using ReactUI, how do I create a dark mode toggle?"
- "Show me how to use the AppShell component with a collapsible navbar"
- "How can I customize the theme colors in UIProvider?"
- "Create a form with validation using ReactUI's form hooks"
- "How to align input with a button in a flex container?"

## 文档生成

大语言模型文档通过编译脚本自动从我们的源文件生成。它包含：

- 来自 MDX 文件的组件文档
- Props 表格和类型
- 代码示例和 demos
- Styles API 文档
- 来自 GitHub Discussions 的 FAQ 内容

有两种生成格式：

- `llms.txt` – 默认的精简索引，链接到 `/llms` 路径下的每页 `.md` 文件
- `llms-full.txt` – 包含所有文档内容的单个大文件

为了确保你拥有最新文档，我们会在每个版本中重新生成这些文件。这些文件遵循 [LLMs.txt](https://llmstxt.org/) 标准，以更好地兼容 AI 工具。

## 贡献

如果你发现大语言模型文档有任何问题或有改进建议，请在我们的 GitHub 仓库[提交 issue](https://github.com/zhangzhengyang27/react-ui/issues)。
