import { Code, Text } from '@react-ui/ui';
import { useMousePosition } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Text, Code } from '@react-ui/ui';
import { useMousePosition } from '@react-ui/hooks';

function Demo() {
  const { x, y } = useMousePosition();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{\`{ x: \${x}, y: \${y} }\`}</Code>
    </Text>
  );
}`;

function Demo() {
  const { x, y } = useMousePosition();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${x}, y: ${y} }`}</Code>
    </Text>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
