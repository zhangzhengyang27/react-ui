import { Button, Popover, TextInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Popover, Button, TextInput } from '@react-ui/ui';

function Demo() {
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput label="姓名" placeholder="姓名" size="xs" />
        <TextInput label="邮箱" placeholder="yourname@example.com" size="xs" mt="xs" />
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput label="姓名" placeholder="姓名" size="xs" />
        <TextInput label="邮箱" placeholder="yourname@example.com" size="xs" mt="xs" />
      </Popover.Dropdown>
    </Popover>
  );
}

export const form: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
