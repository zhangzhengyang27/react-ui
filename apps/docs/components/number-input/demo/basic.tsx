import React, { useState } from 'react';
import { NumberInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<number | ''>(0);
  return (
    <DemoWrap>
      <NumberInput value={value} onChange={setValue} placeholder="请输入数字" />
    </DemoWrap>
  );
};

export default App;
