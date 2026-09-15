import { DatePickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { DatePickerInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <DatePickerInput
        defaultLevel="decade"
        label="十年层级"
        placeholder="十年层级"
        mb="md"
      />
      <DatePickerInput
        defaultLevel="year"
        label="年份层级"
        placeholder="年份层级"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <DatePickerInput
        defaultLevel="decade"
        label="十年层级"
        placeholder="十年层级"
        mb="md"
      />
      <DatePickerInput defaultLevel="year" label="年份层级" placeholder="年份层级" />
    </>
  );
}

export const defaultLevel: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
