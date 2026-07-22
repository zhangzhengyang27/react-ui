import React, { useState } from 'react';
import { AngleSlider } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState(45);
  return (
    <DemoWrap>
      <AngleSlider value={value} onChange={setValue} />
    </DemoWrap>
  );
};

export default App;
