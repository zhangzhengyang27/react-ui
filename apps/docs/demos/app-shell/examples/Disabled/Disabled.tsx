import { AppShell, Burger, Button, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function Disabled() {
  const [opened, { toggle }] = useDisclosure();
  const [disabled, { toggle: toggleDisabled }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, collapsed: !opened }}
      padding="md"
      disabled={disabled}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header is hidden when disabled
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">禁用时隐藏导航栏</AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>
          When you set disabled prop on AppShell, all elements except AppShell.Main are hidden. Try
          it out:
        </Text>
        <Button onClick={toggleDisabled} mt="md">
          Toggle disabled
        </Button>
      </AppShell.Main>
    </AppShell>
  );
}
