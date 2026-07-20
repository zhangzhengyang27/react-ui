import { Text, TextInput } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput, Text } from '@react-ui/ui';
import { useMask } from '@react-ui/hooks';

function Demo() {
  const { ref, rawValue } = useMask({
    mask: [/[0-2]/, /\\d/, ':', /[0-5]/, /\\d/],
  });

  return (
    <>
      <TextInput ref={ref} label="时间 (HH:MM)" placeholder="__:__" />
      <Text size="sm" mt="sm">Raw value: {rawValue}</Text>
    </>
  );
}
`;

function Demo() {
  const { ref, rawValue } = useMask({
    mask: [/[0-2]/, /\d/, ':', /[0-5]/, /\d/],
  });

  return (
    <>
      <TextInput ref={ref} label="时间 (HH:MM)" placeholder="__:__" />
      <Text size="sm" mt="sm">
        Raw value: {rawValue}
      </Text>
    </>
  );
}

export const regex: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
