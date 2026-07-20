import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput label="上传文件" placeholder="上传文件" multiple />;
}
`;

function Demo() {
  return <FileInput multiple label="上传文件" placeholder="上传文件" />;
}

export const multiple: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
