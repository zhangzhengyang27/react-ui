import { Text } from '@xiaoye-react/ui';
import { useViewportSize } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useViewportSize } from '@xiaoye-react/hooks';

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

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
