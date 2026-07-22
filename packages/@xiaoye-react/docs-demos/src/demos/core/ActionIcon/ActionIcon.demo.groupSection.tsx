import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <ActionIcon.Group>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={decrement}
        aria-label="减小值"
      >
        <CaretDownIcon color="var(--ui-color-red-text)" />
      </ActionIcon>
      <ActionIcon.GroupSection variant="default" size="lg" bg="var(--ui-color-body)" miw={60}>
        {value}
      </ActionIcon.GroupSection>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={increment}
        aria-label="增大值"
      >
        <CaretUpIcon color="var(--ui-color-teal-text)" />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
`;

function Demo() {
  const [value, { increment, decrement }] = useCounter(135, { min: 0 });

  return (
    <ActionIcon.Group>
      <ActionIcon variant="default" size="lg" onClick={decrement} aria-label="减小值">
        <CaretDownIcon color="var(--ui-color-red-text)" />
      </ActionIcon>
      <ActionIcon.GroupSection variant="default" size="lg" bg="var(--ui-color-body)" miw={60}>
        {value}
      </ActionIcon.GroupSection>
      <ActionIcon variant="default" size="lg" onClick={increment} aria-label="增大值">
        <CaretUpIcon color="var(--ui-color-teal-text)" />
      </ActionIcon>
    </ActionIcon.Group>
  );
}

export const groupSection: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
