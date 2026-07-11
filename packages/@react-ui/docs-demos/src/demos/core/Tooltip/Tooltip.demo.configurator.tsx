import { Button, Tooltip } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

function Wrapper(props: any) {
  return (
    <Tooltip label="Tooltip" {...props}>
      <Button>With tooltip</Button>
    </Tooltip>
  );
}

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="Tooltip"{{props}}>
      <Button>With tooltip</Button>
    </Tooltip>
  );
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: '__none__',
    },
  ],
};
