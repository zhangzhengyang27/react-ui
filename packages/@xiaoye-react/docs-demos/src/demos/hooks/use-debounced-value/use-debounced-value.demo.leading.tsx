import { useState } from 'react';
import { Box, Text, TextInput } from '@xiaoye-react/ui';
import { useDebouncedValue } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { useDebouncedValue } from '@xiaoye-react/hooks';
import { TextInput, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200, { leading: true });

  return (
    <>
      <TextInput
        label="输入值查看防抖"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />

      <Text>Value: {value}</Text>
      <Text>Debounced value: {debounced}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200, { leading: true });

  return (
    <Box maw={400} mx="auto">
      <TextInput
        label="输入值查看防抖效果"
        placeholder="输入值查看防抖效果"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
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

export const leading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
