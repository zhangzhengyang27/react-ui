import { Button, MultiSelect, Popover } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Popover, Button, MultiSelect } from '@react-ui/ui';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <MultiSelect
          label="你最喜欢的库"
          placeholder="选择值"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <MultiSelect
          label="你最喜欢的库"
          placeholder="选择值"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          comboboxProps={{ withinPortal: false }}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

export const withinPopover: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
