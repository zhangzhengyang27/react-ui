import { NativeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NativeSelect } from '@xiaoye-react/ui';

function Demo() {
  return <NativeSelect label="原生选择" data={['React', 'Angular', 'Vue', 'Svelte']} success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <NativeSelect
      label="原生选择"
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
