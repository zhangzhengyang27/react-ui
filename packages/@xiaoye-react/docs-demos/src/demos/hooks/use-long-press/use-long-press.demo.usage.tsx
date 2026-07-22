import { Button } from '@xiaoye-react/ui';
import { useLongPress } from '@xiaoye-react/hooks';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';
import { useLongPress } from '@xiaoye-react/hooks';
import { notifications } from '@xiaoye-react/notifications';

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
