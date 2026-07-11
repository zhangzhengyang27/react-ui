import { Button, Group, Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, Group, Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, value, rawValue, reset } = useMask({
    mask: '(999) 999-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Phone number" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">Masked: {value}</Text>
      <Text size="sm">Raw: {rawValue}</Text>
      <Group mt="xs">
        <Button size="xs" variant="default" onClick={reset}>Reset</Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const { ref, value, rawValue, reset } = useMask({
    mask: '(999) 999-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Phone number" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">
        Masked: {value}
      </Text>
      <Text size="sm">Raw: {rawValue}</Text>
      <Group mt="xs">
        <Button size="xs" variant="default" onClick={reset}>
          Reset
        </Button>
      </Group>
    </>
  );
}

export const reset: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
