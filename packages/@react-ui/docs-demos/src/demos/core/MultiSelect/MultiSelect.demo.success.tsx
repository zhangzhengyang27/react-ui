import { MultiSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { MultiSelect } from '@react-ui/ui';

function Demo() {
  return <MultiSelect label="多选" placeholder="多选" data={['React', 'Angular', 'Vue', 'Svelte']} success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <MultiSelect
      label="多选"
      placeholder="多选"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      success="看起来不错！"
    />
  );
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
