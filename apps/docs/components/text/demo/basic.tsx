import React from 'react';
import { Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Text>默认文本</Text>
    <Text c="dimmed">次要文本</Text>
    <Text fw={700}>加粗文本</Text>
  </DemoWrap>
);

export default App;
