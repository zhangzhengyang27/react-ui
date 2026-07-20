import { ColorInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ColorInput } from '@react-ui/ui';

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="不使用下拉框" placeholder="输入值" />
  );
}
`;

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="不使用下拉框" placeholder="输入值" />
  );
}

export const withPicker: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
