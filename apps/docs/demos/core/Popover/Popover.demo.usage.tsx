import { Button, Popover, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Popover, Text, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">这是非受控弹出框，点击按钮时打开</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">这是非受控弹出框，点击按钮时打开</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
