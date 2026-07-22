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
      monthsListFormat="MM"
      yearsListFormat="YY"
      label="选择月份"
      placeholder="选择月份"
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
      monthsListFormat="MM"
      yearsListFormat="YY"
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
    />
  );
}

export const listFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
