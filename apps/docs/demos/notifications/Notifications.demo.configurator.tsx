import { Button, Group } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: '通知预览',
            message: (
              <>
                这里的 <b>message</b> 属性用作 <b>children</b>,可以传入任意 React 节点。
              </>
            ),
          })
        }
      >
        Show notification
      </Button>
    </Group>
  );
}`;

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: '通知预览',
            message: (
              <>
                这里的 <b>message</b> 属性用作 <b>children</b>,可以传入任意 React 节点。
              </>
            ),
          })
        }
      >
        Show notification
      </Button>
    </Group>
  );
}

export const configurator: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
