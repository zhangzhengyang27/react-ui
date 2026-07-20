import { Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Text, Stack, Center, Loader } from '@react-ui/ui';
import { modals, ContextModalProps, ModalsProvider } from '@react-ui/modals';
import { CheckIcon } from '@phosphor-icons/react';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string, loading: boolean }>) => (
  <>
    <Stack>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Center>
        {innerProps.loading ? (
          <Loader size={32}/>
        ): (
          <CheckIcon size={23} color="var(--ui-color-teal-6)" />
        )}
      </Center>
    </Stack>
    <Button fullWidth mt="md" disabled={innerProps.loading} onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      <Button
        onClick={() => {
          const modalId = modals.openContextModal({
            modal: 'asyncDemonstration',
            title: '处理中...',
            closeOnEscape: false,
            closeOnClickOutside: false,
            closeButtonProps:{ disabled:true },
            innerProps: {
              modalBody:
                'You cannot close this modal until 2 seconds have passed.',
              loading: true,
            },
          });

          setTimeout(() => {
            modals.updateContextModal({
              modalId,
              title: "处理完成！",
              closeOnEscape: true,
              closeOnClickOutside: true,
              closeButtonProps:{ disabled: false },
              innerProps: {
                modalBody:
                  'You can now close the modal.',
                loading: false,
              },
            })
          }, 2000);
        }}
      >
        Open updating context modal
      </Button>
    </ModalsProvider>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.openContextModal({
          modal: 'asyncDemonstration',
          title: '处理中...',
          closeOnEscape: false,
          closeOnClickOutside: false,
          closeButtonProps: { disabled: true },
          innerProps: {
            modalBody: 'You cannot close this modal until 2 seconds have passed.',
            loading: true,
          },
        });

        setTimeout(() => {
          modals.updateContextModal({
            modalId,
            title: '处理完成！',
            closeOnEscape: true,
            closeOnClickOutside: true,
            closeButtonProps: { disabled: false },
            innerProps: {
              modalBody: 'You can now close the modal.',
              loading: false,
            },
          });
        }, 2000);
      }}
    >
      Open updating context modal
    </Button>
  );
}

export const updateContextModal: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
