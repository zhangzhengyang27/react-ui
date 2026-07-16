import { JsonInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { inputControls } from '../../../shared';

const code = `
import { JsonInput } from '@react-ui/ui';


function Demo() {
  return (
    <JsonInput
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: any) {
  return <JsonInput {...props} placeholder="输入占位符" />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
