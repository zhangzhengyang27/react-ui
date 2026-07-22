import { useState } from 'react';
import { DatePickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { DatePickerInput } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="选择日期"
      placeholder="选择日期"
      value={value}
      onChange={setValue}
      hideWeekdays
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePickerInput
      label="选择日期"
      placeholder="选择日期"
      value={value}
      onChange={setValue}
      hideWeekdays
    />
  );
}

export const hideWeekdays: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
