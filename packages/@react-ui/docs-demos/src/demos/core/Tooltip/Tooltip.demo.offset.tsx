import { Button, Tooltip } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { FLOATING_POSITION_DATA } from '../../../shared';

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="Tooltip" opened{{props}}>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Tooltip label="Tooltip" opened {...props}>
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}

export const offset: MantineDemo = {
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
    { type: 'number', prop: 'offset', initialValue: 5, libraryValue: null, min: -50, max: 50 },
  ],
};
