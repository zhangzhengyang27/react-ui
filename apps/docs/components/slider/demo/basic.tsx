import React, { useState } from 'react';
import { Slider } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState(40);
  return (
    <DemoWrap>
      <Slider value={value} onChange={setValue} />
    </DemoWrap>
  );
};

export default App;
