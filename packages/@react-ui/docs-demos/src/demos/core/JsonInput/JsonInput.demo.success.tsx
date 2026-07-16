import { JsonInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return <JsonInput label="JSON 配置" placeholder="JSON 配置" success="有效的 JSON" />;
}
`;

function Demo() {
  return <JsonInput label="JSON 配置" placeholder="JSON 配置" success="有效的 JSON" />;
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
