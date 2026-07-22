import { Button, Popover, Select } from '@xiaoye-react/ui';
import { DatePickerInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Popover, Select } from '@xiaoye-react/ui';
import { DatePickerInput } from '@xiaoye-react/dates';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown bg="var(--ui-color-body)">
        <Select
          label="在 Popover 中选择"
          placeholder="在 Popover 中选择"
          comboboxProps={{ withinPortal: false }}
          data={['React', 'Angular', 'Svelte', 'Vue']}
        />
        <DatePickerInput
          label="在 Popover 中选择日期"
          placeholder="在 Popover 中选择日期"
          popoverProps={{ withinPortal: false }}
          mt="md"
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
      <Popover.Dropdown bg="var(--ui-color-body)">
        <Select
          label="在 Popover 中选择"
          placeholder="在 Popover 中选择"
          comboboxProps={{ withinPortal: false }}
          data={['React', 'Angular', 'Svelte', 'Vue']}
        />
        <DatePickerInput
          label="在 Popover 中选择日期"
          placeholder="在 Popover 中选择日期"
          popoverProps={{ withinPortal: false }}
          mt="md"
        />
      </Popover.Dropdown>
    </Popover>
  );
}

export const portalChildren: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
