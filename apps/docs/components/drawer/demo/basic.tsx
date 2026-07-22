import React, { useState } from 'react';
import { Drawer, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Button onClick={() => setOpened(true)}>打开抽屉</Button>
      <Drawer opened={opened} onClose={() => setOpened(false)} title="抽屉标题" position="right">
        抽屉内容
      </Drawer>
    </DemoWrap>
  );
};

export default App;
