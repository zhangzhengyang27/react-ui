import React from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      <Button size="xs">xs</Button>
      <Button size="sm">sm（默认）</Button>
      <Button size="md">md</Button>
      <Button size="lg">lg</Button>
      <Button size="xl">xl</Button>
    </Group>
    <Group mt="md">
      <Button size="compact-xs">compact-xs</Button>
      <Button size="compact-sm">compact-sm</Button>
      <Button size="compact-md">compact-md</Button>
      <Button size="compact-lg">compact-lg</Button>
      <Button size="compact-xl">compact-xl</Button>
    </Group>
    <Group mt="md">
      <Button size="sm" radius="xs">radius xs</Button>
      <Button size="sm" radius="md">radius md</Button>
      <Button size="sm" radius="lg">radius lg</Button>
      <Button size="sm" radius="xl">radius xl</Button>
      <Button size="sm" radius={20}>radius 20</Button>
    </Group>
  </DemoWrap>
);

export default App;
