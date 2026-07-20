import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { gradientControls } from '../../shared';

const code = (props: any) => `
import { Button } from '@react-ui/ui';

function Demo() {
  return (
    <Button
      variant="gradient"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      渐变按钮
    </Button>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Button
      variant="gradient"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      渐变按钮
    </Button>
  );
}

export const gradient: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  title: '渐变背景',
  description: '使用 gradient 属性为按钮设置线性渐变背景。',
  centered: true,
  controls: gradientControls,
};
