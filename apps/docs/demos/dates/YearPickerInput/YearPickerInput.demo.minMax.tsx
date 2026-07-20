import { useState } from 'react';
import { YearPickerInput } from '@react-ui/dates';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { YearPickerInput } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
      minDate={new Date(2021, 1)}
      maxDate={new Date(2028, 1)}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
      minDate={new Date(2021, 1)}
      maxDate={new Date(2028, 1)}
    />
  );
}

export const minMax: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
