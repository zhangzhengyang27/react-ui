import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return (
    <NativeSelect
      label="你喜爱的框架"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}
`;

function Demo() {
  return (
    <NativeSelect
      label="你喜爱的框架"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      loading
    />
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
