import { Button } from '@react-ui/ui';
import { useLongPress } from '@react-ui/hooks';
import { notifications } from '@react-ui/notifications';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { useLongPress } from '@react-ui/hooks';
import { notifications } from '@react-ui/notifications';

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: '长按已触发' }));
  return <Button {...handlers}>按住不放</Button>;
}
`;

function Demo() {
  const handlers = useLongPress(() => notifications.show({ message: '长按已触发' }));
  return <Button {...handlers}>按住不放</Button>;
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
