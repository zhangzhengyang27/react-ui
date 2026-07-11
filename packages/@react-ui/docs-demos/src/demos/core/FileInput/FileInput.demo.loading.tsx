import { FileInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput placeholder="Upload file" loading />;
}
`;

function Demo() {
  return <FileInput placeholder="Upload file" loading />;
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
