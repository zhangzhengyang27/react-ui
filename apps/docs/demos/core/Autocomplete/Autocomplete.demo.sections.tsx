import { SquaresFourIcon } from '@phosphor-icons/react/dist/csr/SquaresFour'
import { Autocomplete } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Autocomplete } from '@xiaoye-react/ui';
import { SquaresFourIcon } from '@phosphor-icons/react/dist/csr/SquaresFour';
function Demo() {
  return (
    <Autocomplete
      data={['React', 'Angular', 'Vue']}
      leftSectionPointerEvents="none"
      leftSection={<SquaresFourIcon size={16} />}
      label="你最喜欢的库"
      placeholder="你最喜欢的库"
    />
  );
}
`

function Demo() {
    return (
        <Autocomplete
            data={['React', 'Angular', 'Vue']}
            leftSectionPointerEvents="none"
            leftSection={<SquaresFourIcon size={16} />}
            label="你最喜欢的库"
            placeholder="你最喜欢的库"
        />
    )
}

export const sections: UIDemo = {
    type: 'code',
    component: Demo,
    maxWidth: 340,
    centered: true,
    code
}
