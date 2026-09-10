import { MoonIcon } from '@phosphor-icons/react/dist/csr/Moon'
import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun'
import { Rating } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Rating } from '@xiaoye-react/ui';
import { SunIcon } from '@phosphor-icons/react/dist/csr/Sun';
import { MoonIcon } from '@phosphor-icons/react/dist/csr/Moon';
function Demo() {
  return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />;
}
`

function Demo() {
    return <Rating emptySymbol={<SunIcon size={16} />} fullSymbol={<MoonIcon size={16} />} />
}

export const symbol: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true
}
