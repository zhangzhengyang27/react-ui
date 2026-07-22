import { Button, Group, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="提示 1">
          <Button>按钮 1</Button>
        </Tooltip>
        <Tooltip label="提示 2">
          <Button>按钮 2</Button>
        </Tooltip>
        <Tooltip label="提示 3">
          <Button>按钮 3</Button>
        </Tooltip>
      </Group>
    </Tooltip.Group>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="提示 1">
          <Button>按钮 1</Button>
        </Tooltip>
        <Tooltip label="提示 2">
          <Button>按钮 2</Button>
        </Tooltip>
        <Tooltip label="提示 3">
          <Button>按钮 3</Button>
        </Tooltip>
      </Group>
    </Tooltip.Group>
  );
}

export const group: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
