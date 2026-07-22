import React from 'react';
import { Stack, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Stack>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Stack>
  </DemoWrap>
);

export default App;
