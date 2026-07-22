import { Button, Group } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Group, Button } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() => notifications.show({ message: '我将在 4 秒后关闭' })}
      >
        Notifications Provider timeout
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            message: '我将在 500 毫秒后关闭',
            autoClose: 500,
          })
        }
      >
        Closes in 500ms
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            color: 'blue',
            title: '我永远不会关闭',
            message: '除非你点击 X',
            autoClose: false,
          })
        }
      >
        Never closes automatically
      </Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Button onClick={() => notifications.show({ message: '我将在 4 秒后关闭' })}>
        Notifications Provider timeout
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            message: '我将在 500 毫秒后关闭',
            autoClose: 500,
          })
        }
      >
        Closes in 500ms
      </Button>

      <Button
        onClick={() =>
          notifications.show({
            color: 'blue',
            title: '我永远不会关闭',
            message: '除非你点击 X',
            autoClose: false,
          })
        }
      >
        Never closes automatically
      </Button>
    </Group>
  );
}

export const autoclose: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
