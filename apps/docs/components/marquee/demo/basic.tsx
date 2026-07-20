import React from 'react';
import { Marquee } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Marquee>这是一段滚动的文本内容，用于展示 Marquee 组件效果。</Marquee>
  </DemoWrap>
);

export default App;
