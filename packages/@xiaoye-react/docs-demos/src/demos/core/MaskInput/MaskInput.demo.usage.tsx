import { MaskInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../../shared';

const code = `
import { MaskInput } from '@xiaoye-react/ui';


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

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
