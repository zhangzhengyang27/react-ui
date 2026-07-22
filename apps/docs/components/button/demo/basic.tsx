import React from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Button variant="filled">Filled（默认）</Button>
      <Button variant="light">Light</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="transparent">Transparent</Button>
      <Button variant="default">Default</Button>
      <Button variant="white">White</Button>
    </Group>
  </DemoWrap>
);

export default App;
