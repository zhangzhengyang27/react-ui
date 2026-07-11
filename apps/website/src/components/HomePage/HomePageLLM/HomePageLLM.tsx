import { BookOpenTextIcon, BrainIcon, FileTextIcon, PlugIcon } from '@phosphor-icons/react';
import { SimpleGrid } from '@react-ui/ui';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import {
  HomePageFeatures,
  HomePageFeaturesData,
} from '../shared/HomePageFeatures/HomePageFeatures';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import { HomePageLLMDemo } from './HomePageLLMDemo';
import classes from './HomePageLLM.module.css';

const features: HomePageFeaturesData = [
  {
    icon: FileTextIcon,
    title: 'LLM 文档',
    description:
      'llms.txt 和 llms-full.txt 文件遵循 LLMs.txt 标准，可与 Cursor、Windsurf、ChatGPT、Claude 等 AI 工具配合使用',
  },
  {
    icon: BrainIcon,
    title: 'AI 技能',
    description:
      '安装 ReactUI 技能包，用于构建表单、自定义组件和 Combobox 输入等复杂任务',
  },
  {
    icon: PlugIcon,
    title: 'MCP 服务器',
    description:
      '使用 @react-ui/mcp-server 让 AI 代理直接访问组件文档、Props 和全库搜索',
  },
  {
    icon: BookOpenTextIcon,
    title: '始终保持最新',
    description:
      'LLM 文档随每次发布自动重新生成，AI 工具始终可以访问最新的 API 和示例',
  },
];

export function HomePageLLM() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing={30}>
          <div className={classes.column}>
            <div className={classes.main}>
              <HomePageTitle order={2}>为 AI 辅助开发而构建</HomePageTitle>
              <HomePageDescription className={classes.description}>
                LLM 优化文档、复杂任务的 Agent 技能、以及用于直接 API 访问的 MCP 服务器 ——
                ReactUI 专为 Cursor、Claude Code、Windsurf 等你正在使用的 AI 编码工具而设计。
              </HomePageDescription>
              <HomePageLearnMore href="/guides/llms/">
                了解更多 LLM 集成
              </HomePageLearnMore>

              <HomePageFeatures data={features} />
            </div>
          </div>
          <div className={classes.column}>
            <HomePageLLMDemo />
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
