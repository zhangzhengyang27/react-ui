import { useState } from 'react';
import { Box, Button, Group, Text, TextInput } from '@xiaoye-react/ui';
import { useDebouncedValue } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { useDebouncedValue } from '@xiaoye-react/hooks';
import { TextInput, Text, Button } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced, cancel] = useDebouncedValue(value, 1000);

  return (
    <>
      <TextInput
        label="输入值查看防抖"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Button onClick={cancel} size="lg">
        Cancel
      </Button>

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');
  const [debounced, cancel] = useDebouncedValue(value, 1000);

  return (
    <Box maw={400} mx="auto">
      <Group align="flex-end">
        <TextInput
          label="输入值查看防抖效果"
          placeholder="输入值查看防抖效果"
          value={value}
          style={{ flex: 1 }}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button onClick={cancel}>取消</Button>
      </Group>

      <Text mt="sm">
        <Text component="span" c="dimmed" size="sm">
          Value:
        </Text>{' '}
        {value.trim() || '[empty string]'}
      </Text>
      <Text>
        <Text component="span" c="dimmed" size="sm">
          Debounced value:
        </Text>{' '}
        {debounced.trim() || '[empty string]'}
      </Text>
    </Box>
  );
}

export const cancel: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
