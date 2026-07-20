import { Radio } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Radio } from '@react-ui/ui';

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="自定义图标颜色"
      name="check"
      value="check"
      defaultChecked
    />
  );
}
`;

function Demo() {
  return (
    <Radio
      iconColor="dark.8"
      color="lime.4"
      label="自定义图标颜色"
      name="check"
      value="check"
      defaultChecked
    />
  );
}

export const iconColor: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
