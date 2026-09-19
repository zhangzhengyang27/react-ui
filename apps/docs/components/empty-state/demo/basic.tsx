import React from 'react';
import { EmptyState, Text, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    {/* 图标走 icon 属性，操作区是 EmptyState.Actions 子组件而非 prop */}
    <EmptyState
      icon={<Text size="xl">📭</Text>}
      title="暂无数据"
      description="当前列表为空，请稍后再试"
    >
      <EmptyState.Actions>
        <Button variant="light">刷新</Button>
      </EmptyState.Actions>
    </EmptyState>
  </DemoWrap>
);

export default App;
