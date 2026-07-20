import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { ActionIcon } from '@react-ui/ui';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="#"
      data-disabled
      size="xl"
      aria-label="在新标签页中打开"
      onClick={(event) => event.preventDefault()}
    >
      <ArrowSquareOutIcon />
    </ActionIcon>
  );
}
`;

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="#"
      data-disabled
      size="xl"
      aria-label="在新标签页中打开"
      onClick={(event) => event.preventDefault()}
    >
      <ArrowSquareOutIcon />
    </ActionIcon>
  );
}

export const disabledLink: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
