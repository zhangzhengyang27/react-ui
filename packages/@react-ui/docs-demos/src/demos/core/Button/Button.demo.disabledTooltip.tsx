import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Tooltip } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="禁用按钮的提示">
      <Button data-disabled onClick={(event) => event.preventDefault()}>
        带提示的禁用按钮
      </Button>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="禁用按钮的提示">
      <Button data-disabled onClick={(event) => event.preventDefault()}>
        带提示的禁用按钮
      </Button>
    </Tooltip>
  );
}

export const disabledTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
