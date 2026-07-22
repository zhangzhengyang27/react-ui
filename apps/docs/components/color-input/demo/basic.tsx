import React, { useState } from 'react';
import { ColorInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('#228be6');
  return (
    <DemoWrap>
      <ColorInput value={value} onChange={setValue} placeholder="选择颜色" />
    </DemoWrap>
  );
};

export default App;
