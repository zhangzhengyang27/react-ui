import React from 'react';
import { Tree } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Tree data={[
      { value: 'root', label: '根节点', children: [
        { value: 'child1', label: '子节点 1' },
        { value: 'child2', label: '子节点 2' },
      ]},
    ]} />
  </DemoWrap>
);

export default App;
