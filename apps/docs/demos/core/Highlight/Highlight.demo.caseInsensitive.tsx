import { Highlight, Stack, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Highlight, Stack, Text } from '@react-ui/ui';

function Demo() {
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" fw={500} mb={5}>
          不区分大小写匹配（默认）
        </Text>
        <Highlight highlight="this">高亮这个， definitely THIS 还有这个！</Highlight>
      </div>

      <div>
        <Text size="sm" fw={500} mb={5}>
          {'区分大小写匹配（caseInsensitive={false}）'}
        </Text>
        <Highlight highlight="this" caseInsensitive={false}>
          Highlight This, definitely THIS and also this!
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
          不区分大小写匹配（默认）
        </Text>
        <Highlight highlight="this">高亮这个， definitely THIS 还有这个！</Highlight>
      </div>

      <div>
        <Text size="sm" fw={500} mb={5}>
          {'区分大小写匹配（caseInsensitive={false}）'}
        </Text>
        <Highlight highlight="this" caseInsensitive={false}>
          Highlight This, definitely THIS and also this!
        </Highlight>
      </div>
    </Stack>
  );
}

export const caseInsensitive: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
