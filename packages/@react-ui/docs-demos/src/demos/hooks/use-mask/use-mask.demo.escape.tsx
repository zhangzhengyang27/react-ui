import { Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TextInput, Text } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\A-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Product code" placeholder="A-____" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '\\A-9999',
  });

  return (
    <>
      <TextInput ref={ref} label="Product code" placeholder="A-____" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const escape: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
