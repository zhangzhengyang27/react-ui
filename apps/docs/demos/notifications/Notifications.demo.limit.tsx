import { Button } from '@react-ui/ui';
import { notifications } from '@react-ui/notifications';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { notifications } from '@react-ui/notifications';

function Demo() {
  return (
    <Button
      onClick={() => {
        Array(10).fill(0).forEach((_, index) => {
          setTimeout(() => {
            notifications.show({
              title: \`Notification \${index + 1}\`,
              message: '大多数通知已加入队列',
            });
          }, 200 * index);
        });
      }}
    >
      Show 10 notifications
    </Button>
  );
}`;

function Demo() {
  return (
    <Button
      onClick={() => {
        Array(10)
          .fill(0)
          .forEach((_, index) => {
            setTimeout(() => {
              notifications.show({
                title: `Notification ${index + 1}`,
                message: '大多数通知已加入队列',
              });
            }, 200 * index);
          });
      }}
    >
      Show 10 notifications
    </Button>
  );
}

export const limit: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
