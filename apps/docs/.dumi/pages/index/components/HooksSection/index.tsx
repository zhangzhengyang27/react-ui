import { SimpleGrid, Text, Title } from '@xiaoye-react/ui';
import { useLocation } from 'dumi';
import Link from '../../../../theme/common/Link';
import * as utils from '../../../../theme/utils';
import { HomePageContainer } from '../shared/Container';
import { HomePageDescription } from '../shared/Description';
import { HomePageLearnMore } from '../shared/LearnMore';
import { HomePageTitle } from '../shared/Title';
import classes from './HooksSection.module.css';

const hooksData = [
  {
    title: 'use-move',
    description: '处理给定元素上的移动行为，可用于构建自定义滑块',
    link: '/docs/hooks/use-move',
  },
  {
    title: 'use-resize-observer',
    description: '监听元素的尺寸和位置变化',
    link: '/docs/hooks/use-resize-observer',
  },
  {
    title: 'use-hotkeys',
    description: '将键盘快捷键绑定到操作',
    link: '/docs/hooks/use-hotkeys',
  },
  {
    title: 'use-eye-dropper',
    description: '从屏幕任意位置吸取颜色',
    link: '/docs/hooks/use-eye-dropper',
  },
];

export function HooksSection() {
  const { pathname, search } = useLocation();
  const localized = (path: string) => utils.getLocalizedPathname(path, utils.isZhCN(pathname), search);

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>Hooks 库</HomePageTitle>
        <HomePageDescription>
          83+ 个 Hooks，用于处理应用中复杂和常见的场景
        </HomePageDescription>

        <HomePageLearnMore href="/docs/hooks/package">浏览全部 Hooks</HomePageLearnMore>

        <SimpleGrid cols={{ md: 2 }} className={classes.demos} spacing="xl">
          {hooksData.map((hook) => (
            <section className={classes.column} key={hook.title}>
              <header className={classes.header}>
                <Title order={3} className={classes.title}>
                  <Link href={localized(hook.link)} className={classes.titleLink}>
                    {hook.title}
                  </Link>
                </Title>
                <Text className={classes.description}>{hook.description}</Text>
              </header>
            </section>
          ))}
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
