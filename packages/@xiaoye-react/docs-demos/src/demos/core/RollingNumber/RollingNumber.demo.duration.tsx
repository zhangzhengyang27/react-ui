import { useState } from 'react';
import { Button, Group, RollingNumber, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, Group, RollingNumber, Stack, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(500);

  return (
    <Stack>
      <div>
        <Text size="sm" c="dimmed">200ms</Text>
        <RollingNumber value={value} animationDuration={200} fz="28px" />
      </div>
      <div>
        <Text size="sm" c="dimmed">600ms (default)</Text>
        <RollingNumber value={value} animationDuration={600} fz="28px" />
      </div>
      <div>
        <Text size="sm" c="dimmed">1200ms</Text>
        <RollingNumber value={value} animationDuration={1200} fz="28px" />
      </div>
      <Group>
        <Button onClick={() => setValue(Math.floor(Math.random() * 1000))}>随机</Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(500);

  return (
    <Stack>
      <div>
        <Text size="sm" c="dimmed">
          200ms
        </Text>
        <RollingNumber value={value} animationDuration={200} fz="28px" />
      </div>
      <div>
        <Text size="sm" c="dimmed">
          600ms (default)
        </Text>
        <RollingNumber value={value} animationDuration={600} fz="28px" />
      </div>
      <div>
        <Text size="sm" c="dimmed">
          1200ms
        </Text>
        <RollingNumber value={value} animationDuration={1200} fz="28px" />
      </div>
      <Group>
        <Button onClick={() => setValue(Math.floor(Math.random() * 1000))}>随机</Button>
      </Group>
    </Stack>
  );
}

export const duration: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
