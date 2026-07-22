import { TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TextInput type="password" label="密码输入" placeholder="密码输入" />
      <TextInput mt="md" type="date" label="日期输入" placeholder="日期输入" />
      <TextInput
        mt="md"
        type="datetime-local"
        label="日期时间输入"
        placeholder="日期时间输入"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TextInput type="password" label="密码输入" placeholder="密码输入" />
      <TextInput mt="md" type="date" label="日期输入" placeholder="日期输入" />
      <TextInput
        mt="md"
        type="datetime-local"
        label="日期时间输入"
        placeholder="日期时间输入"
      />
    </>
  );
}

export const type: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
