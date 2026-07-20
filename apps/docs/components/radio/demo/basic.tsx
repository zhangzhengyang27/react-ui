import React, { useState } from 'react';
import { Radio, Stack } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [value, setValue] = useState('react');
  return (
    <DemoWrap>
      <Radio.Group value={value} onChange={setValue}>
        <Stack>
          <Radio value="react" label="React" />
          <Radio value="vue" label="Vue" />
          <Radio value="angular" label="Angular" />
        </Stack>
      </Radio.Group>
    </DemoWrap>
  );
};

export default App;
