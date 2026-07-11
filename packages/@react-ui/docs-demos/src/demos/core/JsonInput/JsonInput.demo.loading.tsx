import { JsonInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return <JsonInput placeholder="Enter JSON" formatOnBlur autosize minRows={4} loading />;
}
`;

function Demo() {
  return <JsonInput placeholder="Enter JSON" formatOnBlur autosize minRows={4} loading />;
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
