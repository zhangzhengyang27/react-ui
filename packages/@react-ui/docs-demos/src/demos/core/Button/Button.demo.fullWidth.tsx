import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return <Button fullWidth>全宽按钮</Button>;
}
`;

function Demo() {
  return <Button fullWidth>全宽按钮</Button>;
}

export const fullWidth: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
