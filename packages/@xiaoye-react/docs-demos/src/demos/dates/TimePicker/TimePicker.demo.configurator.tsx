import { TimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../../shared';

const code = `
import { TimePicker } from '@xiaoye-react/ui';


function Demo() {
  return (
    <TimePicker
      withDropdown
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
  return <TimePicker withDropdown {...props} />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
