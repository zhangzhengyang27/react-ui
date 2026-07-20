import { useState } from 'react';
import { Button, ComboboxPopover } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

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
      nothingFoundMessage="未找到..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || '选择选项'}</Button>
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
      nothingFoundMessage="未找到..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>
          {value || '选择选项'}
        </Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}

export const limit: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
