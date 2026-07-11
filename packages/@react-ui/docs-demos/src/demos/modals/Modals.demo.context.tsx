import { Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openContextModal({
          modal: 'demonstration',
          title: 'Test modal from context',
          innerProps: {
            modalBody:
              'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
          },
        })
      }
    >
      Open demonstration context modal
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openContextModal({
          modal: 'demonstration',
          title: 'Test modal from context',
          innerProps: {
            modalBody:
              'This modal was defined in ModalsProvider, you can open it anywhere in you app with useModals hook',
          },
        })
      }
    >
      Open demonstration context modal
    </Button>
  );
}

export const context: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
