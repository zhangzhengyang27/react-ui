import React from 'react';
import { MediaQuery, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
      <Text>在 sm 以下屏幕隐藏</Text>
    </MediaQuery>
  </DemoWrap>
);

export default App;
