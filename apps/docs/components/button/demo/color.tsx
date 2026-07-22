import React from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const palette = ['blue', 'grape', 'violet', 'pink', 'red', 'orange', 'yellow', 'lime', 'green', 'teal', 'cyan'] as const;

const App: React.FC = () => (
  <DemoWrap>
    <Group>
      {palette.map((c) => (
        <Button key={c} color={c} variant="filled">
          {c}
        </Button>
      ))}
    </Group>
    <Group mt="md">
      {palette.map((c) => (
        <Button key={c} color={c} variant="light">
          {c}
        </Button>
      ))}
    </Group>
    <Group mt="md">
      {palette.map((c) => (
        <Button key={c} color={c} variant="outline">
          {c}
        </Button>
      ))}
    </Group>
  </DemoWrap>
);

export default App;
