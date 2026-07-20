import React, { useState } from 'react';
import { TagsInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>(['react']);
  return (
    <DemoWrap>
      <TagsInput value={value} onChange={setValue} placeholder="输入标签后回车" />
    </DemoWrap>
  );
};

export default App;
