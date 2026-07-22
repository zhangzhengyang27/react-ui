import { Autocomplete } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Autocomplete
      clearable
      defaultValue="React"
      data={['React', 'Angular']}
      label="可清除的自动完成"
      placeholder="可清除的自动完成"
    />
  );
}
`;

function Demo() {
  return (
    <Autocomplete
      clearable
      defaultValue="React"
      data={['React', 'Angular']}
      label="可清除的自动完成"
      placeholder="可清除的自动完成"
    />
  );
}

export const clearable: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
