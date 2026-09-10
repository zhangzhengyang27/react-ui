import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { HashIcon } from '@phosphor-icons/react/dist/csr/Hash'
import { NativeSelect } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { NativeSelect } from '@xiaoye-react/ui';
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
import { HashIcon } from '@phosphor-icons/react/dist/csr/Hash';
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
`

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
    )
}

export const sections: UIDemo = {
    type: 'code',
    component: Demo,
    maxWidth: 340,
    centered: true,
    code
}
