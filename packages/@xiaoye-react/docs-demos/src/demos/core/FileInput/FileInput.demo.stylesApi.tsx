import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { FileInput } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { FileInputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { FileInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <FileInput
      label="标签"
      placeholder="文件输入"
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
        <FileInput
            label="标签"
            placeholder="文件输入"
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
    data: FileInputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
