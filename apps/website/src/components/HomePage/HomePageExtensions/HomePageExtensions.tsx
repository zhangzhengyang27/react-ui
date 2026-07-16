import { useRef } from 'react';
import { CheckIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { Carousel } from '@react-ui/ui';
import { Button, Group, Image, SimpleGrid, Stack, Text, Title } from '@react-ui/ui';
import { notifications } from '@react-ui/ui';
import { TipTapDemos } from '@react-ui/docs-demos';
import { searchHandlers } from '@/components/Search';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import classes from './HomePageExtensions.module.css';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
];

interface ExtensionDemoProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ExtensionDemo({ title, description, children }: ExtensionDemoProps) {
  return (
    <section className={classes.demo}>
      <header className={classes.demoHeader}>
        <Title order={3} className={classes.demoTitle}>
          {title}
        </Title>
        <Text className={classes.demoDescription}>{description}</Text>
      </header>

      <div className={classes.demoArea}>{children}</div>
    </section>
  );
}

export function HomePageExtensions() {
  const RichText = TipTapDemos.usage.component as any;
  const timeoutRef = useRef<number>(-1);

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} radius="md" alt="" />
    </Carousel.Slide>
  ));

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>扩展</HomePageTitle>

        <HomePageDescription className={classes.description}>
          扩展是为 ReactUI 提供额外功能的附加包，例如富文本编辑器、通知系统、图表、模态框管理器等。
          它们易于集成到你的应用中，提供无缝的使用体验。
        </HomePageDescription>

        <HomePageLearnMore href="/x/extensions">浏览全部扩展</HomePageLearnMore>

        <SimpleGrid cols={{ md: 2 }} className={classes.grid} verticalSpacing={30}>
          <ExtensionDemo title="富文本编辑器" description="基于 TipTap 的富文本编辑器">
            <RichText stickyOffset={56} />
          </ExtensionDemo>

          <div>
            <Stack>
              <ExtensionDemo
                title="通知系统"
                description="在应用的任何位置显示、更新或隐藏通知"
              >
                <Group justify="center">
                  <Button
                    className={classes.demoControl}
                    variant="default"
                    radius="md"
                    size="lg"
                    onClick={() => {
                      window.clearTimeout(timeoutRef.current);
                      const id = notifications.show({
                        id: 'home-page-demo',
                        withBorder: true,
                        loading: true,
                        title: '正在加载数据',
                        radius: 'md',
                        message: '数据将在 3 秒内加载完成，当前不可关闭',
                        autoClose: false,
                        withCloseButton: false,
                      });

                      timeoutRef.current = window.setTimeout(() => {
                        notifications.update({
                          id,
                          color: 'teal',
                          withBorder: true,
                          title: '数据已加载',
                          radius: 'md',
                          message:
                            '通知将在 2 秒后自动关闭，你现在可以手动关闭此通知',
                          icon: <CheckIcon size={18} />,
                          loading: false,
                          autoClose: 2000,
                        });
                      }, 3000);
                    }}
                  >
                    显示通知
                  </Button>
                </Group>
              </ExtensionDemo>

              <ExtensionDemo
                title="Spotlight"
                description="Ctrl + K 命令面板，可用于搜索或执行常用操作"
              >
                <Group justify="center">
                  <Button
                    className={classes.demoControl}
                    size="lg"
                    radius="md"
                    variant="default"
                    onClick={searchHandlers.open}
                    rightSection={
                      <MagnifyingGlassIcon size={20} color="var(--ui-color-dimmed)" />
                    }
                    miw={300}
                    justify="space-between"
                  >
                    打开搜索面板
                  </Button>
                </Group>
              </ExtensionDemo>

              <ExtensionDemo title="Carousel" description="基于 Embla 的轮播组件">
                <Carousel
                  withIndicators
                  emblaOptions={{ loop: true }}
                  classNames={{
                    root: classes.carousel,
                    controls: classes.carouselControls,
                    indicator: classes.carouselIndicator,
                  }}
                >
                  {slides}
                </Carousel>
              </ExtensionDemo>
            </Stack>
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
