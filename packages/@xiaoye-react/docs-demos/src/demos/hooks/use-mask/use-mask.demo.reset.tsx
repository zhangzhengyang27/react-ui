import { Button, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useMask } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, value, rawValue, reset } = useMask({
    mask: '(999) 999-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="电话号码" placeholder="(___) ___-____" />
      <Text size="sm" mt="sm">Masked: {value}</Text>
      <Text size="sm">Raw: {rawValue}</Text>
      <Group mt="xs">
        <Button size="xs" variant="default" onClick={reset}>重置</Button>
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
      <TextInput ref={ref} label="电话号码" placeholder="(___) ___-____" />
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

export const reset: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
