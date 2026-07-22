import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function ResponsiveSizes() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
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
          Header/footer height and navbar/aside width can be responsive. Try resizing the screen to
          see sizes changes.
        </Text>
      </AppShell.Main>
    </AppShell>
  );
}
