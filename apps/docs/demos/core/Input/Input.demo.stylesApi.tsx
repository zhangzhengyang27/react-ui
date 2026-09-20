import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { CaretDownIcon } from '@phosphor-icons/react/dist/csr/CaretDown'
import { Input, InputProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { InputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  const at = <AtIcon size={16} />;
  const chevron = <CaretDownIcon size={16} />;
  return <Input{{props}} placeholder="输入组件" leftSection={at} rightSection={chevron} />;
}
`

function Demo(props: InputProps) {
    const at = <AtIcon size={16} />
    const chevron = <CaretDownIcon size={16} />
    return <Input placeholder="输入组件" leftSection={at} rightSection={chevron} {...props} />
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: InputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
