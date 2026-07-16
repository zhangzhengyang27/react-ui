import { CurrencyEthIcon } from '@phosphor-icons/react';
import { NumberInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NumberInput } from '@react-ui/ui';
import { CurrencyEthIcon } from '@phosphor-icons/react';

function Demo() {
  const icon = <CurrencyEthIcon size={20} />;
  return (
    <>
      <NumberInput leftSection={icon} label="带左侧区域" placeholder="带左侧区域" />
      <NumberInput
        rightSection={icon}
        label="带右侧区域"
        placeholder="带右侧区域"
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
      <NumberInput leftSection={icon} label="带左侧区域" placeholder="带左侧区域" />
      <NumberInput
        rightSection={icon}
        label="带右侧区域"
        placeholder="带右侧区域"
        mt="md"
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
