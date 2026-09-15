import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}

export const defaultDate: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
