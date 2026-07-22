import { AppShell, Burger, Group, Text } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';

export function CollapseDesktop() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          The burger icon is always visible
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        You can collapse the Navbar both on desktop and mobile. After sm breakpoint, the navbar is
        no longer offset by padding in the main element and it takes the full width of the screen
        when opened.
      </AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>导航栏在移动端和桌面端均可折叠。不错！</Text>
        <Text>移动端和桌面端的打开状态可以分别管理。</Text>
      </AppShell.Main>
    </AppShell>
  );
}
