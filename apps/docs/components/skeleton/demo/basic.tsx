import React from 'react';
import { Skeleton } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Skeleton height={120} radius="md" />
  </DemoWrap>
);

export default App;
