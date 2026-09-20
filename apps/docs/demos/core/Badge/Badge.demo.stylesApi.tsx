import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Badge, BadgeProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { BadgeStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { Badge } from '@xiaoye-react/ui';
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
function Demo() {
  const icon = <AtIcon size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon}{{props}}>
      Badge component
    </Badge>
  );
}
`

function Demo(props: BadgeProps) {
    const icon = <AtIcon size={12} />

    return (
        <Badge leftSection={icon} rightSection={icon} {...props}>
            Badge component
        </Badge>
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: BadgeStylesApi,
    component: Demo,
    centered: true,
    code
}
