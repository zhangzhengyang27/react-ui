import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text>This text will update in 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: (
              <Text size="sm" c="dimmed">
                This is the updated content of the modal.
              </Text>
            ),
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text size="sm">This text will update after 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: <Text size="sm">This is the updated content of the modal.</Text>,
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}

export const updateModal: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
