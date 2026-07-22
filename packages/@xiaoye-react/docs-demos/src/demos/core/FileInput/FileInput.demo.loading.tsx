import { FileInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { FileInput } from '@xiaoye-react/ui';

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
