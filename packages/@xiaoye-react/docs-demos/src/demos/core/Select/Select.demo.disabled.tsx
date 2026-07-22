import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Select
      label="你最喜欢的库"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}
`;

function Demo() {
  return (
    <Select
      label="你最喜欢的库"
      placeholder="选择值"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      disabled
    />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
