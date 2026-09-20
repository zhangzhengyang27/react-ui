import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { NumberInput, NumberInputProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { NumberInputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { NumberInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <NumberInput
      label="标签"
      placeholder="数字输入"
      description="描述"
      error="错误"
      withAsterisk
      leftSection={<AtIcon size={18} />}
      {{props}}
    />
  );
}
`

function Demo(props: NumberInputProps) {
    return (
        <NumberInput
            label="标签"
            placeholder="数字输入"
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
    data: NumberInputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
