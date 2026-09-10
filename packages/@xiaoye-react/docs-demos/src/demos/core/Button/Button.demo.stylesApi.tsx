import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Button } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { ButtonStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { Button } from '@xiaoye-react/ui';
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
function Demo() {
  return <Button{{props}} leftSection={<AtIcon size={16} />}>你的邮箱</Button>;
}
`

function Demo(props: any) {
    return (
        <Button leftSection={<AtIcon size={16} />} {...props}>
            你的邮箱
        </Button>
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: ButtonStylesApi,
    component: Demo,
    title: '样式 API',
    description: '通过 styles 或 classNames 自定义按钮内部元素样式。',
    code,
    centered: true
}
