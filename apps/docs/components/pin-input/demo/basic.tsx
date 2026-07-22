import React, { useState } from 'react';
import { PinInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  return (
    <DemoWrap>
      <PinInput value={value} onChange={setValue} length={4} />
    </DemoWrap>
  );
};

export default App;
