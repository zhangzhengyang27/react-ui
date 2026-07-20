import React, { useState } from 'react';
import { Burger } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [opened, setOpened] = useState(false);
  return (
    <DemoWrap>
      <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
    </DemoWrap>
  );
};

export default App;
