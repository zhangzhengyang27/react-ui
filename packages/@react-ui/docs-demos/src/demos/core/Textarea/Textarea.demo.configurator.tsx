import { Textarea } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { inputControls } from '../../../shared';

const code = `
import { Textarea } from '@react-ui/ui';


function Demo() {
  return (
    <Textarea
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <Textarea {...props} placeholder="Input placeholder" />;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
