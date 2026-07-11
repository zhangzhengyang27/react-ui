import { MdxCodeHighlight } from '@/components/MdxProvider';
import { HomePageTabs } from '../shared/HomePageTabs/HomePageTabs';
import classes from './HomePageLLM.module.css';

const llmsTxtCode = `# Reference ReactUI docs in Cursor
@Docs https://react-ui.dev/llms.txt

# Or download full documentation
curl -o reactui-docs.txt https://react-ui.dev/llms-full.txt

# Use with ChatGPT/Claude
"Using ReactUI, how do I create a dark mode toggle?
Reference: https://react-ui.dev/llms.txt"`;

const mcpCode = `// Add to your MCP client configuration
{
  "mcpServers": {
    "reactui": {
      "command": "npx",
      "args": ["-y", "@react-ui/mcp-server"]
    }
  }
}

// Available tools:
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
