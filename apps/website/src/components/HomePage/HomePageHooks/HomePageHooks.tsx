import Link from 'next/link';
import { SimpleGrid, Text, Title } from '@react-ui/ui';
import { useMediaQuery } from '@react-ui/hooks';
import { Demo } from '@react-ui/demo';
import {
  SliderDemos,
  UseEyeDropperDemos,
  UseHotkeysDemos,
  UseResizeObserverDemos,
} from '@react-ui/docs-demos';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageHooks.module.css';

interface DemoColumnProps {
  children: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

function DemoColumn({ children, title, description, link }: DemoColumnProps) {
  return (
    <section className={classes.column}>
      <header className={classes.header}>
        <Title order={3} className={classes.title}>
          <Link href={link} className={classes.titleLink}>
            {title}
          </Link>
        </Title>

        <Text className={classes.description}>{description}</Text>
      </header>

      {children}
    </section>
  );
}

export function HomePageHooks() {
  const isMobile = useMediaQuery('(max-width: 62em)');

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>Hooks 库</HomePageTitle>
        <HomePageDescription>
          70+ 个 Hooks，用于处理应用中复杂和常见的场景
        </HomePageDescription>

        <HomePageLearnMore href="/hooks/package">浏览全部 Hooks</HomePageLearnMore>

        <SimpleGrid cols={{ md: 2 }} className={classes.demos} spacing="xl">
          <DemoColumn
            title="use-move"
            description="use-move Hook 处理给定元素上的移动行为，可用于构建自定义滑块"
            link="/hooks/use-move"
          >
            <Demo
              data={SliderDemos.customSlider}
              demoProps={{ defaultExpanded: false, maxCollapsedHeight: isMobile ? 150 : 480 }}
            />
          </DemoColumn>

          <DemoColumn
            title="use-resize-observer"
            description="use-resize-observer Hook 监听元素的尺寸和位置变化"
            link="/hooks/use-resize-observer"
          >
            <Demo data={UseResizeObserverDemos.usage} demoProps={{ defaultExpanded: false }} />
          </DemoColumn>

          <DemoColumn
            title="use-hotkeys"
            description="use-hotkeys Hook 支持将键盘快捷键绑定到操作"
            link="/hooks/use-hotkeys"
          >
            <Demo data={UseHotkeysDemos.index} demoProps={{ defaultExpanded: false }} />
          </DemoColumn>

          <DemoColumn
            title="use-eye-dropper"
            description="use-eye-dropper Hook 支持从屏幕任意位置吸取颜色"
            link="/hooks/use-eye-dropper"
          >
            <Demo
              data={UseEyeDropperDemos.usage}
              demoProps={{ defaultExpanded: false, maxCollapsedHeight: isMobile ? 150 : 256 }}
            />
          </DemoColumn>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
