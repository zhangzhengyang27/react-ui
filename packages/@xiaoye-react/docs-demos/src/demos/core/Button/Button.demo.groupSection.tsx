import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react';
import { Button } from '@xiaoye-react/ui';
import { useCounter } from '@xiaoye-react/hooks';

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

export const groupSection: UIDemo = {
  type: 'code',
  component: Demo,
  title: '分组区域',
  description: '使用 Button.GroupSection 在按钮组中展示非交互内容。',
  code,
  centered: true,
};
