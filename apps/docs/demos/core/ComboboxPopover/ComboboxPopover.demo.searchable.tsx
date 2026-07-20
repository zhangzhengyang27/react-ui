import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      value={value}
      onChange={setValue}
      searchable
      nothingFoundMessage="未找到..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || '选择框架'}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      value={value}
      onChange={setValue}
      searchable
      nothingFoundMessage="未找到..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || '选择框架'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const searchable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
