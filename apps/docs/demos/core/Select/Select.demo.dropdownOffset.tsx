import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      label="零偏移"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      offset={0}
    />
  );
}
`;

function Demo() {
    return (
        <Select
            label="零偏移"
            placeholder="选择值"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            offset={0}
        />
    )
}

export const dropdownOffset: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    maxWidth: 340,
    centered: true
}
