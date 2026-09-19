import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function NoTransitions() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, collapsed: !opened }}
      transitionDuration={0}
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
        <Text>
          All AppShell animations are disabled, everything is instant. Try it on a small screen.
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
