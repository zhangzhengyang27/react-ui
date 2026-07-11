import { useState } from 'react';
import { MonthPickerInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { MonthPickerInput } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      label="Pick month"
      placeholder="Pick month"
      value={value}
      onChange={setValue}
    />
  );
}

export const labelFormat: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
