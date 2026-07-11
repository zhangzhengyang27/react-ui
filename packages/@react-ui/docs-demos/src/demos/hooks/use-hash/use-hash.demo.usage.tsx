import { Button, Code, Group, Text } from '@react-ui/ui';
import { randomId, useHash } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useHash, randomId } from '@react-ui/hooks';
import { Button, Text, Code } from '@react-ui/ui';

function Demo() {
  const [hash, setHash] = useHash();
  return (
    <>
      <Button onClick={() => setHash(randomId())}>Set hash to random string</Button>
      <Text>Current hash: <Code>{hash}</Code></Text>
    </>
  );
}`;

function Demo() {
  const [hash, setHash] = useHash();

  return (
    <>
      <Group justify="center">
        <Button onClick={() => setHash(randomId())}>Set hash to random string</Button>
      </Group>

      <Text ta="center" mt="md">
        Current hash: <Code>{hash}</Code>
      </Text>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
