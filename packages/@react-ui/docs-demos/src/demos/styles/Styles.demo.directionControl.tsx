import { useEffect } from 'react';
import { TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react';
import { ActionIcon, useDirection } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ActionIcon, useDirection } from '@react-ui/ui';
import { TextAlignLeftIcon, TextAlignRightIcon } from '@phosphor-icons/react';

function Demo() {
  const { toggleDirection, dir } = useDirection();
  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
      {dir === 'rtl' ? (
        <TextAlignLeftIcon />
      ) : (
        <TextAlignRightIcon />
      )}
    </ActionIcon>
  );
}
`;

function Demo() {
  const { toggleDirection, dir, setDirection } = useDirection();
  useEffect(() => () => setDirection('ltr'), []);

  return (
    <ActionIcon onClick={() => toggleDirection()} variant="default" size="lg">
      {dir === 'rtl' ? <TextAlignLeftIcon /> : <TextAlignRightIcon />}
    </ActionIcon>
  );
}

export const directionControl: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
