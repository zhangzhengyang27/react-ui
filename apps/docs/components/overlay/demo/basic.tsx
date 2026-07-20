import React from 'react';
import { Overlay, Box, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Box pos="relative" h={120} p="md">
      <Overlay />
      <Text>内容区域</Text>
    </Box>
  </DemoWrap>
);

export default App;
