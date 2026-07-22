import React from 'react';
import { Flex, Paper } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Flex gap="md" justify="center" align="center" wrap="wrap">
      <Paper p="md" withBorder>Item 1</Paper>
      <Paper p="md" withBorder>Item 2</Paper>
      <Paper p="md" withBorder>Item 3</Paper>
    </Flex>
  </DemoWrap>
);

export default App;
