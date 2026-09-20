import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Select, SelectProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { SelectStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="选择"
      description="描述"
      error="错误"
      placeholder="选择"
      data={['React', 'Angular']}
    />
  );
}
`

function Demo(props: SelectProps) {
    return (
        <Select
            {...props}
            leftSection={<AtIcon size={18} />}
            withAsterisk
            label="选择"
            description="描述"
            placeholder="选择"
            data={[
                { value: 'React', label: 'React', group: 'Frontend' },
                { value: 'Angular', label: 'Angular', group: 'Frontend' },
                { value: 'Node', label: 'Node', group: 'Backend' },
                { value: 'Django', label: 'Django', group: 'Backend' }
            ]}
        />
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: SelectStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
