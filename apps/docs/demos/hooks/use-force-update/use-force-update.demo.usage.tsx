import { useId, useState } from 'react';
import { Button, Group, Text } from '@react-ui/ui';
import { randomId, useForceUpdate } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useId, useState } from 'react';
import { Button, Text, Group } from '@react-ui/ui';
import { useForceUpdate, randomId } from '@react-ui/hooks';

function Demo() {
  const forceUpdate = useForceUpdate();
  const [id, setId] = useState(useId());

  return (
    <Group justify="center">
      <Text>{id}</Text>
      <Button onClick={() => { setId(randomId()); forceUpdate(); }}>强制更新</Button>
    </Group>
  );
}
`;

function Demo() {
  const forceUpdate = useForceUpdate();
  const [id, setId] = useState(useId());

  return (
    <Group justify="center">
      <Text>{id}</Text>
      <Button onClick={() => { setId(randomId()); forceUpdate(); }}>强制更新</Button>
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
