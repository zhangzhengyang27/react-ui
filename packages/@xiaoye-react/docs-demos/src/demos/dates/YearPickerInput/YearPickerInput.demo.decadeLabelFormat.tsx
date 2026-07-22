import { useState } from 'react';
import { YearPickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { YearPickerInput } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      decadeLabelFormat="YY"
      label="选择年份"
      placeholder="选择年份"
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
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
    />
  );
}

export const decadeLabelFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
