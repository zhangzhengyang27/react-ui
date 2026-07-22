import React from 'react';
import { Spoiler, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Spoiler maxHeight={60} showLabel="显示更多" hideLabel="收起">
      <Text>这是一段很长的文本内容，用于演示 Spoiler 组件的展开折叠效果。默认只显示一部分，点击「显示更多」后可以查看完整内容。</Text>
    </Spoiler>
  </DemoWrap>
);

export default App;
