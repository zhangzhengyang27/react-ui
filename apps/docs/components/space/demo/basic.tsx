import React from 'react';
import { Space, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Space>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
    </Space>
  </DemoWrap>
);

export default App;
