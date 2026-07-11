import { MaskInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { inputControls } from '../../../shared';

const code = `
import { MaskInput } from '@react-ui/ui';


function Demo() {
  return (
    <MaskInput
      {{props}}
      mask="(999) 999-9999"
      placeholder="(___) ___-____"
    />
  );
}
`;

function Wrapper(props: any) {
  return <MaskInput {...props} mask="(999) 999-9999" placeholder="(___) ___-____" />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
