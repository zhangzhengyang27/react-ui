import { useState } from 'react';
import { MonthPicker } from '@react-ui/dates';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker fullWidth value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker fullWidth value={value} onChange={setValue} />;
}

export const fullWidth: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 600,
  component: Demo,
  code,
};
