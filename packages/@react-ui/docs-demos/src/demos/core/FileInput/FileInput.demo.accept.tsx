import { FileInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="上传文件" placeholder="上传文件" />
  );
}
`;

function Demo() {
  return (
    <FileInput accept="image/png,image/jpeg" label="上传文件" placeholder="上传文件" />
  );
}

export const accept: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
