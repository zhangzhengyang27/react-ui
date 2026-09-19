import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function AltLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, collapsed: !opened }}
      aside={{ width: 300, collapsed: false }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Text>导航栏</Text>
        </Group>
      </AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>替代布局演示——导航栏和侧边栏从上到下贯穿。</Text>
      </AppShell.Main>
      <AppShell.Aside p="md">侧边栏</AppShell.Aside>
      <AppShell.Footer p="md">页脚</AppShell.Footer>
    </AppShell>
  );
}
