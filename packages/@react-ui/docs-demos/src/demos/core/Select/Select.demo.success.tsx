import { Select } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Select } from '@react-ui/ui';

function Demo() {
  return <Select label="选择" placeholder="选择" data={['React', 'Angular', 'Vue', 'Svelte']} success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <Select
      label="选择"
      placeholder="选择"
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
