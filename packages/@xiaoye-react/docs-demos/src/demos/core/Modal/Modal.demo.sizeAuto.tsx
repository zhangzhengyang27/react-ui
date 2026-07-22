import { Badge, Button, Group, Modal, Text } from '@xiaoye-react/ui';
import { useCounter, useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure, useCounter } from '@xiaoye-react/hooks';
import { Modal, Button, Group, Text, Badge } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>徽章 {index}</Badge>);

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="size 为 auto 的模态框">
        <Text>size 为 auto 的模态框将自适应其内容</Text>

        <Group wrap="nowrap" mt="md">
          {badges}
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>添加徽章</Button>
          <Button onClick={decrement}>移除徽章</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { close, open }] = useDisclosure(false);
  const [count, { increment, decrement }] = useCounter(3, { min: 0 });

  const badges = Array(count)
    .fill(0)
    .map((_, index) => <Badge key={index}>徽章 {index}</Badge>);

  return (
    <>
      <Modal opened={opened} onClose={close} size="auto" title="size 为 auto 的模态框">
        <Text>size 为 auto 的模态框将自适应其内容</Text>

        <Group wrap="nowrap" mt="md">
          {badges}
        </Group>

        <Group mt="xl">
          <Button onClick={increment}>添加徽章</Button>
          <Button onClick={decrement}>移除徽章</Button>
        </Group>
      </Modal>

      <Button variant="default" onClick={open}>
        打开模态框
      </Button>
    </>
  );
}

export const sizeAuto: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
