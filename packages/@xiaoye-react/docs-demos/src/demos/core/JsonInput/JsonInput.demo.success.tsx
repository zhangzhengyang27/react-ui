import { JsonInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { JsonInput } from '@xiaoye-react/ui';

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
