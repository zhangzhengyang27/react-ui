import React from 'react';
import { Divider, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Text>上方内容</Text>
    <Divider my="sm" />
    <Text>下方内容</Text>
  </DemoWrap>
);

export default App;
