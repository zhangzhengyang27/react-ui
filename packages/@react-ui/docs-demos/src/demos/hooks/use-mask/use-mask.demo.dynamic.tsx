import { Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { TextInput, Text } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '9999 9999 9999 9999',
    modify: (value) => {
      const digits = value.replace(/\\D/g, '');
      if (digits.startsWith('34') || digits.startsWith('37')) {
        return { mask: '9999 999999 99999' };
      }
    },
  });

  return (
    <>
      <TextInput ref={ref} label="Credit card number" placeholder="Enter card number" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Text size="xs" c="dimmed">Try starting with 34 or 37 for Amex format</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: '9999 9999 9999 9999',
    modify: (value) => {
      const digits = value.replace(/\D/g, '');
      if (digits.startsWith('34') || digits.startsWith('37')) {
        return { mask: '9999 999999 99999' };
      }
    },
  });

  return (
    <>
      <TextInput ref={ref} label="Credit card number" placeholder="Enter card number" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
      <Text size="xs" c="dimmed">
        Try starting with 34 or 37 for Amex format
      </Text>
    </>
  );
}

export const dynamic: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
