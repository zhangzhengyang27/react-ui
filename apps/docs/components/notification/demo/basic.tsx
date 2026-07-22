import React from 'react';
import { Notification } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Notification title="默认通知">通知内容示例</Notification>
  </DemoWrap>
);

export default App;
