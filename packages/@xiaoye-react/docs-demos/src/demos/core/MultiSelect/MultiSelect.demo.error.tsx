import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <MultiSelect
        label="布尔错误"
        placeholder="布尔错误"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <MultiSelect
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <MultiSelect
        label="布尔错误"
        placeholder="布尔错误"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <MultiSelect
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
