import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return <NativeSelect disabled data={['React', 'Angular']} label="已禁用的 NativeSelect" />;
}
`;

function Demo() {
  return <NativeSelect disabled data={['React', 'Angular']} label="已禁用的 NativeSelect" />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
