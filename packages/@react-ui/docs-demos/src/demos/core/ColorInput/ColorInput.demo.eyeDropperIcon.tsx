import { CrosshairIcon } from '@phosphor-icons/react';
import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';
import { CrosshairIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<CrosshairIcon size={18} />}
      label="自定义取色器图标"
      placeholder="选择颜色"
    />
  );
}
`;

function Demo() {
  return (
    <ColorInput
      eyeDropperIcon={<CrosshairIcon size={18} />}
      label="自定义取色器图标"
      placeholder="选择颜色"
    />
  );
}

export const eyeDropperIcon: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
