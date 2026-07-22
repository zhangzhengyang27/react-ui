import { DateInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';

const code = `
import { DateInput } from '@xiaoye-react/dates';


function Demo() {
  return (
    <DateInput
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: any) {
  return <DateInput {...props} placeholder="输入占位符" />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
