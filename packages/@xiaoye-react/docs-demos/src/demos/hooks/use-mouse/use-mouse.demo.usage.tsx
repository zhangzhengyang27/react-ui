import { Code, Text } from '@xiaoye-react/ui';
import { useMousePosition } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Text, Code } from '@xiaoye-react/ui';
import { useMousePosition } from '@xiaoye-react/hooks';

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

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
