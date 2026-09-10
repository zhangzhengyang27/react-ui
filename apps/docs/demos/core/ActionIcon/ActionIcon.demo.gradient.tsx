import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart'
import { ActionIcon } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { gradientControls } from '../../shared'

const code = (props: any) => `
import { ActionIcon } from '@xiaoye-react/ui';
import { HeartIcon } from '@phosphor-icons/react/dist/csr/Heart';
function Demo() {
  return (
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="渐变操作图标"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      <HeartIcon />
    </ActionIcon>
  );
}
`

function Wrapper(props: any) {
    return (
        <ActionIcon
            variant="gradient"
            size="xl"
            aria-label="渐变操作图标"
            gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
        >
            <HeartIcon />
        </ActionIcon>
    )
}

export const gradient: UIDemo = {
    type: 'configurator',
    component: Wrapper,
    code,
    centered: true,
    controls: gradientControls
}
