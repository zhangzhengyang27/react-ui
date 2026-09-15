import { DateTimePicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DateTimePicker } from '@xiaoye-react/ui';

function Demo() {
  return <DateTimePicker withSeconds label="选择日期和时间" placeholder="选择日期和时间" />;
}
`;

function Demo() {
  return <DateTimePicker withSeconds label="选择日期和时间" placeholder="选择日期和时间" />;
}

export const withSeconds: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
