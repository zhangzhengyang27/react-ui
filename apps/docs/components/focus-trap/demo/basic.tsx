import React from 'react';
import { FocusTrap, Stack, TextInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <FocusTrap active>
      <Stack>
        <TextInput placeholder="输入框 1" />
        <TextInput placeholder="输入框 2" />
      </Stack>
    </FocusTrap>
  </DemoWrap>
);

export default App;
