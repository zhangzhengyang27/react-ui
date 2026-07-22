import { Button, Group } from '@xiaoye-react/ui';
import { createNotificationsStore, notifications, Notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group } from '@xiaoye-react/ui';
import { createNotificationsStore, notifications, Notifications } from '@xiaoye-react/notifications';

// Dedicated store with limit={1} so the priority behavior is easy to see
const store = createNotificationsStore();

function Demo() {
  return (
    <>
      <Notifications store={store} limit={1} position="top-center" />

      <Group justify="center">
        <Button
          color="gray"
          onClick={() =>
            notifications.show(
              {
                title: '低优先级',
                message: '当紧急通知到达时，我会被推到队列中',
                autoClose: false,
                priority: 0,
              },
              store
            )
          }
        >
          Show low priority
        </Button>

        <Button
          color="red"
          onClick={() =>
            notifications.show(
              {
                title: '高优先级',
                message: '即使达到限制，我也会占据可见位置',
                color: 'red',
                autoClose: false,
                priority: 10,
              },
              store
            )
          }
        >
          Show high priority
        </Button>
      </Group>
    </>
  );
}`;

const store = createNotificationsStore();

function Demo() {
  return (
    <>
      <Notifications store={store} limit={1} position="top-center" />

      <Group justify="center">
        <Button
          color="gray"
          onClick={() =>
            notifications.show(
              {
                title: '低优先级',
                message: '当紧急通知到达时，我会被推到队列中',
                autoClose: false,
                priority: 0,
              },
              store
            )
          }
        >
          Show low priority
        </Button>

        <Button
          color="red"
          onClick={() =>
            notifications.show(
              {
                title: '高优先级',
                message: '即使达到限制，我也会占据可见位置',
                color: 'red',
                autoClose: false,
                priority: 10,
              },
              store
            )
          }
        >
          Show high priority
        </Button>
      </Group>
    </>
  );
}

export const priority: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
