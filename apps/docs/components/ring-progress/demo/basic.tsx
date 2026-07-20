import React from 'react';
import { RingProgress } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <RingProgress sections={[{ value: 40, color: 'blue' }]} label="40%" />
  </DemoWrap>
);

export default App;
