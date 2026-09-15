import { useState } from 'react';
import { MonthPickerInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MonthPickerInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPickerInput
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
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
      decadeLabelFormat="YY"
      yearLabelFormat="YYYY [year]"
      label="选择月份"
      placeholder="选择月份"
      value={value}
      onChange={setValue}
    />
  );
}

export const labelFormat: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
