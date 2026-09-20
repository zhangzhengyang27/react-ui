import { Button, Tooltip, TooltipProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip{{props}} label="提示" withArrow opened position="top-start">
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
`;

function Wrapper(props: Omit<TooltipProps, 'label'>) {
  return (
    <Tooltip label="提示" withArrow opened position="top-start" {...props}>
      <Button>带提示的按钮</Button>
    </Tooltip>
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
      data: ['center', 'side', 'merge'],
    },
    {
      type: 'number',
      prop: 'arrowOffset',
      initialValue: 10,
      libraryValue: null,
      min: 5,
      max: 50,
    },

    {
      type: 'number',
      prop: 'arrowSize',
      initialValue: 4,
      libraryValue: null,
      min: 2,
      max: 8,
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
