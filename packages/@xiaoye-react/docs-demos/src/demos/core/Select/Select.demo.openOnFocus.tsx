import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Select
        label="聚焦时打开"
        placeholder="选择值"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="聚焦时不打开"
        placeholder="选择值"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Select
        label="聚焦时打开"
        placeholder="选择值"
        searchable
        openOnFocus
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
        label="聚焦时不打开"
        placeholder="选择值"
        searchable
        openOnFocus={false}
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}

export const openOnFocus: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
};
