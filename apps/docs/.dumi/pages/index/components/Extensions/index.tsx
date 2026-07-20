import { useRef } from 'react';
import { FiCheck, FiSearch } from 'react-icons/fi';
import {
  Button,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  notifications,
} from '@react-ui/ui';
import { HomePageContainer } from '../shared/Container';
import { HomePageDescription } from '../shared/Description';
import { HomePageLearnMore } from '../shared/LearnMore';
import { HomePageTitle } from '../shared/Title';
import classes from './Extensions.module.css';

const images = [
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
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

export function Extensions() {
  const timeoutRef = useRef<number>(-1);

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>扩展</HomePageTitle>

        <HomePageDescription className={classes.description}>
          扩展是为 ReactUI 提供额外功能的附加包，例如富文本编辑器、通知系统、图表、模态框管理器等。
          它们易于集成到你的应用中，提供无缝的使用体验。
        </HomePageDescription>

        <HomePageLearnMore href="/docs/react/getting-started">浏览全部扩展</HomePageLearnMore>

        <SimpleGrid cols={{ md: 2 }} className={classes.grid} verticalSpacing={30}>
          <ExtensionDemo title="通知系统" description="在应用的任何位置显示、更新或隐藏通知">
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
                      message: '通知将在 2 秒后自动关闭，你现在可以手动关闭此通知',
                      icon: <FiCheck size={18} />,
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

          <Stack>
            <ExtensionDemo title="Spotlight" description="Ctrl + K 命令面板，可用于搜索或执行常用操作">
              <Group justify="center">
                <Button
                  className={classes.demoControl}
                  size="lg"
                  radius="md"
                  variant="default"
                  rightSection={<FiSearch size={20} color="var(--ui-color-dimmed)" />}
                  miw={300}
                  justify="space-between"
                >
                  打开搜索面板
                </Button>
              </Group>
            </ExtensionDemo>

            <ExtensionDemo title="图片画廊" description="基于 Unsplash 的图片展示">
              <SimpleGrid cols={2} spacing="xs">
                {images.slice(0, 4).map((image) => (
                  <Image key={image} src={image} height={100} radius="md" alt="" />
                ))}
              </SimpleGrid>
            </ExtensionDemo>
          </Stack>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
