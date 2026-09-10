import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Textarea } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { TextareaStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Textarea
      label="标签"
      placeholder="文本域"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      autosize
      {{props}}
    />
  );
}
`

function Demo(props: any) {
    return (
        <Textarea
            label="标签"
            placeholder="文本域"
            description="描述"
            error="错误"
            withAsterisk
            leftSection={<AtIcon size={18} />}
            autosize
            {...props}
        />
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: TextareaStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
