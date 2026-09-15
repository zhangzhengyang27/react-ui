import dayjs from 'dayjs';
import { DateInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import dayjs from 'dayjs';
import { DateInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="日期输入"
      placeholder="日期输入"
    />
  );
}
`;

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="日期输入"
      placeholder="日期输入"
    />
  );
}

export const clearable: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
