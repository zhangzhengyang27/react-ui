import { useState } from 'react';
import { Button, ComboboxItem, ComboboxPopover, OptionsFilter } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxItem, ComboboxPopover, OptionsFilter } from '@react-ui/ui';

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      value={value}
      onChange={setValue}
      searchable
      filter={optionsFilter}
      nothingFoundMessage="未找到..."
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || '选择框架'}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`;

const optionsFilter: OptionsFilter = ({ options, search }) => {
  const filtered = (options as ComboboxItem[]).filter((option) =>
    option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  filtered.sort((a, b) => a.label.localeCompare(b.label));
  return filtered;
};

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={['4 – React', '1 – Angular', '3 – Vue', '2 – Svelte']}
      value={value}
      onChange={setValue}
      searchable
      filter={optionsFilter}
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

export const sort: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
