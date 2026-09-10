import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Input } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Input } from '@xiaoye-react/ui';
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown';
function Demo() {
  return (
    <>
      <Input component="button" pointer>
        Button input
      </Input>

      <Input
        component="select"
        rightSection={<CaretDownIcon size={14} />}
        pointer
        mt="md"
      >
        <option value="1">1</option>
        <option value="2">2</option>
      </Input>
    </>
  );
}
`

function Demo() {
    return (
        <>
            <Input component="button" pointer>
                Button input
            </Input>

            <Input component="select" rightSection={<CaretDownIcon size={14} />} pointer mt="md">
                <option value="1">1</option>
                <option value="2">2</option>
            </Input>
        </>
    )
}

export const component: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
