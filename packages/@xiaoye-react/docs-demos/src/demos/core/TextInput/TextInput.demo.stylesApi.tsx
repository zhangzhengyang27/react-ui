import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { TextInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { TextInputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TextInput
      label="标签"
      placeholder="文本输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {{props}}
    />
  );
}
`

function Demo(props: any) {
    return (
        <TextInput
            label="标签"
            placeholder="文本输入"
            description="描述"
            error="错误"
            withAsterisk
            leftSection={<AtIcon size={18} />}
            {...props}
        />
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: TextInputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
