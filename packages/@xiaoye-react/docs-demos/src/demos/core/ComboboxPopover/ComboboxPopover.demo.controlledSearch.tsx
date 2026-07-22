import { useState } from 'react';
import { Button, ComboboxPopover, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Button, ComboboxPopover, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        value={value}
        onChange={setValue}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>{value || '选择框架'}</Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>

      <Text mt="md" size="sm">
        搜索值：<b>{searchValue || '（空）'}</b>
      </Text>
      <Text size="sm">
        Selected value: <b>{value || '(none)'}</b>
      </Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <ComboboxPopover
        data={['React', 'Angular', 'Vue', 'Svelte']}
        value={value}
        onChange={setValue}
        searchable
        searchValue={searchValue}
        onSearchChange={setSearchValue}
      >
        <ComboboxPopover.Target>
          <Button variant="default" miw={200}>
            {value || '选择框架'}
          </Button>
        </ComboboxPopover.Target>
      </ComboboxPopover>

      <Text mt="md" size="sm">
        搜索值：<b>{searchValue || '（空）'}</b>
      </Text>
      <Text size="sm">
        Selected value: <b>{value || '(none)'}</b>
      </Text>
    </>
  );
}

export const controlledSearch: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
