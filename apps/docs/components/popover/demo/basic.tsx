import React from 'react';
import { Popover, Button, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Popover>
      <Popover.Target>
        <Button>点击打开</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">弹层内容</Text>
      </Popover.Dropdown>
    </Popover>
  </DemoWrap>
);

export default App;
