import React from 'react';
import { Tabs } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Tabs defaultValue="first">
      <Tabs.List>
        <Tabs.Tab value="first">第一个</Tabs.Tab>
        <Tabs.Tab value="second">第二个</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="first" pt="sm">第一个面板内容</Tabs.Panel>
      <Tabs.Panel value="second" pt="sm">第二个面板内容</Tabs.Panel>
    </Tabs>
  </DemoWrap>
);

export default App;
