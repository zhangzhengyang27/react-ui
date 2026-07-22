import React from 'react';
import { Progress, Stack } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Stack>
      <Progress value={40} />
      <Progress value={70} color="green" />
    </Stack>
  </DemoWrap>
);

export default App;
