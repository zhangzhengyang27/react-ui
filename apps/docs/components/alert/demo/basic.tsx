import React from 'react';
import { Alert, Stack } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Stack>
      <Alert title="成功提示">这是一条成功的通知。</Alert>
      <Alert color="red" title="错误提示">这是一条错误的通知。</Alert>
    </Stack>
  </DemoWrap>
);

export default App;
