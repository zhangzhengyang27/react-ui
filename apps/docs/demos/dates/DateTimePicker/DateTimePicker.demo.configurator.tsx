import { DateTimePicker, DateTimePickerProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';

const code = `
import { DateTimePicker } from '@xiaoye-react/ui';


function Demo() {
  return (
    <DateTimePicker
      {{props}}
      placeholder="输入占位符"
    />
  );
}
`;

function Wrapper(props: DateTimePickerProps) {
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
