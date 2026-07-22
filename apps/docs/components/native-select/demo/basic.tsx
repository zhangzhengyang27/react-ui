import React, { useState } from 'react';
import { NativeSelect } from '@xiaoye-react/ui';
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
      <NativeSelect data={data} value={value} onChange={(event) => setValue(event.currentTarget.value)} placeholder="请选择" />
    </DemoWrap>
  );
};

export default App;
