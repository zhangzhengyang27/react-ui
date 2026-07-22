import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker defaultDate="2040-02-01" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker defaultDate="2040-02-01" value={value} onChange={setValue} />;
}

export const defaultDate: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
