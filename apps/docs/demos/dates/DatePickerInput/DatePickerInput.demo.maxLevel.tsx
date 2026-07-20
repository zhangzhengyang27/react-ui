import { DatePickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        maxLevel="year"
        label="年份最大层级"
        placeholder="年份最大层级"
        mb="md"
      />
      <DatePickerInput
        maxLevel="month"
        label="月份最大层级"
        placeholder="月份最大层级"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <DatePickerInput
        maxLevel="year"
        label="年份最大层级"
        placeholder="年份最大层级"
        mb="md"
      />
      <DatePickerInput maxLevel="month" label="月份最大层级" placeholder="月份最大层级" />
    </>
  );
}

export const maxLevel: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
