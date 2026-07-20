import React from 'react';
import { SimpleGrid, Paper } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <SimpleGrid cols={3}>
      <Paper p="md" withBorder>1</Paper>
      <Paper p="md" withBorder>2</Paper>
      <Paper p="md" withBorder>3</Paper>
      <Paper p="md" withBorder>4</Paper>
    </SimpleGrid>
  </DemoWrap>
);

export default App;
