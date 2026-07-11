import { FileInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { FileInput } from '@react-ui/ui';

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}
`;

function Demo() {
  return <FileInput clearable label="Upload files" placeholder="Upload files" />;
}

export const clearable: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
