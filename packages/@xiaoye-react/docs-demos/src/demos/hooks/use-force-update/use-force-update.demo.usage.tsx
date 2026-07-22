import { useId, useState } from 'react';
import { Button, Group, Text } from '@xiaoye-react/ui';
import { randomId, useForceUpdate } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useId, useState } from 'react';
import { Button, Text, Group } from '@xiaoye-react/ui';
import { useForceUpdate, randomId } from '@xiaoye-react/hooks';

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
