import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function ResponsiveSizes() {
  // 默认展开：navbar 折叠时轨道是 0px，下面按断点配置的宽度在任何视口都看不出效果
  const [opened, { toggle }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        collapsed: !opened,
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">导航栏</AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>
          header 的高度与 navbar 的宽度都按断点分级（base / md / lg）：拖动窗口宽度即可看到
          header 逐档变高、navbar 逐档变宽。移动端点汉堡按钮折叠后，所有断点的轨道都是 0，
          不会残留某一档的宽度。
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
