import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { notifications } from '@react-ui/notifications';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Confirmed'),
    });

  return <Button onClick={openDeleteModal} color="red">Delete account</Button>;
}
`;

function Demo() {
  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: 'Delete your profile',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is destructive and you will have
          to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete account', cancel: "No don't delete it" },
      confirmProps: { color: 'red' },
      onCancel: () =>
        notifications.show({
          title: 'Canceled',
          message: 'Delete modal was canceled',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: 'Deleted',
          message: 'Delete modal was confirmed',
          color: 'red',
        }),
    });

  return (
    <Button onClick={openDeleteModal} color="red">
      Delete account
    </Button>
  );
}

export const confirmCustomize: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
