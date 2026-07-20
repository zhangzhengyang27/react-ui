import React, { useState } from 'react';
import { ModalBase, Button, Paper } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setOpened(true)}>打开 ModalBase</Button>
      <ModalBase opened={opened} onClose={() => setOpened(false)}>
        <Paper p="md">ModalBase 内容</Paper>
      </ModalBase>
    </DemoWrap>
  );
};

export default App;
