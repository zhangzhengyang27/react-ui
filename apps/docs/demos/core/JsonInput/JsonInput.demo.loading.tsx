import { JsonInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { JsonInput } from '@xiaoye-react/ui';

function Demo() {
  return <JsonInput placeholder="输入 JSON" formatOnBlur minRows={4} loading />;
}
`;

function Demo() {
  return <JsonInput placeholder="输入 JSON" formatOnBlur minRows={4} loading />;
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
