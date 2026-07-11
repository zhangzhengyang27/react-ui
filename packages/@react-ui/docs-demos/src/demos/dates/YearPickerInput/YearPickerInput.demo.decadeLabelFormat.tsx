import { useState } from 'react';
import { YearPickerInput } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { YearPickerInput } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      decadeLabelFormat="YY"
      label="Pick year"
      placeholder="Pick year"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      decadeLabelFormat="YY"
      label="Pick year"
      placeholder="Pick year"
      value={value}
      onChange={setValue}
    />
  );
}

export const decadeLabelFormat: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
