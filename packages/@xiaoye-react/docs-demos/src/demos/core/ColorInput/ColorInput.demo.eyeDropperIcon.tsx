import { CrosshairIcon } from '@phosphor-icons/react/dist/csr/Crosshair'
import { ColorInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ColorInput } from '@xiaoye-react/ui';
import { CrosshairIcon } from '@phosphor-icons/react/dist/csr/Crosshair';
function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<CrosshairIcon size={18} />}
      label="自定义取色器图标"
      placeholder="选择颜色"
    />
  );
}
`

function Demo() {
    return <ColorInput eyeDropperIcon={<CrosshairIcon size={18} />} label="自定义取色器图标" placeholder="选择颜色" />
}

export const eyeDropperIcon: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
