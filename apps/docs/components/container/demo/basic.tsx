import React from 'react';
import { Container, Paper } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Container size="xs" px="xs">
      <Paper withBorder p="md">容器内内容</Paper>
    </Container>
  </DemoWrap>
);

export default App;
