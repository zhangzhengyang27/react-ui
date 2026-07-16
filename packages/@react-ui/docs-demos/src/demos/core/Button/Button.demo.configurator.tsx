import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { interactiveVariantsControl } from '../../../shared';

const code = `
import { Button } from '@react-ui/ui';

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
  centered: true,
  controls: [
    interactiveVariantsControl,
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: 'md' },
  ],
};
