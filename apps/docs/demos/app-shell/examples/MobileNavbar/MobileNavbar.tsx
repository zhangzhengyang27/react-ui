import { AppShell, Burger, Group, UnstyledButton } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import classes from './MobileNavbar.module.css';

export function MobileNavbar() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, collapsed: !opened }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            Header
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton className={classes.control}>首页</UnstyledButton>
              <UnstyledButton className={classes.control}>博客</UnstyledButton>
              <UnstyledButton className={classes.control}>联系人</UnstyledButton>
              <UnstyledButton className={classes.control}>支持</UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>首页</UnstyledButton>
        <UnstyledButton className={classes.control}>博客</UnstyledButton>
        <UnstyledButton className={classes.control}>联系人</UnstyledButton>
        <UnstyledButton className={classes.control}>支持</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>
        Navbar is only visible on mobile, links that are rendered in the header on desktop are
        hidden on mobile in header and rendered in navbar instead.
      </AppShell.Main>
    </AppShell>
  );
}
