import { Button } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { interactiveVariantsControl } from '../../../shared';

const code = `
import { Button } from '@xiaoye-react/ui';

function Demo() {
  return <Button{{props}}>按钮</Button>;
}
`;

function Wrapper(props: any) {
  return <Button {...props}>按钮</Button>;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  title: '变体与尺寸',
  description: '通过配置面板调整按钮的变体、颜色、大小和圆角。',
  centered: true,
  controls: [
    interactiveVariantsControl,
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
  ],
};
