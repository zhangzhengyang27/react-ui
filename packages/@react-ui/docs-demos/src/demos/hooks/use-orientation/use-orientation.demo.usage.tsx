import { Code, Text } from '@react-ui/ui';
import { useOrientation } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Code, Text } from '@react-ui/ui';
import { useOrientation } from '@react-ui/hooks';

function Demo() {
  const { angle, type } = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{angle}</Code>
      </Text>
      <Text>
        Type: <Code>{type}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const { angle, type } = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{angle}</Code>
      </Text>
      <Text>
        Type: <Code>{type}</Code>
      </Text>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
