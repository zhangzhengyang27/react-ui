import React, { useState } from 'react';
import { TextInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <DemoWrap>
      <TextInput value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="请输入" />
    </DemoWrap>
  );
};

export default App;
