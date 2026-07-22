import { Checkbox } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="亮绿色复选框"
    />
  );
}
`;

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="亮绿色复选框"
    />
  );
}

export const iconColor: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
