import { Button, Group, Text } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group, Button, Text } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text>Count: {count}</Text>
      <Group justify="center">
        <Button onClick={handlers.increment}>增加</Button>
        <Button onClick={handlers.decrement}>减少</Button>
        <Button onClick={handlers.reset}>重置</Button>
        <Button onClick={() => handlers.set(5)}>设为 5</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [count, handlers] = useCounter(0, { min: 0, max: 10 });

  return (
    <>
      <Text size="md" ta="center" py="xs">
        Count: {count}
      </Text>
      <Group justify="center">
        <Button size="xs" onClick={handlers.increment}>
          Increment
        </Button>
        <Button size="xs" onClick={handlers.decrement}>
          Decrement
        </Button>
        <Button size="xs" onClick={handlers.reset}>
          Reset
        </Button>
        <Button size="xs" onClick={() => handlers.set(5)}>
          Set 5
        </Button>
      </Group>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
