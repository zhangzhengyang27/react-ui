import React, { useState } from 'react';
import { SegmentedControl } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('react');
  return (
    <DemoWrap>
      <SegmentedControl value={value} onChange={setValue} data={['React', 'Vue', 'Angular']} />
    </DemoWrap>
  );
};

export default App;
