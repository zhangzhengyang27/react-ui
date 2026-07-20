import React from 'react';
import { Paper, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Paper shadow="md" p="xl" withBorder>
      <Text>Paper 内容区域</Text>
    </Paper>
  </DemoWrap>
);

export default App;
