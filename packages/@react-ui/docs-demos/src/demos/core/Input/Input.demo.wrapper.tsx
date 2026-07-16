import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputWrapperOnlyControls } from '../../../shared';

const code = `
import { Input } from '@react-ui/ui';

function Wrapper() {
  return (
    <Input.Wrapper{{props}}>
      <Input placeholder="Input.Wrapper 内的输入" />
    </Input.Wrapper>
  );
}
`;

function Wrapper(props: any) {
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
