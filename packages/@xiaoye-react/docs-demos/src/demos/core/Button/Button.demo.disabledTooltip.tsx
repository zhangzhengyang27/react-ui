import { Button, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Tooltip } from '@xiaoye-react/ui';

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
  title: '禁用提示',
  description: '使用 data-disabled 配合 Tooltip 为禁用按钮显示提示。',
  centered: true,
  code,
};
