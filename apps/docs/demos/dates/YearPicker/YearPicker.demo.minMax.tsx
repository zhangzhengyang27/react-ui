import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPicker
      value={value}
      onChange={setValue}
      minDate="2021-02-01"
      maxDate="2028-02-01"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker value={value} onChange={setValue} minDate="2021-02-01" maxDate="2028-02-01" />;
}

export const minMax: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
