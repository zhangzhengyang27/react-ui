import { useState } from 'react';
import { Button, Group, Modal } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { AuthenticationForm } from '../../../shared/AuthenticationForm/AuthenticationForm';

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '55rem', '70%', '100%'];

function Demo() {
  const [opened, setOpened] = useState(false);
  const [size, setSize] = useState<string | number>('md');

  const buttons = SIZES.map((s) => (
    <Button
      key={s}
      variant="default"
      onClick={() => {
        setSize(s);
        setOpened(true);
      }}
    >
      {s}
    </Button>
  ));

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="介绍一下你自己！"
        size={size}
      >
        <AuthenticationForm noPadding noShadow />
      </Modal>

      <Group justify="center">{buttons}</Group>
    </>
  );
}

export const sizes: UIDemo = {
  type: 'code',
  component: Demo,
};
