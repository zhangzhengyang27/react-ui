import { useState } from 'react';
import { Text, Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Text, Textarea } from '@react-ui/ui';

function Demo() {
  const maxLength = 500;
  const [value, setValue] = useState('');

  return (
    <Textarea
      label="Your message"
      placeholder="Type your message..."
      autosize
      minRows={4}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value.slice(0, maxLength))}
      bottomSection={
        <Text size="xs" c="dimmed">
          {value.length}/{maxLength} characters
        </Text>
      }
    />
  );
}
`;

function Demo() {
  const maxLength = 500;
  const [value, setValue] = useState('');

  return (
    <Textarea
      label="Your message"
      placeholder="Type your message..."
      autosize
      minRows={4}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value.slice(0, maxLength))}
      bottomSection={
        <Text size="xs" c="dimmed">
          {value.length}/{maxLength} characters
        </Text>
      }
    />
  );
}

export const bottomSection: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  maxWidth: 340,
  centered: true,
};
