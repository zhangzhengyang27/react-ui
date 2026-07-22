import { PasswordInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { PasswordInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <PasswordInput label="布尔错误" placeholder="布尔错误" error />
      <PasswordInput
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <PasswordInput label="布尔错误" placeholder="布尔错误" error />
      <PasswordInput
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效的名称"
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
