import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { JsonInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { JsonInputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { JsonInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <JsonInput
      label="标签"
      placeholder="JSON 输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      minRows={4}
      {{props}}
    />
  );
}
`

function Demo(props: any) {
    return (
        <JsonInput
            label="标签"
            placeholder="JSON 输入"
            description="描述"
            error="错误"
            withAsterisk
            leftSection={<AtIcon size={18} />}
            minRows={4}
            {...props}
        />
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: JsonInputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
