import React from 'react';
import { AppShell, Group, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <AppShell header={{ height: 60 }} padding="md" navbar={{ width: 200, breakpoint: 'sm' }}>
      <AppShell.Header>
        <Group h="100%" px="md">
          <Text fw={700}>react-ui</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">导航</AppShell.Navbar>
      <AppShell.Main>主内容区域</AppShell.Main>
    </AppShell>
  </DemoWrap>
);

export default App;
