import { Button, Popover, TagsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Popover, Button, TagsInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover width={300} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <TagsInput
          label="你最喜欢的库"
          placeholder="选择值或输入任意内容"
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
        <TagsInput
          label="你最喜欢的库"
          placeholder="选择值或输入任意内容"
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
