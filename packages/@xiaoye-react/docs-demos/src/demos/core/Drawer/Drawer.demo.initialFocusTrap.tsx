import { Button, Drawer, FocusTrap, TextInput } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Drawer, Button, TextInput, FocusTrap } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="焦点演示">
        <FocusTrap.InitialFocus />
        <TextInput label="第一个输入" placeholder="第一个输入" />
        <TextInput
          data-autofocus
          label="带初始焦点的输入"
          placeholder="具有 data-autofocus 属性"
          mt="md"
        />
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

  return (
    <>
      <Drawer opened={opened} onClose={close} title="焦点演示">
        <FocusTrap.InitialFocus />
        <TextInput label="第一个输入" placeholder="第一个输入" />
        <TextInput
          data-autofocus
          label="带初始焦点的输入"
          placeholder="具有 data-autofocus 属性"
          mt="md"
        />
      </Drawer>

      <Button variant="default" onClick={open}>
        打开抽屉
      </Button>
    </>
  );
}

export const initialFocusTrap: UIDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
};
