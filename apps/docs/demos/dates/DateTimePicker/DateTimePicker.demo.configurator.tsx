import { DateTimePicker } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';
import { inputControls } from '../../shared';

const code = `
import { DateTimePicker } from '@react-ui/dates';


function Demo() {
  return (
    <DateTimePicker
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: any) {
  return <DateTimePicker {...props} placeholder="输入占位符" />;
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 400,
  controls: inputControls,
};
