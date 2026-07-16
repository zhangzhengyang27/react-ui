import { Button, Popover, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Popover, Text, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">气泡卡片将在 mouseup 和 touchend 事件时关闭</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">气泡卡片将在 mouseup 和 touchend 事件时关闭</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const clickOutsideEvents: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
