import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';
import { useCounter } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';
import { useCounter } from '@react-ui/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" onClick={decrement}>
        <CaretDownIcon color="var(--ui-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--ui-color-body)" miw={80}>
        {value}
      </Button.GroupSection>
      <Button variant="default" onClick={increment}>
        <CaretUpIcon color="var(--ui-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}
`;

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <Button.Group>
      <Button variant="default" onClick={decrement}>
        <CaretDownIcon color="var(--ui-color-red-text)" />
      </Button>
      <Button.GroupSection variant="default" bg="var(--ui-color-body)" miw={80}>
        {value}
      </Button.GroupSection>
      <Button variant="default" onClick={increment}>
        <CaretUpIcon color="var(--ui-color-teal-text)" />
      </Button>
    </Button.Group>
  );
}

export const groupSection: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
