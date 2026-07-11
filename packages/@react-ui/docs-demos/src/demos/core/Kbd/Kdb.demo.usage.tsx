import { Kbd } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Kbd } from '@react-ui/ui';

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}
`;

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
