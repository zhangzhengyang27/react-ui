import React from 'react';
import { TableOfContents, Box, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Box>
      <TableOfContents />
      <Text id="section-1" mt="xl">章节 1</Text>
      <Text id="section-2">章节 2</Text>
    </Box>
  </DemoWrap>
);

export default App;
