import { CaretDownIcon } from '@phosphor-icons/react';
import { Autocomplete, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { Autocomplete, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <Autocomplete
        label="clearSectionMode='both'（默认）"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <Autocomplete
        label="clearSectionMode='rightSection'"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <Autocomplete
        label="clearSectionMode='clear'"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Autocomplete
        label="clearSectionMode='both'（默认）"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <Autocomplete
        label="clearSectionMode='rightSection'"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <Autocomplete
        label="clearSectionMode='clear'"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}

export const clearSectionMode: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
