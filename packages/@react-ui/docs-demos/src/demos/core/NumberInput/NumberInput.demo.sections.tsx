import { CurrencyEthIcon } from '@phosphor-icons/react';
import { NumberInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';
import { CurrencyEthIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <CurrencyEthIcon size={20} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <CurrencyEthIcon size={20} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}

export const sections: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
