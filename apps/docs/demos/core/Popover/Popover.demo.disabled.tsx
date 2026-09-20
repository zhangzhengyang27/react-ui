import { Button, Popover, Text, PopoverProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Popover, Text, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover width={200}{{props}}>
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">禁用的气泡卡片下拉始终隐藏</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Wrapper(props: PopoverProps) {
  return (
    <Popover width={200} {...props}>
      <Popover.Target>
        <Button>切换气泡卡片</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">禁用的气泡卡片下拉始终隐藏</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const disabled: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'boolean', prop: 'disabled', initialValue: false, libraryValue: false }],
};
