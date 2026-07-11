import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      value={value}
      onChange={setValue}
      multiple
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value.length > 0 ? value.join(', ') : 'Select frameworks'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <ComboboxPopover
      data={['React', 'Angular', 'Vue', 'Svelte']}
      value={value}
      onChange={setValue}
      multiple
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value.length > 0 ? value.join(', ') : 'Select frameworks'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const multiple: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
