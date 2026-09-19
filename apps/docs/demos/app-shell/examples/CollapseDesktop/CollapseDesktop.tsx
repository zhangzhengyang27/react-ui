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
        collapsed: !mobileOpened && !desktopOpened,
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
        You can collapse the Navbar from either burger. While it is collapsed its width is 0, and it
        expands back to the configured width when opened.
      </AppShell.Navbar>
      <AppShell.Main>
        <Text>这是主内容区，你的应用内容在这里。</Text>
        <Text>导航栏在移动端和桌面端均可折叠。不错！</Text>
        <Text>两个汉堡按钮都会切换同一个 navbar 的折叠状态。</Text>
      </AppShell.Main>
    </AppShell>
  );
}
