import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Autocomplete, AutocompleteProps } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { AutocompleteStylesApi } from '@xiaoye-react/docs-styles-api'

const code = `
import { AtIcon } from '@phosphor-icons/react/dist/csr/At';
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Autocomplete
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="自动完成"
      description="描述"
      error="错误"
      placeholder="自动完成"
      data={['React', 'Angular']}
    />
  );
}
`

function Demo(props: AutocompleteProps) {
    return (
        <Autocomplete
            {...props}
            leftSection={<AtIcon size={18} />}
            withAsterisk
            label="自动完成"
            description="描述"
            placeholder="自动完成"
            data={[
                { value: 'React', group: 'Frontend' },
                { value: 'Angular', group: 'Frontend' },
                { value: 'Node', group: 'Backend' },
                { value: 'Django', group: 'Backend' }
            ]}
        />
    )
}

const data = { ...AutocompleteStylesApi }
delete (data as any).selectors.empty

export const stylesApi: UIDemo = {
    type: 'styles-api',
    data,
    component: Demo,
    code,
    centered: true,
    maxWidth: 340
}
