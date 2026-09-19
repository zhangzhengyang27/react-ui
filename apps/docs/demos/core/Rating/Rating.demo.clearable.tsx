import { useState } from 'react';
import { Group, Rating, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Group, Rating, Stack, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState(3);

  return (
    <Stack gap="md" align="center">
      <Text size="sm">点击同一颗星清除评分</Text>
      <Rating value={value} onChange={setValue} clearable />
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
      <Text size="sm">点击同一颗星清除评分</Text>
      <Rating value={value} onChange={setValue} clearable />
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

export const clearable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
