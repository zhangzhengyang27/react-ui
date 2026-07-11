import { Highlight, Stack, Text } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Highlight, Stack, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={500} mb={5}>
          With accent-insensitive matching (default)
        </Text>
        <Highlight highlight="cafe">We visited café and cafe.</Highlight>
      </div>

      <div>
        <Text size="sm" fw={500} mb={5}>
          {'With accent-sensitive matching (accentInsensitive={false})'}
        </Text>
        <Highlight highlight="cafe" accentInsensitive={false}>
          We visited café and cafe.
        </Highlight>
      </div>
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={500} mb={5}>
          With accent-insensitive matching (default)
        </Text>
        <Highlight highlight="cafe">We visited café and cafe.</Highlight>
      </div>

      <div>
        <Text size="sm" fw={500} mb={5}>
          {'With accent-sensitive matching (accentInsensitive={false})'}
        </Text>
        <Highlight highlight="cafe" accentInsensitive={false}>
          We visited café and cafe.
        </Highlight>
      </div>
    </Stack>
  );
}

export const accentInsensitive: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
