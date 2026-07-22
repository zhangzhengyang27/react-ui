import React from 'react';
import { Portal } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Portal>Portal 内容（渲染到 body）</Portal>
  </DemoWrap>
);

export default App;
