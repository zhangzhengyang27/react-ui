import React from 'react';
import { Title } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Title order={1}>一级标题</Title>
    <Title order={2}>二级标题</Title>
    <Title order={3}>三级标题</Title>
  </DemoWrap>
);

export default App;
