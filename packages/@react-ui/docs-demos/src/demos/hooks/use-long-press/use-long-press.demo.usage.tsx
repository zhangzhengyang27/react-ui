import { Button } from '@react-ui/ui';
import { useLongPress } from '@react-ui/hooks';
import { notifications } from '@react-ui/notifications';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { useLongPress } from '@react-ui/hooks';
import { notifications } from '@react-ui/notifications';

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: 'Long press triggered' }));
  return <Button {...handlers}>Press and hold</Button>;
}
`;

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: 'Long press triggered' }));
  return <Button {...handlers}>Press and hold</Button>;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
