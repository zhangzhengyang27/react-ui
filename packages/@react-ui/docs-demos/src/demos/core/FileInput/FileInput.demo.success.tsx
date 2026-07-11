import { FileInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput label="Upload file" success="File is valid" />;
}
`;

function Demo() {
  return <FileInput label="Upload file" success="File is valid" />;
}

export const success: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
