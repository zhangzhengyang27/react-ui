import { Button, Group, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Tooltip, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group justify="center">
      <Tooltip label="500 毫秒后打开" openDelay={500}>
        <Button>延迟打开 - 500毫秒</Button>
      </Tooltip>
      <Tooltip label="500 毫秒后关闭" closeDelay={500}>
        <Button>延迟关闭 - 500毫秒</Button>
      </Tooltip>
    </Group>
  );
}
`;

export function Demo() {
  return (
    <Group justify="center">
      <Tooltip label="500 毫秒后打开" openDelay={500}>
        <Button>延迟打开 - 500毫秒</Button>
      </Tooltip>
      <Tooltip label="500 毫秒后关闭" closeDelay={500}>
        <Button>延迟关闭 - 500毫秒</Button>
      </Tooltip>
    </Group>
  );
}

export const delay: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
