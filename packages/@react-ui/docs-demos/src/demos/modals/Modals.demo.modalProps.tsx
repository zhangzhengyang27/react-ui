import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { notifications } from '@react-ui/notifications';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: '请确认你的操作',
    size: 'sm',
    withCloseButton: false,
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
      size: 'sm',
      withCloseButton: false,
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

export const modalProps: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
