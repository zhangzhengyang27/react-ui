import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}

export const minMax: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
