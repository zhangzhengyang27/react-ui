import React from 'react';
import { ScrollArea, Paper } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <ScrollArea h={120}>
      {Array.from({ length: 20 }).map((_, i) => (
        <Paper key={i} p="xs" withBorder>条目 {i + 1}</Paper>
      ))}
    </ScrollArea>
  </DemoWrap>
);

export default App;
