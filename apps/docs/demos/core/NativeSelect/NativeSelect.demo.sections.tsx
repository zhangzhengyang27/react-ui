import { CaretDownIcon, HashIcon } from '@phosphor-icons/react';
import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';
import { CaretDownIcon, HashIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <>
      <NativeSelect
        leftSection={<HashIcon size={16} />}
        leftSectionPointerEvents="none"
        label="左侧区域"
        data={['React', 'Angular']}
      />

      <NativeSelect
        rightSection={<CaretDownIcon size={16} />}
        label="右侧区域"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NativeSelect
        leftSection={<HashIcon size={16} />}
        leftSectionPointerEvents="none"
        label="左侧区域"
        data={['React', 'Angular']}
      />

      <NativeSelect
        rightSection={<CaretDownIcon size={16} />}
        label="右侧区域"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
