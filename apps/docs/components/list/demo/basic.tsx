import React from 'react';
import { List } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <List>
      <List.Item>列表项 1</List.Item>
      <List.Item>列表项 2</List.Item>
      <List.Item>列表项 3</List.Item>
    </List>
  </DemoWrap>
);

export default App;
