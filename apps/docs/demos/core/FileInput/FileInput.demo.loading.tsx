import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput placeholder="上传文件" loading />;
}
`;

function Demo() {
  return <FileInput placeholder="上传文件" loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
