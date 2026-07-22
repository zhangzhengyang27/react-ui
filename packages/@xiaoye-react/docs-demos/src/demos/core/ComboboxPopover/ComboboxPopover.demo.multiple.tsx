import { useState } from 'react';
import { Button, ComboboxPopover } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover } from '@xiaoye-react/ui';

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
          {value.length > 0 ? value.join(', ') : '选择框架'}
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
          {value.length > 0 ? value.join(', ') : '选择框架'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const multiple: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
