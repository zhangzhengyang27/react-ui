import { AppShell, Burger, Group, Text } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';

export function FullLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
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
        <Text>侧边栏在 md 断点隐藏，折叠时无法打开</Text>
      </AppShell.Main>
      <AppShell.Aside p="md">侧边栏</AppShell.Aside>
      <AppShell.Footer p="md">页脚</AppShell.Footer>
    </AppShell>
  );
}
