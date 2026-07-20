import React, { useState } from 'react';
import { RangeSlider } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<[number, number]>([20, 80]);
  return (
    <DemoWrap>
      <RangeSlider value={value} onChange={setValue} />
    </DemoWrap>
  );
};

export default App;
