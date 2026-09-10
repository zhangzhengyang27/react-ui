import { AtIcon } from '@phosphor-icons/react/dist/csr/At'
import { Autocomplete } from '@xiaoye-react/ui'
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

function Demo(props: any) {
    return (
        <Autocomplete
            {...props}
            dropdownOpened
            leftSection={<AtIcon size={18} />}
            withAsterisk
            label="自动完成"
            description="描述"
            placeholder="自动完成"
            comboboxProps={{ hideDetached: false }}
            data={[
                { group: 'Frontend', items: ['React', 'Angular'] },
                { group: 'Backend', items: ['Node', 'Django'] }
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
