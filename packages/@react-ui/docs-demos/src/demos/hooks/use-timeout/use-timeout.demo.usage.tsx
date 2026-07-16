import { useState } from 'react';
import { Button, Group, Text } from '@react-ui/ui';
import { randomId, useTimeout } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, Text, Group } from '@react-ui/ui';
import { randomId, useTimeout } from '@react-ui/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Group>
      <Button onClick={start}>开始</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value}</Text>
    </Group>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');
  const { start, clear } = useTimeout(() => setValue(randomId()), 1000);

  return (
    <Group>
      <Button onClick={start}>开始</Button>
      <Button onClick={clear} color="red">
        Clear
      </Button>
      <Text>Random value: {value}</Text>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
