import { Button, Code, Group, Text } from '@xiaoye-react/ui';
import { randomId, useHash } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useHash, randomId } from '@xiaoye-react/hooks';
import { Button, Text, Code } from '@xiaoye-react/ui';

function Demo() {
  const [hash, setHash] = useHash();
  return (
    <>
      <Button onClick={() => setHash(randomId())}>将 hash 设为随机字符串</Button>
      <Text>Current hash: <Code>{hash}</Code></Text>
    </>
  );
}`;

function Demo() {
  const [hash, setHash] = useHash();

  return (
    <>
      <Group justify="center">
        <Button onClick={() => setHash(randomId())}>将 hash 设为随机字符串</Button>
      </Group>

      <Text ta="center" mt="md">
        Current hash: <Code>{hash}</Code>
      </Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
