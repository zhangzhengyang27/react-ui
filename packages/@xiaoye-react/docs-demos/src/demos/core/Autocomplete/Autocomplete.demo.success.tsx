import { Autocomplete } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Autocomplete } from '@xiaoye-react/ui';

function Demo() {
  return <Autocomplete label="自动完成" placeholder="自动完成" data={['React', 'Angular', 'Vue', 'Svelte']} success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <Autocomplete
      label="自动完成"
      placeholder="自动完成"
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
