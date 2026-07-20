import { useState } from 'react';
import { Button, Checkbox, Group, Stack } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Checkbox, Group, Stack } from '@react-ui/ui';
import { useRovingIndex } from '@react-ui/hooks';

const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

function Demo() {
  const [loop, setLoop] = useState(true);
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop,
  });

  return (
    <Stack>
      <Checkbox
        label="循环导航"
        checked={loop}
        onChange={(event) => setLoop(event.currentTarget.checked)}
      />
      <Group gap="xs">
        {items.map((item, index) => (
          <Button key={item} variant="default" {...getItemProps({ index })}>
            {item}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}
`;

const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];

function Demo() {
  const [loop, setLoop] = useState(true);
  const { getItemProps } = useRovingIndex({
    total: items.length,
    orientation: 'horizontal',
    loop,
  });

  return (
    <Stack>
      <Checkbox
        label="循环导航"
        checked={loop}
        onChange={(event) => setLoop(event.currentTarget.checked)}
      />
      <Group gap="xs">
        {items.map((item, index) => (
          <Button key={item} variant="default" {...getItemProps({ index })}>
            {item}
          </Button>
        ))}
      </Group>
    </Stack>
  );
}

export const loop: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
