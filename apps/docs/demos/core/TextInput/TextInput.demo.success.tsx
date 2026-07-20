import { TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { TextInput } from '@react-ui/ui';

function Demo() {
  return <TextInput label="文本输入" placeholder="文本输入" success="看起来不错！" />;
}
`;

function Demo() {
  return <TextInput label="文本输入" placeholder="文本输入" success="看起来不错！" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
