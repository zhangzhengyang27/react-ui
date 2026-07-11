import { DatePickerInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { DatePickerInput } from '@react-ui/dates';

function Demo() {
  return (
    <>
      <DatePickerInput
        maxLevel="year"
        label="Year max level"
        placeholder="Year max level"
        mb="md"
      />
      <DatePickerInput
        maxLevel="month"
        label="Month max level"
        placeholder="Month max level"
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
        label="Year max level"
        placeholder="Year max level"
        mb="md"
      />
      <DatePickerInput maxLevel="month" label="Month max level" placeholder="Month max level" />
    </>
  );
}

export const maxLevel: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
