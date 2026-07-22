import { Input } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Input.Label required>输入标签</Input.Label>
      <Input.Description>输入描述</Input.Description>
      <Input.Error>输入错误</Input.Error>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Input.Label required>输入标签</Input.Label>
      <Input.Description>输入描述</Input.Description>
      <Input.Error>输入错误</Input.Error>
    </>
  );
}

export const compound: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
