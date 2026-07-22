import { FileInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { FileInput } from '@xiaoye-react/ui';

function Demo() {
  return <FileInput clearable label="上传文件" placeholder="上传文件" />;
}
`;

function Demo() {
  return <FileInput clearable label="上传文件" placeholder="上传文件" />;
}

export const clearable: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
