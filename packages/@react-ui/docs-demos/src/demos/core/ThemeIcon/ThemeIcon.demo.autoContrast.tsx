import { FingerprintIcon } from '@phosphor-icons/react';
import { Group, ThemeIcon } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { FingerprintIcon } from '@phosphor-icons/react';
import { ThemeIcon, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <FingerprintIcon size={20} />
      </ThemeIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <FingerprintIcon size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <FingerprintIcon size={20} />
      </ThemeIcon>
    </Group>
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
