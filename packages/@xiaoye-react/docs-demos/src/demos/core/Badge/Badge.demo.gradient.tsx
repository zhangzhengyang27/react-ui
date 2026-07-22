import { Badge } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { gradientControls } from '../../../shared';

const code = (props: any) => `
import { Badge } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      Gradient badge
    </Badge>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Badge
      size="xl"
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      Gradient badge
    </Badge>
  );
}

export const gradient: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: gradientControls,
};
