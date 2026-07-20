import React, { useState } from 'react';
import { ColorPicker } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('#228be6');
  return (
    <DemoWrap>
      <ColorPicker value={value} onChange={setValue} />
    </DemoWrap>
  );
};

export default App;
