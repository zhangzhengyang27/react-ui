import { MoonStarsIcon, SunIcon } from '@phosphor-icons/react';
import { Button, Group, Image, SimpleGrid, useUIColorScheme } from '@react-ui/ui';
import { MdxCodeHighlight } from '@/components/MdxProvider';
import { HomePageContainer } from '../shared/HomePageContainer/HomePageContainer';
import { HomePageDescription } from '../shared/HomePageDescription/HomePageDescription';
import { HomePageTitle } from '../shared/HomePageTitle/HomePageTitle';
import { HomePageLearnMore } from '../shared/HomePageLearnMore/HomePageLearnMore';
import demo from './images/new.webp';
import classes from './HomePageDarkColorScheme.module.css';

const code = `import { UIProvider } from '@react-ui/ui';

function Demo() {
  return (
    <UIProvider defaultColorScheme="dark">
      <App />
    </UIProvider>
  );
}`;

export function HomePageDarkColorScheme() {
  const { toggleColorScheme } = useUIColorScheme();

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>暗色主题</HomePageTitle>

        <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing="xl" className={classes.demo}>
          <Image src={demo.src} className={classes.image} radius="md" />

          <div>
            <HomePageDescription className={classes.description}>
              只需几行代码即可为应用添加暗色主题 —— ReactUI 提供亮色和暗色主题的全局样式，
              所有组件开箱即用地支持暗色主题。
            </HomePageDescription>

            <MdxCodeHighlight code={code} language="tsx" className={classes.code} />

            <Group justify="center" mt="xl">
              <Button
                variant="default"
                radius="md"
                onClick={() => toggleColorScheme()}
                leftSection={
                  <>
                    <SunIcon className={classes.darkIcon} />
                    <MoonStarsIcon className={classes.lightIcon} />
                  </>
                }
              >
                切换颜色主题
              </Button>
            </Group>
          </div>
        </SimpleGrid>
      </HomePageContainer>
    </section>
  );
}
