import { MdxCodeHighlight } from '@/components/MdxProvider';
import { HomePageTabs } from '../shared/HomePageTabs/HomePageTabs';
import classes from './HomePageLLM.module.css';

const llmsTxtCode = `# 在 Cursor 中引用 ReactUI 文档
@Docs https://react-ui.dev/llms.txt

# 或下载完整文档
curl -o reactui-docs.txt https://react-ui.dev/llms-full.txt

# 与 ChatGPT/Claude 一起使用
"使用 ReactUI，如何创建深色模式切换？
参考：https://react-ui.dev/llms.txt"`;

const mcpCode = `// 添加到你的 MCP 客户端配置
{
  "mcpServers": {
    "reactui": {
      "command": "npx",
      "args": ["-y", "@react-ui/mcp-server"]
    }
  }
}

// 可用工具：
// - list_items
// - get_item_doc
// - get_item_props
// - search_docs`;

const tabsData = [
  {
    label: '文档',
    value: 'docs',
    content: <MdxCodeHighlight code={llmsTxtCode} language="bash" className={classes.code} />,
  },
  {
    label: 'MCP 服务器',
    value: 'mcp',
    content: <MdxCodeHighlight code={mcpCode} language="json" className={classes.code} />,
  },
];

export function HomePageLLMDemo() {
  return <HomePageTabs data={tabsData} />;
}
