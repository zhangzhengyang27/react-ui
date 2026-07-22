import { useState } from 'react';
import { Button, RingProgress, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, RingProgress, Stack, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value, color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>设置随机值</Button>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <Stack align="center">
      <RingProgress
        sections={[{ value, color: 'blue' }]}
        transitionDuration={250}
        label={<Text ta="center">{value}%</Text>}
      />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))}>设置随机值</Button>
    </Stack>
  );
}

export const transitions: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
