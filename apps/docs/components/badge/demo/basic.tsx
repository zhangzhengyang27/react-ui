import React from 'react';
import { Badge, Group } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Badge>默认</Badge>
      <Badge color="red">错误</Badge>
      <Badge variant="outline">描边</Badge>
    </Group>
  </DemoWrap>
);

export default App;
