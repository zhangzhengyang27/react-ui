import React from 'react';
import { Group, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Button>第一个</Button>
      <Button>第二个</Button>
      <Button>第三个</Button>
    </Group>
  </DemoWrap>
);

export default App;
