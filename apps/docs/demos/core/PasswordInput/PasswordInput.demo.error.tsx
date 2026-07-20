import { PasswordInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { PasswordInput } from '@react-ui/ui';

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
