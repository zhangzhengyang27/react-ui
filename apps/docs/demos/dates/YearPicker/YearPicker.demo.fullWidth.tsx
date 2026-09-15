import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { YearPicker } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker fullWidth value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker fullWidth value={value} onChange={setValue} />;
}

export const fullWidth: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 600,
  component: Demo,
  code,
};
