import { Input, InputProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputOnlyControls } from '../../shared';

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  return <Input{{props}} placeholder="输入组件" />;
}
`;

function Wrapper(props: InputProps) {
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
