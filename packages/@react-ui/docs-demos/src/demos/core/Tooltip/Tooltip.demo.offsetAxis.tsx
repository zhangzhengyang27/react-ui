import { Button, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { FLOATING_POSITION_DATA } from '../../../shared';

const code = (props: any) => `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip
      position="${props.position}"
      opened
      label="提示"
      offset={{ mainAxis: ${props.mainAxis}, crossAxis: ${props.crossAxis} }}
    >
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Tooltip
      position={props.position}
      opened
      label="提示"
      offset={{ mainAxis: props.mainAxis, crossAxis: props.crossAxis }}
    >
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}

export const offsetAxis: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'select',
      prop: 'position',
      initialValue: 'top',
      data: FLOATING_POSITION_DATA,
      libraryValue: null,
    },
    { type: 'number', prop: 'mainAxis', initialValue: 5, libraryValue: null, min: -50, max: 50 },
    { type: 'number', prop: 'crossAxis', initialValue: 0, libraryValue: null, min: -50, max: 50 },
  ],
};
