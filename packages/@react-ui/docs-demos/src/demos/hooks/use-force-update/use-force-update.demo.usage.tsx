import { Button, Group, Text } from '@react-ui/ui';
import { randomId, useForceUpdate } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, Text, Group } from '@react-ui/ui';
import { useForceUpdate, randomId } from '@react-ui/hooks';

function Demo() {
  const forceUpdate = useForceUpdate();

  return (
    <Group justify="center">
      <Text>{randomId()}</Text>
      <Button onClick={forceUpdate}>Force update</Button>
    </Group>
  );
}
`;

function Demo() {
  const forceUpdate = useForceUpdate();

  return (
    <Group justify="center">
      <Text>{randomId()}</Text>
      <Button onClick={forceUpdate}>Force update</Button>
    </Group>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
