import React, { useState } from 'react';
import { PasswordInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <DemoWrap>
      <PasswordInput value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="请输入密码" />
    </DemoWrap>
  );
};

export default App;
