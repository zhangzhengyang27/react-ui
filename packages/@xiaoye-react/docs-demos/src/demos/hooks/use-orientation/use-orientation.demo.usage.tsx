import { Code, Text } from '@xiaoye-react/ui';
import { useOrientation } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Code, Text } from '@xiaoye-react/ui';
import { useOrientation } from '@xiaoye-react/hooks';

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

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
