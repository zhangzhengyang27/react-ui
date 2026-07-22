import React from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Button leftSection="→" variant="filled">
        左侧图标
      </Button>
      <Button rightSection="←" variant="filled">
        右侧图标
      </Button>
      <Button leftSection="★" rightSection="♥" variant="outline">
        两侧图标
      </Button>
      <Button fullWidth variant="filled">
        全宽按钮（fullWidth）
      </Button>
    </Group>
  </DemoWrap>
);

export default App;
