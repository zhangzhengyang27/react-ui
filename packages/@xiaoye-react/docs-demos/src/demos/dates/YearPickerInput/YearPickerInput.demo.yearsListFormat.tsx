import { useState } from 'react';
import { YearPickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { YearPickerInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPickerInput
      yearsListFormat="YY"
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
      yearsListFormat="YY"
      label="选择年份"
      placeholder="选择年份"
      value={value}
      onChange={setValue}
    />
  );
}

export const yearsListFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
