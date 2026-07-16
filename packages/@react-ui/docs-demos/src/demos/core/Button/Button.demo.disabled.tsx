import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return <Button disabled>禁用按钮</Button>;
}
`;

function Demo() {
  return <Button disabled>禁用按钮</Button>;
}

export const disabled: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
