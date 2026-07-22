import React, { useState } from 'react';
import { JsonInput } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('{\n  \"name\": \"react-ui\"\n}');
  return (
    <DemoWrap>
      <JsonInput value={value} onChange={setValue} placeholder="请输入 JSON" />
    </DemoWrap>
  );
};

export default App;
