import { Button, Popover, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Popover, Text, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Popover width="target" position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button w={280}>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This popover has same width as target, it is useful when you are building input dropdowns
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

`;

function Demo() {
  return (
    <Popover width="target" position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button w={280}>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="sm">
          This popover has same width as target, it is useful when you are building input dropdowns
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const sameWidth: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
