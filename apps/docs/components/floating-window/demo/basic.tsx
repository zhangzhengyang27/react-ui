import React, { useState } from 'react';
import { FloatingWindow, Button, Paper } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setOpened(true)}>打开浮动窗口</Button>
      <FloatingWindow enabled={opened} onClose={() => setOpened(false)}>
        <Paper p="md">浮动窗口内容</Paper>
      </FloatingWindow>
    </DemoWrap>
  );
};

export default App;
