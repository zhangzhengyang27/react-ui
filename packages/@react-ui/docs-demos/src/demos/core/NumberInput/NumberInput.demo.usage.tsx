import { NumberInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { inputControls } from '../../../shared';

const code = `
import { NumberInput } from '@react-ui/ui';


function Demo() {
  return (
    <NumberInput
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <NumberInput {...props} placeholder="Input placeholder" />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
