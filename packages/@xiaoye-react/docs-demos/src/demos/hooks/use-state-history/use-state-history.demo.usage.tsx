import { Button, Code, Group, Text } from '@xiaoye-react/ui';
import { useStateHistory } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Code, Group, Text } from '@xiaoye-react/ui';
import { useStateHistory } from '@xiaoye-react/hooks';

function Demo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <>
      <Text>Current value: {value}</Text>
      <Group my="md">
        <Button onClick={() => handlers.set(Math.ceil(Math.random() * 100) + 1)}>设置值</Button>
        <Button onClick={() => handlers.back()}>返回</Button>
        <Button onClick={() => handlers.forward()}>前进</Button>
        <Button onClick={() => handlers.reset()}>重置</Button>
      </Group>
      <Code block>{JSON.stringify(history, null, 2)}</Code>
    </>
  );
}
`;

function Demo() {
  const [value, handlers, history] = useStateHistory(1);
  return (
    <>
      <Text>Current value: {value}</Text>
      <Group my="md">
        <Button onClick={() => handlers.set(Math.ceil(Math.random() * 100) + 1)}>设置值</Button>
        <Button onClick={() => handlers.back()}>返回</Button>
        <Button onClick={() => handlers.forward()}>前进</Button>
        <Button onClick={() => handlers.reset()}>重置</Button>
      </Group>
      <Code block>{JSON.stringify(history, null, 2)}</Code>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
