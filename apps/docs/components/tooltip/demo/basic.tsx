import React from 'react';
import { Tooltip, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Tooltip label="提示文字">
      <Button>悬停查看提示</Button>
    </Tooltip>
  </DemoWrap>
);

export default App;
