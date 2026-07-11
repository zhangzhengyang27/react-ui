import { useState } from 'react';
import { YearPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { YearPicker } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker decadeLabelFormat="YY" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker decadeLabelFormat="YY" value={value} onChange={setValue} />;
}

export const decadeLabelFormat: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
