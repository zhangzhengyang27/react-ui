import { useState } from 'react';
import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={[
        { group: 'Frontend', items: ['React', 'Angular', 'Vue'] },
        { group: 'Backend', items: ['Node.js', 'Django', 'Rails'] },
      ]}
      value={value}
      onChange={setValue}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || '选择技术'}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={[
        { group: 'Frontend', items: ['React', 'Angular', 'Vue'] },
        { group: 'Backend', items: ['Node.js', 'Django', 'Rails'] },
      ]}
      value={value}
      onChange={setValue}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || '选择技术'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const groups: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
