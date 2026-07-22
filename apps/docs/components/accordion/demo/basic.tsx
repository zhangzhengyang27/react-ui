import React from 'react';
import { Accordion } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Accordion defaultValue="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Control>面板一</Accordion.Control>
        <Accordion.Panel>面板一内容</Accordion.Panel>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Control>面板二</Accordion.Control>
        <Accordion.Panel>面板二内容</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  </DemoWrap>
);

export default App;
