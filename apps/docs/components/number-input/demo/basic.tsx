import React, { useState } from 'react';
import { NumberInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // NumberInput 的 onChange 回调参数是 number | string
  const [value, setValue] = useState<number | string>(0);
  return (
    <DemoWrap>
      <NumberInput value={value} onChange={setValue} placeholder="请输入数字" />
    </DemoWrap>
  );
};

export default App;
