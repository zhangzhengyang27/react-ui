import { TimeInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../../shared';

const code = `
import { TimeInput } from '@xiaoye-react/dates';


function Demo() {
  return (
    <TimeInput
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
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
