import { DatePickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        firstDayOfWeek={0}
        label="周日作为一周第一天"
        placeholder="周日作为一周第一天"
        mb="md"
      />
      <DatePickerInput
        firstDayOfWeek={6}
        label="周六作为一周第一天"
        placeholder="周六作为一周第一天"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <DatePickerInput
        firstDayOfWeek={0}
        label="周日作为一周第一天"
        placeholder="周日作为一周第一天"
        mb="md"
      />
      <DatePickerInput
        firstDayOfWeek={6}
        label="周六作为一周第一天"
        placeholder="周六作为一周第一天"
      />
    </>
  );
}

export const firstDayOfWeek: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
