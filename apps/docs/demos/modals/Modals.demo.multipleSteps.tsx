import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openConfirmModal({
          title: '请确认你的操作',
          closeOnConfirm: false,
          labels: { confirm: '下一个模态框', cancel: '关闭模态框' },
          children: (
            <Text size="sm">
              This action is so important that you are required to confirm it with a modal. Please
              click one of these buttons to proceed.
            </Text>
          ),
          onConfirm: () =>
            modals.openConfirmModal({
              title: '这是第二层模态框',
              labels: { confirm: '关闭模态框', cancel: '返回' },
              closeOnConfirm: false,
              children: (
                <Text size="sm">
                  When this modal is closed modals state will revert to first modal
                </Text>
              ),
              onConfirm: modals.closeAll,
            }),
        })
      }
    >
      Open multiple steps modal
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() =>
        modals.openConfirmModal({
          title: '请确认你的操作',
          closeOnConfirm: false,
          labels: { confirm: '下一个模态框', cancel: '关闭模态框' },
          children: (
            <Text size="sm">
              This action is so important that you are required to confirm it with a modal. Please
              click one of these buttons to proceed.
            </Text>
          ),
          onConfirm: () =>
            modals.openConfirmModal({
              title: '这是第二层模态框',
              labels: { confirm: '关闭模态框', cancel: '返回' },
              closeOnConfirm: false,
              children: (
                <Text size="sm">
                  When this modal is closed modals state will revert to first modal
                </Text>
              ),
              onConfirm: modals.closeAll,
            }),
        })
      }
    >
      Open multiple steps modal
    </Button>
  );
}

export const multipleSteps: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
