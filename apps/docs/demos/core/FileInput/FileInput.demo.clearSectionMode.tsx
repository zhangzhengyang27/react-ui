import { CaretDownIcon } from '@phosphor-icons/react';
import { FileInput, Stack } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { CaretDownIcon } from '@phosphor-icons/react';
import { FileInput, Stack } from '@react-ui/ui';

function Demo() {
  return (
    <Stack>
      <FileInput
        label="clearSectionMode='both'（默认）"
        placeholder="选择文件"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <FileInput
        label="clearSectionMode='rightSection'"
        placeholder="选择文件"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <FileInput
        label="clearSectionMode='clear'"
        placeholder="选择文件"
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
      <FileInput
        label="clearSectionMode='both'（默认）"
        placeholder="选择文件"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="both"
      />

      <FileInput
        label="clearSectionMode='rightSection'"
        placeholder="选择文件"
        clearable
        rightSection={<CaretDownIcon size={16} />}
        clearSectionMode="rightSection"
      />

      <FileInput
        label="clearSectionMode='clear'"
        placeholder="选择文件"
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
