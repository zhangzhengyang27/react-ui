import { JsonInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return <JsonInput placeholder="输入 JSON" formatOnBlur autosize minRows={4} loading />;
}
`;

function Demo() {
  return <JsonInput placeholder="输入 JSON" formatOnBlur autosize minRows={4} loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
