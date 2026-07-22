import React, { useState } from 'react';
import { Dialog, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setOpened(true)}>打开对话框</Button>
      <Dialog opened={opened} onClose={() => setOpened(false)} title="确认删除？">
        此操作不可撤销。
      </Dialog>
    </DemoWrap>
  );
};

export default App;
