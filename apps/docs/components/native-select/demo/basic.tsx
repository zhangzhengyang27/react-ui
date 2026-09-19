import React, { useState } from 'react';
import { NativeSelect } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  // NativeSelect 的 value 是 string，且没有 placeholder 属性——
  // 原生 select 用一个空的禁用选项充当占位
  const [value, setValue] = useState('');
  const data = [
    { value: '', label: '请选择', disabled: true },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ];
  return (
    <DemoWrap>
      <NativeSelect
        data={data}
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </DemoWrap>
  );
};

export default App;
