import { FiMoon, FiSun } from 'react-icons/fi';
import { Button, Group, Image, SimpleGrid, useUIColorScheme } from '@react-ui/ui';
import { HomePageContainer } from '../shared/Container';
import { HomePageDescription } from '../shared/Description';
import { HomePageTitle } from '../shared/Title';
import demo from './images/new.webp';
import classes from './DarkColorScheme.module.css';

const code = `import { UIProvider } from '@react-ui/ui';

function Demo() {
  return (
    <UIProvider defaultColorScheme="dark">
      <App />
    </UIProvider>
  );
}`;

const codeBlockStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 6,
  fontSize: 13,
  lineHeight: 1.6,
  overflowX: 'auto',
  backgroundColor: 'light-dark(rgba(0,0,0,0.04), rgba(255,255,255,0.06))',
  margin: '12px 0',
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, Liberation Mono, monospace',
  maxWidth: 'calc(100vw - 42px)',
};

export function DarkColorScheme() {
  const { toggleColorScheme } = useUIColorScheme();

  return (
    <section className={classes.root}>
      <HomePageContainer>
        <HomePageTitle order={2}>暗色主题</HomePageTitle>

        <SimpleGrid cols={{ md: 2 }} spacing={50} verticalSpacing="xl" className={classes.demo}>
          <Image src={demo} className={classes.image} radius="md" />

          <div>
            <HomePageDescription className={classes.description}>
              只需几行代码即可为应用添加暗色主题 —— ReactUI 提供亮色和暗色主题的全局样式，
              所有组件开箱即用地支持暗色主题。
            </HomePageDescription>

            <pre style={codeBlockStyle}>
              <code>{code}</code>
            </pre>

            <Group justify="center" mt="xl">
              <Button
                variant="default"
                radius="md"
                onClick={() => toggleColorScheme()}
                leftSection={
                  <>
                    <FiSun className={classes.darkIcon} />
                    <FiMoon className={classes.lightIcon} />
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
