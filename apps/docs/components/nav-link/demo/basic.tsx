import React from 'react';
import { NavLink } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <NavLink href="#" label="首页" description="返回首页" active />
  </DemoWrap>
);

export default App;
