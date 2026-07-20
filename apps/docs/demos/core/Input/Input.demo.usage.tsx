import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputOnlyControls } from '../../shared';

const code = `
import { Input } from '@react-ui/ui';

function Demo() {
  return <Input{{props}} placeholder="输入组件" />;
}
`;

function Wrapper(props: any) {
  return <Input placeholder="输入组件" {...props} />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputOnlyControls,
};
