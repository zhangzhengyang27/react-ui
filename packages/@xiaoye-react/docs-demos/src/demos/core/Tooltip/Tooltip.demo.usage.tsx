import { Button, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Button } from '@xiaoye-react/ui';

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
