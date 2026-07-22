import { FiBox, FiCpu, FiLayers, FiPenTool } from 'react-icons/fi';
import { SimpleGrid } from '@xiaoye-react/ui';
import { HomePageContainer } from '../shared/Container';
import { HomePageDescription } from '../shared/Description';
import { HomePageFeatures, HomePageFeaturesData } from '../shared/Features';
import { HomePageLearnMore } from '../shared/LearnMore';
import { HomePageTitle } from '../shared/Title';
import classes from './StylesSection.module.css';

const features: HomePageFeaturesData = [
  {
    icon: <FiCpu size={30} />,
    title: '原生 CSS 构建',
    description: 'ReactUI 样式以 .css 文件形式提供，性能优异，无运行时开销',
  },
  {
    icon: <FiPenTool size={30} />,
    title: '完全可覆盖',
    description: '所有 ReactUI 组件支持 Styles API，可通过内联样式或类名覆盖组件样式的任何部分',
  },
  {
    icon: <FiBox size={30} />,
    title: 'PostCSS 预设',
    description: 'postcss-preset-ui 提供 mixin 和函数，用于应用暗色/亮色、RTL 和响应式样式',
  },
  {
    icon: <FiLayers size={30} />,
    title: '兼容任意样式方案',
    description: '你可以使用任何样式库来为 ReactUI 组件添加样式（Emotion、Vanilla Extract、Sass 等），不局限于特定工具',
  },
];

export function StylesSection() {
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
              <HomePageLearnMore href="/docs/styles/styles-overview">
                了解更多样式相关内容
              </HomePageLearnMore>
              <HomePageFeatures data={features} />
            </div>
          </div>
          <div className={classes.column}>
            <div className={classes.codePreview}>
              <pre className={classes.codeBlock}>
                <code>{`/* Styles API 示例 */
<Button
  classNames={{
    root: 'my-button',
    label: 'my-label',
  }}
  styles={{
    root: { borderWidth: 2 },
    label: { textTransform: 'uppercase' },
  }}
>
  自定义样式
</Button>`}</code>
              </pre>
            </div>
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
