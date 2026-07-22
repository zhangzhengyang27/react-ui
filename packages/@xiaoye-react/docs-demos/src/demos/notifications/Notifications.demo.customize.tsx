import { Button, Group } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';
import classes from './Notifications.demo.customize.module.css';

const code = `
import { Button, Group } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: '自定义样式通知',
            message: '默认蓝色',
            classNames: classes,
          })
        }
      >
        Default notification
      </Button>

      <Button
        color="red"
        onClick={() =>
          notifications.show({
            color: 'red',
            title: '自定义样式通知',
            message: '红色',
            classNames: classes,
          })
        }
      >
        Error notification
      </Button>
    </Group>
  );
}`;

const cssCode = `
.root {
  background-color: var(--notification-color, var(--ui-primary-color-filled));

  &::before {
    background-color: var(--ui-color-white);
  }
}

.description,
.title {
  color: var(--ui-color-white);
}

.closeButton {
  color: var(--ui-color-white);

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Button
        onClick={() =>
          notifications.show({
            title: '自定义样式通知',
            message: '默认蓝色',
            classNames: classes,
          })
        }
      >
        Default notification
      </Button>

      <Button
        color="red"
        onClick={() =>
          notifications.show({
            color: 'red',
            title: '自定义样式通知',
            message: '红色',
            classNames: classes,
          })
        }
      >
        Error notification
      </Button>
    </Group>
  );
}

export const customize: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
