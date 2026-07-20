import React, { useState } from 'react';
import { TreeSelect } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  const data = [
    {
      value: 'fruits',
      label: '水果',
      children: [
        { value: 'apple', label: '苹果' },
        { value: 'banana', label: '香蕉' },
      ],
    },
  ];
  return (
    <DemoWrap>
      <TreeSelect data={data} value={value} onChange={setValue} placeholder="请选择" />
    </DemoWrap>
  );
};

export default App;
