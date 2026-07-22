import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

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
