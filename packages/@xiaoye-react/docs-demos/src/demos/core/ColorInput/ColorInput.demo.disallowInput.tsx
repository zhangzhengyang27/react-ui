import { ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorInput } from '@xiaoye-react/ui';

function Demo() {
  return <ColorInput disallowInput />;
}
`;

function Demo() {
  return (
    <ColorInput
      maw={320}
      mx="auto"
      disallowInput
      placeholder="选择颜色"
      label="你最喜欢的颜色"
    />
  );
}

export const disallowInput: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
