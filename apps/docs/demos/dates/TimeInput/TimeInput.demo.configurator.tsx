import { TimeInput, TimeInputProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';

const code = `
import { TimeInput } from '@xiaoye-react/ui';


function Demo() {
  return (
    <TimeInput
      {{props}}
    />
  );
}
`;

function Wrapper(props: TimeInputProps) {
  return <TimeInput {...props} />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
