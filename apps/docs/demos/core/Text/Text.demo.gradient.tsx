import { Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { GradientDemoProps, gradientControls } from '../../shared';

const code = (props: Record<string, any>) => `
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      Gradient Text
    </Text>
  );
}
`;

function Wrapper(props: GradientDemoProps) {
  return (
    <Text
      size="xl"
      fw={900}
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      Gradient Text
    </Text>
  );
}

export const gradient: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: gradientControls,
};
