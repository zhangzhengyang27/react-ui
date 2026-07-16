import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="提示">
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="提示">
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
