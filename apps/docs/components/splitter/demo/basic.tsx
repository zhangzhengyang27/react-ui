import React from 'react';
import { Splitter } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Splitter style={{ height: 200 }}>
      <Splitter.Panel>左侧面板</Splitter.Panel>
      <Splitter.Panel>右侧面板</Splitter.Panel>
    </Splitter>
  </DemoWrap>
);

export default App;
