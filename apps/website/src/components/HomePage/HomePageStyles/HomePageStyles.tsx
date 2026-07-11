import { CodeBlockIcon, CodeIcon, NotePencilIcon, PlugIcon } from '@phosphor-icons/react';
import { SimpleGrid } from '@react-ui/ui';
import { Demo } from '@react-ui/demo';
import { StylesDemos } from '@react-ui/docs-demos';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import {
  HomePageFeatures,
  HomePageFeaturesData,
} from '../shared/HomePageFeatures/HomePageFeatures';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageStyles.module.css';

const features: HomePageFeaturesData = [
  {
    icon: CodeIcon,
    title: '原生 CSS 构建',
    description:
      'ReactUI 样式以 .css 文件形式提供，性能优异，无运行时开销',
  },
  {
    icon: NotePencilIcon,
    title: '完全可覆盖',
    description:
      '所有 ReactUI 组件支持 Styles API，可通过内联样式或类名覆盖组件样式的任何部分',
  },
  {
    icon: CodeBlockIcon,
    title: 'PostCSS 预设',
    description:
      'postcss-preset-mantine 提供 mixin 和函数，用于应用暗色/亮色、RTL 和响应式样式',
  },
  {
    icon: PlugIcon,
    title: '兼容任意样式方案',
    description:
      '你可以使用任何样式库来为 ReactUI 组件添加样式（Emotion、Vanilla Extract、Sass 等），不局限于特定工具',
  },
];

export function HomePageStyles() {
  return (
    <section className={classes.root}>
      <HomePageContainer>
        <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing={30}>
          <div className={classes.column}>
            <div className={classes.main}>
              <HomePageTitle order={2}>灵活的样式系统</HomePageTitle>
              <HomePageDescription className={classes.description}>
                ReactUI 组件使用原生 CSS 构建，性能优异且易于覆盖
              </HomePageDescription>
              <HomePageLearnMore href="/styles/styles-overview/">
                了解更多样式相关内容
              </HomePageLearnMore>

              <HomePageFeatures data={features} />
            </div>
          </div>
          <div className={classes.column}>
            <Demo data={StylesDemos.dataAttributes} />
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
