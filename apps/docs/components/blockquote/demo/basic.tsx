import React from 'react';
import { Blockquote } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Blockquote cite="— 鲁迅">世上本没有路，走的人多了，也便成了路。</Blockquote>
  </DemoWrap>
);

export default App;
