import { Radio } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Radio } from '@xiaoye-react/ui';

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
