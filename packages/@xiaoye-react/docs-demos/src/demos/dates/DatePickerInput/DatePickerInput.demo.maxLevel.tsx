import { DatePickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePickerInput } from '@xiaoye-react/ui';

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
