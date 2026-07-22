import React from 'react';
import { Card, Text, Group, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 340 }}>
      <Text size="lg" fw={500}>卡片标题</Text>
      <Text size="sm" c="dimmed">这是一段卡片描述内容。</Text>
      <Group mt="md">
        <Button variant="light" color="blue" fullWidth>查看详情</Button>
      </Group>
    </Card>
  </DemoWrap>
);

export default App;
