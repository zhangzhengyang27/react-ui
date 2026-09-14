import { Button, Text } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Text } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/ui';

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: '删除你的个人资料',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: '删除账户', cancel: '不，不要删除' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('取消'),
      onConfirm: () => console.log('已确认'),
    });

  return <Button onClick={openDeleteModal} color="red">删除账户</Button>;
}
`;

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: '删除你的个人资料',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: '删除账户', cancel: '不，不要删除' },
      confirmProps: { color: 'red' },
      onCancel: () =>
        notifications.show({
          title: '已取消',
          message: '删除模态框已取消',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: '已删除',
          message: '删除模态框已确认',
          color: 'red',
        }),
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Delete account
    </Button>
  );
}

export const confirmCustomize: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
