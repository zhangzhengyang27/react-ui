import { NativeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { NativeSelect } from '@xiaoye-react/ui';

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
