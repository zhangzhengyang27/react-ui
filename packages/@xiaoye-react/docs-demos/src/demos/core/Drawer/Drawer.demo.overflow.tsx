import { Button, Drawer } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Drawer, Button } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>带滚动的抽屉</p>);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="头部固定">
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}
`;

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  const content = Array(100)
    .fill(0)
    .map((_, index) => <p key={index}>带滚动的抽屉</p>);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="头部固定">
        {content}
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}

export const overflow: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
