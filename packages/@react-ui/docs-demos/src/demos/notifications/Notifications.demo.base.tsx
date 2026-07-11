import { Button } from '@react-ui/ui';
import { notifications } from '@react-ui/notifications';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { notifications } from '@react-ui/notifications';

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star ReactUI on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}`;

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: 'Default notification',
          message: 'Do not forget to star ReactUI on GitHub! 🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}

export const base: MantineDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
