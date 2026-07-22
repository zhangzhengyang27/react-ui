import { useState } from 'react';
import { MonthPickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MonthPickerInput } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
      minDate={new Date(2022, 1)}
      maxDate={new Date(2022, 8)}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
      minDate={new Date(2022, 1)}
      maxDate={new Date(2022, 8)}
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
