import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputControls } from '../../shared';

const code = `
import { FileInput } from '@react-ui/ui';


function Demo() {
  return (
    <FileInput
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: any) {
  return <FileInput {...props} placeholder="输入占位符" />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
