import React, { useState } from 'react';
import { Autocomplete } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('');
  const data = ['React', 'Vue', 'Angular', 'Svelte'];
  return (
    <DemoWrap>
      <Autocomplete data={data} value={value} onChange={setValue} placeholder="请输入或选择" />
    </DemoWrap>
  );
};

export default App;
