import { Button, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, isComplete, rawValue } = useMask({
    mask: 'AAA-9999',
    slotChar: 'XXX-0000',
    transform: (char) => char.toUpperCase(),
  });

  return (
    <>
      <TextInput ref={ref} label="优惠码" placeholder="输入优惠码" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Group mt="xs">
        <Button disabled={!isComplete} size="xs">应用代码</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const { ref, isComplete, rawValue } = useMask({
    mask: 'AAA-9999',
    slotChar: 'XXX-0000',
    transform: (char) => char.toUpperCase(),
  });

  return (
    <>
      <TextInput ref={ref} label="优惠码" placeholder="输入优惠码" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
      <Group mt="xs">
        <Button disabled={!isComplete} size="xs">
          Apply code
        </Button>
      </Group>
    </>
  );
}

export const complete: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
