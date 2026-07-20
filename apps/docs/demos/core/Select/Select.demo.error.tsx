import { Select } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Select } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Select
        label="布尔错误"
        placeholder="布尔错误"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
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
      <Select
        label="布尔错误"
        placeholder="布尔错误"
        error
        data={['React', 'Angular', 'Vue', 'Svelte']}
      />
      <Select
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
