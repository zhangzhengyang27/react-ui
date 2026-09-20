import { Input, InputWrapperProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputWrapperOnlyControls } from '../../shared';

const code = `
import { Input } from '@xiaoye-react/ui';

function Wrapper() {
  return (
    <Input.Wrapper{{props}}>
      <Input placeholder="Input.Wrapper 内的输入" />
    </Input.Wrapper>
  );
}
`;

function Wrapper(props: InputWrapperProps) {
  return (
    <Input.Wrapper {...props}>
      <Input placeholder="Input.Wrapper 内的输入" />
    </Input.Wrapper>
  );
}

export const wrapper: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 440,
  controls: inputWrapperOnlyControls,
};
