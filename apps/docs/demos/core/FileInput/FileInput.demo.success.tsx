import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput label="上传文件" success="文件有效" />;
}
`;

function Demo() {
  return <FileInput label="上传文件" success="文件有效" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
