import React from 'react';
import { NumberFormatter } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <NumberFormatter value={1234567.89} thousandSeparator prefix="$" />
  </DemoWrap>
);

export default App;
