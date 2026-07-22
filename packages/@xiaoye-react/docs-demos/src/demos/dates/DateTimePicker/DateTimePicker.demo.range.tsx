import { DateTimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DateTimePicker } from '@xiaoye-react/dates';

function Demo() {
  return (
    <DateTimePicker
      type="range"
      label="选择日期和时间范围"
      placeholder="选择日期和时间范围"
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      type="range"
      label="选择日期和时间范围"
      placeholder="选择日期和时间范围"
    />
  );
}

export const range: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
