import React from 'react';
import { Timeline, Text } from '@react-ui/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Timeline active={1} bulletSize={24} lineWidth={2}>
      <Timeline.Item title="订单已创建">
        <Text c="dimmed" size="sm">2024-01-01 10:00</Text>
      </Timeline.Item>
      <Timeline.Item title="支付成功">
        <Text c="dimmed" size="sm">2024-01-01 10:05</Text>
      </Timeline.Item>
      <Timeline.Item title="发货中">
        <Text c="dimmed" size="sm">等待揽收</Text>
      </Timeline.Item>
    </Timeline>
  </DemoWrap>
);

export default App;
