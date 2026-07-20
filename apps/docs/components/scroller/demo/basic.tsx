import React from 'react';
import { Scroller, Paper } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Scroller h={120}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Paper key={i} p="xs" withBorder>条目 {i + 1}</Paper>
      ))}
    </Scroller>
  </DemoWrap>
);

export default App;
