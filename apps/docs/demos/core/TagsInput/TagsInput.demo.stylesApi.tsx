import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { TagsInput, TagsInputProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { TagsInputStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <TagsInput
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="标签输入"
      description="描述"
      error="错误"
      placeholder="标签输入"
      defaultValue={['First', 'Second']}
      data={['React', 'Angular']}
    />
  );
}
`

function Demo(props: TagsInputProps) {
    return (
        <TagsInput
            {...props}
            leftSection={<AtIcon size={18} />}
            withAsterisk
            label="标签输入"
            description="描述"
            placeholder="标签输入"
            defaultValue={['First', 'Second']}
            data={[
                { value: 'React', group: 'Frontend' },
                { value: 'Angular', group: 'Frontend' },
                { value: 'Node', group: 'Backend' },
                { value: 'Django', group: 'Backend' }
            ]}
        />
    )
}

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data: TagsInputStylesApi,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
