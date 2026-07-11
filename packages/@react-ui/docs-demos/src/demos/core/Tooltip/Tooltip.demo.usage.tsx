import { Button, Tooltip } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button } from '@react-ui/ui';

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
