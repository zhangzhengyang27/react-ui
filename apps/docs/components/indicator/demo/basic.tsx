import React from 'react';
import { Indicator, Avatar } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Indicator inline label="New" size={16}>
      <Avatar radius="sm">UI</Avatar>
    </Indicator>
  </DemoWrap>
);

export default App;
