import { useState } from 'react';
import { Group, Rating, Stack, Text } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Group, Rating, Stack, Text } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState(3);

  return (
    <Stack gap="md" align="center">
      <Text size="sm">Click the same star to clear the rating</Text>
      <Rating value={value} onChange={setValue} allowClear />
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Current rating:
        </Text>
        <Text size="sm" fw={600}>
          {value === 0 ? 'Not rated' : value}
        </Text>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(3);

  return (
    <Stack gap="md" align="center">
      <Text size="sm">Click the same star to clear the rating</Text>
      <Rating value={value} onChange={setValue} allowClear />
      <Group gap="xs">
        <Text size="sm" c="dimmed">
          Current rating:
        </Text>
        <Text size="sm" fw={600}>
          {value === 0 ? 'Not rated' : value}
        </Text>
      </Group>
    </Stack>
  );
}

export const allowClear: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
