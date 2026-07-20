import React from 'react';
import { VisuallyHidden } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <VisuallyHidden>对视觉隐藏但可被屏幕阅读器读取</VisuallyHidden>
  </DemoWrap>
);

export default App;
