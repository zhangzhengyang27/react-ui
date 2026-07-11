import { useState } from 'react';
import { Box, Button, Group, Text, TextInput } from '@react-ui/ui';
import { useDebouncedValue } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { useDebouncedValue } from '@react-ui/hooks';
import { TextInput, Text, Button } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState('');
  const [debounced, cancel] = useDebouncedValue(value, 1000);

  return (
    <>
      <TextInput
        label="Enter value to see debounce"
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
          label="Enter value to see debounce effect"
          placeholder="Enter value to see debounce effect"
          value={value}
          style={{ flex: 1 }}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Button onClick={cancel}>Cancel</Button>
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

export const cancel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
