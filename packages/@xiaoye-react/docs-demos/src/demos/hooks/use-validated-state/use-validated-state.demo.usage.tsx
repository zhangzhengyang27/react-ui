import { Box, Text, TextInput } from '@xiaoye-react/ui';
import { useValidatedState } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput, Text, Box } from '@xiaoye-react/ui';
import { useValidatedState } from '@xiaoye-react/hooks';

function Demo() {
  const [{ value, lastValidValue, valid }, setEmail] = useValidatedState(
    '',
    (val) => /^\\S+@\\S+$/.test(val),
    true
  );

  return (
    <Box maw={320} mx="auto" style={{ overflowWrap: 'break-word' }}>
      <TextInput
        value={value}
        onChange={(event) => setEmail(event.currentTarget.value)}
        withAsterisk
        error={!valid}
        placeholder="yourname@example.com"
        label="你的邮箱"
      />

      <Text size="sm" mt="md">
        <Text inherit c="dimmed" component="span">
          Current value:
        </Text>{' '}
        {value || '[empty string]'}
      </Text>

      <Text size="sm">
        <Text inherit c="dimmed" component="span">
          Last valid value:
        </Text>{' '}
        {lastValidValue || '[empty string]'}
      </Text>
    </Box>
  );
}
`;

function Demo() {
  const [{ value, lastValidValue, valid }, setEmail] = useValidatedState(
    '',
    (val) => /^\S+@\S+$/.test(val),
    true
  );

  return (
    <Box maw={320} mx="auto" style={{ overflowWrap: 'break-word' }}>
      <TextInput
        value={value}
        onChange={(event) => setEmail(event.currentTarget.value)}
        withAsterisk
        error={!valid}
        placeholder="yourname@example.com"
        label="你的邮箱"
      />

      <Text size="sm" mt="md">
        <Text inherit c="dimmed" component="span">
          Current value:
        </Text>{' '}
        {value || '[empty string]'}
      </Text>

      <Text size="sm">
        <Text inherit c="dimmed" component="span">
          Last valid value:
        </Text>{' '}
        {lastValidValue || '[empty string]'}
      </Text>
    </Box>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
