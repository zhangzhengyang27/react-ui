import React, { useState } from 'react';
import { Select } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const data = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];
  return (
    <DemoWrap>
      <Select data={data} value={value} onChange={setValue} placeholder="请选择" />
    </DemoWrap>
  );
};

export default App;
