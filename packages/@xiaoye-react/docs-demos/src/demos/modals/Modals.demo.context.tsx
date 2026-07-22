import { Button } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/modals';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button } from '@xiaoye-react/ui';
import { modals } from '@xiaoye-react/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openContextModal({
          modal: 'demonstration',
          title: '从上下文测试模态框',
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
          title: '从上下文测试模态框',
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

export const context: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
