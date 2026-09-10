import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { Button } from '@xiaoye-react/ui'
import { notifications } from '@xiaoye-react/notifications'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { Button } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
function Demo() {
  return (
    <Button
      onClick={() => {
        const id = notifications.show({
          loading: true,
          title: '正在加载你的数据',
          message: '数据将在 3 秒后加载完成，暂时无法关闭',
          autoClose: false,
          allowClose: false,
        });

        setTimeout(() => {
          notifications.update({
            id,
            color: 'teal',
            title: '数据已加载',
            message: '通知将在 2 秒后关闭，你现在可以手动关闭此通知',
            icon: <CheckIcon size={18} />,
            loading: false,
            autoClose: 2000,
            allowClose: true,
          });
        }, 3000);
      }}
    >
      Show update notification
    </Button>
  );
}
`

function Demo() {
    return (
        <Button
            onClick={() => {
                const id = notifications.show({
                    loading: true,
                    title: '正在加载你的数据',
                    message: '数据将在 3 秒后加载完成，暂时无法关闭',
                    autoClose: false,
                    allowClose: false
                })

                setTimeout(() => {
                    notifications.update({
                        id,
                        color: 'teal',
                        title: '数据已加载',
                        message: '通知将在 2 秒后关闭，你现在可以手动关闭此通知',
                        icon: <CheckIcon size={18} />,
                        loading: false,
                        autoClose: 2000,
                        allowClose: true
                    })
                }, 3000)
            }}
        >
            Show update notification
        </Button>
    )
}

export const update: UIDemo = {
    type: 'code',
    code,
    centered: true,
    component: Demo
}
