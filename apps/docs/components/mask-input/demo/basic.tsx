import React from 'react';
import { MaskInput } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <MaskInput mask="000-0000-0000" placeholder="手机号码" />
  </DemoWrap>
);

export default App;
