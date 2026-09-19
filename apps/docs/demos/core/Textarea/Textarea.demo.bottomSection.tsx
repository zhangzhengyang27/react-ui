import { useState } from 'react';
import { Text, Textarea } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Text, Textarea } from '@xiaoye-react/ui';

function Demo() {
  const maxLength = 500;
  const [value, setValue] = useState('');

  return (
    <Textarea
      label="你的消息"
      placeholder="输入你的消息..."
      minRows={4}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value.slice(0, maxLength))}
      __bottomSection={
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
      label="你的消息"
      placeholder="输入你的消息..."
      minRows={4}
      value={value}
      onChange={(event) => setValue(event.currentTarget.value.slice(0, maxLength))}
      __bottomSection={
        <Text size="xs" c="dimmed">
          {value.length}/{maxLength} characters
        </Text>
      }
    />
  );
}

export const bottomSection: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  maxWidth: 340,
  centered: true,
};
