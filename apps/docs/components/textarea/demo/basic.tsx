import React, { useState } from 'react';
import { Textarea } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <DemoWrap>
      <Textarea value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="请输入多行文本" />
    </DemoWrap>
  );
};

export default App;
