import { useState } from 'react';
import { InlineDateTimePicker } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { InlineDateTimePicker } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);

  return (
    <InlineDateTimePicker
      type="range"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);

  return <InlineDateTimePicker type="range" value={value} onChange={setValue} />;
}

export const rangeControlled: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 280,
  component: Demo,
  code,
};
