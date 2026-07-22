import { Button, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { FLOATING_POSITION_DATA } from '../../../shared';

const code = `
import { Tooltip, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Tooltip label="提示" opened{{props}}>
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Tooltip label="提示" opened {...props}>
      <Button>带提示的按钮</Button>
    </Tooltip>
  );
}

export const offset: UIDemo = {
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
