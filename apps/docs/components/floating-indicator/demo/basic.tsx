import React, { useState } from 'react';
import { FloatingIndicator, Group, Paper, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const [active, setActive] = useState(0);
  const items = ['Tab 1', 'Tab 2', 'Tab 3'];
  return (
    <DemoWrap>
      <Group pos="relative">
        <FloatingIndicator target={null}>
          <Paper p="xs" withBorder>指示器</Paper>
        </FloatingIndicator>
        {items.map((item, i) => (
          <Button key={item} variant={active === i ? 'filled' : 'default'} onClick={() => setActive(i)}>
            {item}
          </Button>
        ))}
      </Group>
    </DemoWrap>
  );
};

export default App;
