import { Button } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';

function Demo() {
  return (
    <Button
      onClick={() =>
        notifications.show({
          title: '默认通知',
          message: '别忘了在 GitHub 上给 ReactUI 点星！🌟',
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
          title: '默认通知',
          message: '别忘了在 GitHub 上给 ReactUI 点星！🌟',
        })
      }
    >
      Show notification
    </Button>
  );
}

export const base: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
