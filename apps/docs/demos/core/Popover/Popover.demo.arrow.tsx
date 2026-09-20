import { Button, Popover, Text, PopoverProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Popover, Button, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Popover width={200} opened position="bottom-start" withArrow{{props}}>
      <Popover.Target>
        <Button>目标元素</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">箭头位置可针对 *-start 和 *-end 位置进行更改</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Wrapper(props: PopoverProps) {
  return (
    <Popover width={200} opened position="bottom-start" withArrow {...props}>
      <Popover.Target>
        <Button>目标元素</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">箭头位置可针对 *-start 和 *-end 位置进行更改</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const arrow: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'segmented',
      prop: 'arrowPosition',
      initialValue: 'center',
      libraryValue: 'center',
      data: ['center', 'side'],
    },
    {
      type: 'number',
      prop: 'arrowOffset',
      initialValue: 10,
      libraryValue: 10,
      min: 5,
      max: 50,
    },

    {
      type: 'number',
      prop: 'arrowSize',
      initialValue: 7,
      libraryValue: 7,
      min: 5,
      max: 12,
    },

    {
      type: 'number',
      prop: 'arrowRadius',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 10,
    },
  ],
};
