import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker fullWidth value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker fullWidth value={value} onChange={setValue} />;
}

export const fullWidth: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 600,
  component: Demo,
  code,
};
