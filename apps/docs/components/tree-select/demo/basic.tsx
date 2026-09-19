import React, { useState } from 'react';
import { TreeSelect } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // TreeSelect 的 onChange 回调参数是 string | string[] | null（单选为 string | null）
  const [value, setValue] = useState<string | string[] | null>(null);
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
