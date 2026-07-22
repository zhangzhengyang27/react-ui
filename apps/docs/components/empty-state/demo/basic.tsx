import React from 'react';
import { EmptyState, Text, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <EmptyState
      title="暂无数据"
      description="当前列表为空，请稍后再试"
      indicator={<Text size="xl">📭</Text>}
      actions={<Button variant="light">刷新</Button>}
    />
  </DemoWrap>
);

export default App;
