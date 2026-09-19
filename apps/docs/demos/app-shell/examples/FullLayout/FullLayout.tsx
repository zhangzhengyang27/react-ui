import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function FullLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
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
      <AppShell.Navbar p="md">导航栏</AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>包含所有元素的 AppShell 示例：导航栏、头部、侧边栏、页脚。</Text>
        <Text>除 AppShell.Main 外的所有元素都是固定定位。</Text>
        <Text>aside.collapsed 为 true 时侧边栏宽度为 0，这里保持展开</Text>
      </AppShell.Main>
      <AppShell.Aside p="md">侧边栏</AppShell.Aside>
      <AppShell.Footer p="md">页脚</AppShell.Footer>
    </AppShell>
  );
}
