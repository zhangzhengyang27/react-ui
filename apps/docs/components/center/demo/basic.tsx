import React from 'react';
import { Center, Paper } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Center style={{ height: 100 }}>
      <Paper p="md" withBorder>居中内容</Paper>
    </Center>
  </DemoWrap>
);

export default App;
