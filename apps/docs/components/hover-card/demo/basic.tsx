import React from 'react';
import { HoverCard, Button, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <HoverCard>
      <HoverCard.Target>
        <Button>悬停查看卡片</Button>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">更多详细内容</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </DemoWrap>
);

export default App;
