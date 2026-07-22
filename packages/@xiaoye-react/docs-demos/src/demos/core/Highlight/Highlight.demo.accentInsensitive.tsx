import { Highlight, Stack, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Highlight, Stack, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={500} mb={5}>
          With accent-insensitive matching (default)
        </Text>
        <Highlight highlight="cafe">我们访问了 café 和 cafe。</Highlight>
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
        <Highlight highlight="cafe">我们访问了 café 和 cafe。</Highlight>
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

export const accentInsensitive: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
