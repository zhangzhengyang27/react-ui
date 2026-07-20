import React, { useState } from 'react';
import { RollingNumber, Button } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState(2024);
  return (
    <DemoWrap>
      <RollingNumber value={value} />
      <Button size="xs" mt="sm" onClick={() => setValue(Math.floor(Math.random() * 10000))}>随机</Button>
    </DemoWrap>
  );
};

export default App;
