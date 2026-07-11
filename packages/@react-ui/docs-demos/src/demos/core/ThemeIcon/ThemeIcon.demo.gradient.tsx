import { HeartIcon } from '@phosphor-icons/react';
import { ThemeIcon } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { gradientControls } from '../../../shared';

const code = (props: any) => `
import { ThemeIcon } from '@react-ui/ui';
import { HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      <HeartIcon />
    </ThemeIcon>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      <HeartIcon />
    </ThemeIcon>
  );
}

export const gradient: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: gradientControls,
};
