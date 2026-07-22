import { Box, Code, Group, Text } from '@xiaoye-react/ui';
import { useMouse } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, Code, Group, Box } from '@xiaoye-react/ui';
import { useMouse } from '@xiaoye-react/hooks';

function Demo() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--ui-color-blue-light)" />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{\`{ x: \${x}, y: \${y} }\`}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--ui-color-blue-light)" />
      </Group>
      <Text ta="center" mt="sm">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
      </Text>
    </>
  );
}

export const ref: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
