import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack, TagsInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { Stack, TagsInput } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <TagsInput
        label="clearSectionMode='both' (default)"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TagsInput
        label="clearSectionMode='rightSection'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TagsInput
        label="clearSectionMode='clear'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
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
      <TagsInput
        label="clearSectionMode='both' (default)"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <TagsInput
        label="clearSectionMode='rightSection'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <TagsInput
        label="clearSectionMode='clear'"
        placeholder="Enter tags"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue={['React']}
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="clear"
      />
    </Stack>
  );
}

export const clearSectionMode: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
