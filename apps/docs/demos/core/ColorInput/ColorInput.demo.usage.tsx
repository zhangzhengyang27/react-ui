import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputControls } from '../../shared';

const code = `
import { ColorInput } from '@react-ui/ui';


function Demo() {
  return (
    <ColorInput
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: any) {
  return <ColorInput {...props} placeholder="输入占位符" />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
