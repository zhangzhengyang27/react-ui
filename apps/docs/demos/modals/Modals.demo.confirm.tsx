import { Button, Text } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/ui';
import { notifications } from '@xiaoye-react/notifications';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Text } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/ui';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: '请确认你的操作',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: '确认', cancel: '取消' },
    onCancel: () => console.log('取消'),
    onConfirm: () => console.log('已确认'),
  });

  return <Button onClick={openModal}>打开确认模态框</Button>;
}
`;

function Demo() {
  const openModal = () =>
    modals.openConfirmModal({
      modalId: 'test-id',
      title: '请确认你的操作',
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      onCancel: () =>
        notifications.show({
          title: '已取消',
          message: '确认模态框已取消',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: '已确认',
          message: '确认模态框已确认',
          color: 'teal',
        }),
    });

  return <Button onClick={openModal}>打开确认模态框</Button>;
}

export const confirm: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
