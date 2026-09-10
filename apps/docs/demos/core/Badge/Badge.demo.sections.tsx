import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Badge, Group } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Badge, Group } from '@xiaoye-react/ui';
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
function Demo() {
  const icon = <AtIcon size={12} />;
  return (
    <Group>
      <Badge leftSection={icon}>带左侧区域</Badge>
      <Badge rightSection={icon}>带右侧区域</Badge>
    </Group>
  );
}
`

function Demo() {
    const icon = <AtIcon size={12} />
    return (
        <Group>
            <Badge leftSection={icon}>带左侧区域</Badge>
            <Badge rightSection={icon}>带右侧区域</Badge>
        </Group>
    )
}

export const sections: UIDemo = {
    type: 'code',
    component: Demo,
    centered: true,
    code
}
