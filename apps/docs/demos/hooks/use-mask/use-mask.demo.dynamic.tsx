import { Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

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
      <TextInput ref={ref} label="信用卡号" placeholder="输入卡号" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
      <Text size="xs" c="dimmed">尝试以 34 或 37 开头以使用 Amex 格式</Text>
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
      <TextInput ref={ref} label="信用卡号" placeholder="输入卡号" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
      <Text size="xs" c="dimmed">
        Try starting with 34 or 37 for Amex format
      </Text>
    </>
  );
}

export const dynamic: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
