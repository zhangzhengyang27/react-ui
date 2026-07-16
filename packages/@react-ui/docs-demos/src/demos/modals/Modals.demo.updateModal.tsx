import { Button, Text } from '@react-ui/ui';
import { modals } from '@react-ui/modals';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Button } from '@react-ui/ui';
import { modals } from '@react-ui/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: '初始模态框标题',
          children: <Text>此文本将在 2 秒后更新。</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: '更新后的模态框标题',
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
          title: '初始模态框标题',
          children: <Text size="sm">此文本将在 2 秒后更新。</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: '更新后的模态框标题',
            children: <Text size="sm">这是模态框更新后的内容。</Text>,
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}

export const updateModal: UIDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
