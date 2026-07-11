import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';

const largeData = Array(1000)
  .fill(0)
  .map((_, index) => \`Option \${index}\`);

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={largeData}
      value={value}
      onChange={setValue}
      searchable
      limit={5}
      nothingFoundMessage="Nothing found..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || 'Select option'}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

const largeData = Array(1000)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={largeData}
      value={value}
      onChange={setValue}
      searchable
      limit={5}
      nothingFoundMessage="Nothing found..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || 'Select option'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const limit: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
