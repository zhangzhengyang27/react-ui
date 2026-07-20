import { Box, Text, TextInput } from '@react-ui/ui';
import { useDebouncedState } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useDebouncedState } from '@react-ui/hooks';
import { TextInput, Text } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useDebouncedState('', 200);

  return (
    <>
      <TextInput
        label="输入值查看防抖效果"
        defaultValue={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Debounced value: {value}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useDebouncedState('', 200);

  return (
    <Box maw={400} mx="auto">
      <TextInput
        label="输入值查看防抖效果"
        placeholder="输入值查看防抖效果"
        defaultValue={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
      <Text mt="sm">
        <Text component="span" c="dimmed" size="sm">
          Debounced value:
        </Text>{' '}
        {value.trim() || '[empty string]'}
      </Text>
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
