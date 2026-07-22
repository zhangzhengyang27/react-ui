import React from 'react';
import { Avatar, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" />
      <Avatar color="cyan" radius="xl">MK</Avatar>
    </Group>
  </DemoWrap>
);

export default App;
