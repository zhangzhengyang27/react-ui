import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput disabled label="已禁用输入" placeholder="已禁用输入" />;
}
`;

function Demo() {
  return <FileInput disabled label="已禁用输入" placeholder="已禁用输入" />;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
