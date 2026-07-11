import { Button } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';

function Demo() {
  return <Button disabled>Disabled button</Button>;
}
`;

function Demo() {
  return <Button disabled>Disabled button</Button>;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
