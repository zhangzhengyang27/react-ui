import { AppShell, Burger, Group, NavLink, ScrollArea, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function NavbarSection() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          Header
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section p="md">导航栏头部</AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea} px="md">
          <Text mb="sm">60 links in a scrollable section:</Text>

          {Array(60)
            .fill(0)
            .map((_, index) => (
              <NavLink
                href="#"
                key={index}
                onClick={(event) => event.preventDefault()}
                label="导航栏链接"
              />
            ))}
        </AppShell.Section>
        <AppShell.Section p="md">导航栏页脚——始终位于底部</AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>主内容</AppShell.Main>
    </AppShell>
  );
}
