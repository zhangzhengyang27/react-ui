import { Text } from '@react-ui/ui';
import { useViewportSize } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useViewportSize } from '@react-ui/hooks';

function Demo() {
  const { height, width } = useViewportSize();
  return <>Width: {width}, height: {height}</>;
}
`;

function Demo() {
  const { height, width } = useViewportSize();

  return (
    <Text ta="center">
      Width: {width}, height: {height}
    </Text>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
